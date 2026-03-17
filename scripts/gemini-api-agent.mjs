#!/usr/bin/env node
/**
 * Minimal Gemini API coding agent.
 * Reads files from cwd, sends prompt + file contents to Gemini API,
 * parses file changes from response, writes them back.
 *
 * Usage: node gemini-api-agent.mjs "<prompt>"
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error('GEMINI_API_KEY env var not set');
  process.exit(1);
}

const prompt = process.argv[2];
if (!prompt) {
  console.error('Usage: gemini-api-agent.mjs "<prompt>"');
  process.exit(1);
}

const cwd = process.cwd();

// Read all text files in cwd (non-recursive, skip .git and binaries)
function readWorkdir(dir) {
  const files = {};
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (entry.isFile()) {
      try {
        files[entry.name] = fs.readFileSync(path.join(dir, entry.name), 'utf8');
      } catch {
        // skip binary files
      }
    }
  }
  return files;
}

const existingFiles = readWorkdir(cwd);

const fileContext = Object.entries(existingFiles)
  .map(([name, content]) => `=== ${name} ===\n${content}`)
  .join('\n\n');

const systemPrompt = `You are a coding assistant. The user will give you a task. You have access to the following files in the working directory:

${fileContext || '(no files yet)'}

Complete the task. For each file you need to create or modify, output it in this exact format:

--- FILE: <filename> ---
<complete file contents>
--- END FILE ---

Output ONLY the files that need to be created or changed. Do not explain, do not add commentary outside the file blocks.`;

const body = {
  contents: [
    { role: 'user', parts: [{ text: prompt }] },
  ],
  systemInstruction: { parts: [{ text: systemPrompt }] },
  generationConfig: {
    temperature: 0.2,
    maxOutputTokens: 8192,
  },
};

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

let responseText;
try {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`Gemini API error ${res.status}: ${err}`);
    process.exit(1);
  }

  const data = await res.json();
  responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
} catch (err) {
  console.error('Request failed:', err.message);
  process.exit(1);
}

console.log(responseText);

// Parse and apply file changes
const filePattern = /--- FILE: (.+?) ---\n([\s\S]*?)--- END FILE ---/g;
let match;
let written = 0;

while ((match = filePattern.exec(responseText)) !== null) {
  const filename = match[1].trim();
  const content = match[2];
  const filePath = path.join(cwd, filename);

  // Only write files within cwd (no path traversal)
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(path.resolve(cwd))) {
    console.error(`Skipping unsafe path: ${filename}`);
    continue;
  }

  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, content);
  written++;
}

if (written === 0 && responseText.trim()) {
  // Model responded but didn't use file blocks — write stdout for assertions
  // that check stdout-contains
}
