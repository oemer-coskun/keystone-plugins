#!/usr/bin/env node
// Keystone plugin hook: purely local reminder to log a learning session.
//
//   track  (PostToolUse on Keystone MCP tools): remembers that this session
//          used Keystone, or that keystone_log_session was already called.
//   stop   (Stop): if Keystone was used and nothing was logged yet, shows ONE
//          non-blocking hint (systemMessage) per session. Never blocks,
//          never calls the network, never writes to Keystone.
//
// State: one small JSON file per session in ${CLAUDE_PLUGIN_DATA}/sessions/.

import { mkdirSync, readFileSync, readdirSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";

const mode = process.argv[2];
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function readStdin() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function stateDir() {
  const base = process.env.CLAUDE_PLUGIN_DATA;
  if (!base) return null;
  const dir = path.join(base, "sessions");
  mkdirSync(dir, { recursive: true });
  return dir;
}

function stateFile(dir, sessionId) {
  const safe = String(sessionId || "unknown").replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 100);
  return path.join(dir, `${safe}.json`);
}

function load(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return { used: false, logged: false, reminded: false };
  }
}

function cleanup(dir) {
  try {
    const now = Date.now();
    for (const name of readdirSync(dir)) {
      const p = path.join(dir, name);
      if (now - statSync(p).mtimeMs > MAX_AGE_MS) unlinkSync(p);
    }
  } catch {
    // best effort
  }
}

function main() {
  const input = readStdin();
  const dir = stateDir();
  if (!dir) return;
  const file = stateFile(dir, input.session_id);
  const state = load(file);

  if (mode === "track") {
    const tool = String(input.tool_name || "");
    if (tool.endsWith("__keystone_log_session")) state.logged = true;
    else state.used = true;
    writeFileSync(file, JSON.stringify(state));
    cleanup(dir);
    return;
  }

  if (mode === "stop") {
    if (process.env.CLAUDE_PLUGIN_OPTION_SESSION_REMINDER === "false") return;
    if (input.stop_hook_active) return;
    if (!state.used || state.logged || state.reminded) return;
    state.reminded = true;
    writeFileSync(file, JSON.stringify(state));
    process.stdout.write(
      JSON.stringify({
        systemMessage:
          "Keystone: Du hast in dieser Sitzung mit Keystone gearbeitet. Mit /keystone:log kannst du eine kurze Zusammenfassung in Keystone speichern (nur wenn du willst).",
      }),
    );
  }
}

try {
  main();
} catch {
  // A reminder must never break the session.
}
process.exit(0);
