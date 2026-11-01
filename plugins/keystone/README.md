# Keystone-Plugin für Claude Code

Bringt Keystone in deine eigene Claude-Code-Sitzung: Lektionen lesen, Labs im aktuellen Projekt anlegen,
sokratische Hinweise, Notizen und Lab-Nachweise zurück nach Keystone.

## Installation

```bash
claude plugin marketplace add oemer-coskun/keystone-plugins
claude plugin install keystone@keystone-plugins
```

Beim Aktivieren fragt Claude Code nach der Keystone-URL (vorbelegt: `https://meister-ai.io`) und deinem Token
(`kst_pat_…`, erstellt unter https://meister-ai.io/konto/agent). Der Token liegt danach im sicheren Speicher von Claude Code.

Test in einer Sitzung: „Rufe keystone_whoami auf.“ Ausführliche Anleitung und Fehlersuche: [README im Repository-Root](../../README.md).

## Inhalt

| Teil | Pfad | Zweck |
|---|---|---|
| Manifest | `.claude-plugin/plugin.json` | Name `keystone`, Einstellungen für URL und Token (Token als `sensitive`) |
| MCP-Server | `.mcp.json` → `server/keystone-mcp.mjs` | Gebündelter Keystone-MCP-Server, eine Datei, Node.js ≥ 20 |
| Skills | `skills/keystone-tutor`, `skills/keystone-lab`, `skills/keystone-notes` | Lädt Claude bei passenden Anfragen |
| Befehle | `skills/{next,lesson,lab,hint,note,submit,log}` | `/keystone:next`, `/keystone:lesson`, `/keystone:lab`, `/keystone:hint`, `/keystone:note`, `/keystone:submit`, `/keystone:log` |
| Hook | `hooks/hooks.json` → `hooks/session-reminder.mjs` | Einmalige, rein lokale Erinnerung an `/keystone:log`. Kein Netzwerk, blockiert nie, abschaltbar |

Die MCP-Prompts des Servers stehen zusätzlich als `/mcp__plugin_keystone_keystone__tutor`,
`…__review-my-diff` und `…__explain-without-agent` bereit.
