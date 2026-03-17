#!/usr/bin/env node
/**
 * Minimal Gemini API coding agent.
 * Reads files from cwd, sends prompt + file contents to Gemini API,
 * parses file changes from JSON response, writes them back.
 *
 * Usage: GEMINI_API_KEY=... node gemini-api-agent.mjs "<prompt>"
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

Complete the task. Return ONLY valid JSON in this exact shape:
{"files":[{"name":"path/to/file.ext","content":"full file contents"}]}

Rules:
- Include every created or modified file in the files array.
- Use complete file contents, not diffs or partial updates.
- Do not include markdown fences, commentary, or anything outside the JSON object.`;

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

console.error(`[gemini-api-agent] response preview: ${responseText.slice(0, 300)}`);
console.log(responseText);

function parseFilesFromResponse(text) {
  const candidates = [text.trim()];

  // Also try extracting from fenced code blocks in case model wrapped in ```json
  const fencedJsonPattern = /```(?:json)?\s*([\s\S]*?)```/gi;
  let fencedMatch;
  while ((fencedMatch = fencedJsonPattern.exec(text)) !== null) {
    candidates.push(fencedMatch[1].trim());
  }

  for (const candidate of candidates) {
    if (!candidate) continue;
    try {
      const parsed = JSON.parse(candidate);
      const files = Array.isArray(parsed) ? parsed : parsed?.files;
      if (!Array.isArray(files)) continue;
      return files
        .filter(
          (f) =>
            f &&
            typeof f.name === 'string' &&
            typeof f.content === 'string',
        )
        .map((f) => ({ name: f.name, content: f.content }));
    } catch {
      // try next candidate
    }
  }

  return [];
}

const filesToWrite = parseFilesFromResponse(responseText);
let written = 0;

for (const { name: filename, content } of filesToWrite) {
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

if (written === 0) {
  console.error('[gemini-api-agent] No files written. Full response:');
  console.error(responseText);
}
