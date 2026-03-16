export type AgentId = 'gemini' | 'claude' | 'codex';

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
