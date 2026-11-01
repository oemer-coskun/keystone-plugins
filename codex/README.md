# Keystone mit OpenAI Codex

Codex nutzt denselben Keystone-MCP-Server wie das Claude-Code-Plugin, eingetragen in `~/.codex/config.toml`.

| Datei | Zweck |
|---|---|
| `config.toml.example` | Block für `~/.codex/config.toml` (MCP-Server `keystone`, Token per `env_vars` aus der Umgebung) |
| `AGENTS.lab-template.md` | Vorlage für die `AGENTS.md` in Lab-Ordnern (Tutor-Regeln). `keystone_start_lab` legt sie automatisch mit ausgefüllter Lab-ID an. |

## Kurzfassung

1. Server-Datei herunterladen: https://meister-ai.io/downloads/keystone-mcp.mjs, z. B. nach `~/.keystone/keystone-mcp.mjs`
   (Befehle und Prüfsumme: [README im Repository-Root](../README.md#3-server-datei-für-codex-und-andere-clients)).
2. `KEYSTONE_TOKEN` in der Shell-Umgebung setzen (nicht in die `config.toml` schreiben).
3. Block aus `config.toml.example` in `~/.codex/config.toml` einfügen und den absoluten Pfad der Datei eintragen.
4. Codex in einem neuen Terminal starten und fragen: „Rufe keystone_whoami auf.“

Für ein Lab Codex im Lab-Ordner starten (`cd labs/<lab-ordner> && codex`), damit die `AGENTS.md` dort gilt.
