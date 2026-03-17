export type AgentId = 'gemini' | 'gemini-api' | 'claude' | 'codex';

export interface AgentConfig {
  id: AgentId;
  label: string;
  buildCommand: (prompt: string) => string[];
  env?: Record<string, string>;
}

export const AGENTS: Record<AgentId, AgentConfig> = {
  gemini: {
    id: 'gemini',
    label: 'Gemini CLI',
    buildCommand: (prompt) => ['gemini', '-p', prompt, '--yolo'],
  },
  'gemini-api': {
    id: 'gemini-api',
    label: 'Gemini API (direct)',
    buildCommand: (prompt) => [
      'node',
      `${__dirname}/../scripts/gemini-api-agent.mjs`,
      prompt,
    ],
    env: {},
  },
  claude: {
    id: 'claude',
    label: 'Claude Code',
    buildCommand: (prompt) => [
      'claude',
      '--permission-mode', 'bypassPermissions',
      '--print',
      prompt,
    ],
  },
  codex: {
    id: 'codex',
    label: 'Codex CLI',
    buildCommand: (prompt) => [
      'codex',
      '--full-auto',
      '-q',
      prompt,
    ],
  },
};
