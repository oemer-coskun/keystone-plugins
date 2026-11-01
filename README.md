# Keystone-Plugins

Verbinde deinen eigenen Coding-Agenten mit [Keystone](https://meister-ai.io): Lektionen lesen, Labs im eigenen Projekt anlegen,
sokratische Hinweise holen, Notizen und Lab-Nachweise zurück nach Keystone speichern.

Du arbeitest in **deiner** Claude-Code- oder Codex-Sitzung mit **deinem** Abo. Keystone steuert deinen Agenten nie,
schreibt nichts in dein Terminal und sieht keine Login-Daten deines KI-Anbieters.

Die Schritt-für-Schritt-Anleitung mit fertig ausgefüllten Befehlen findest du auch in Keystone unter
**Konto › Agent-Zugang** (https://meister-ai.io/konto/agent).

| Inhalt | Pfad |
|---|---|
| Marketplace-Katalog `keystone-plugins` für Claude Code | `.claude-plugin/marketplace.json` |
| Claude-Code-Plugin `keystone` (Skills, Befehle, Hook, MCP-Server) | `plugins/keystone/` |
| Keystone-MCP-Server, eine Datei ohne Abhängigkeiten (Node.js ≥ 20) | `plugins/keystone/server/keystone-mcp.mjs` |
| Beispielkonfiguration und Lab-Vorlage für Codex | `codex/` |
| Prüfsumme des MCP-Servers | `SHA256SUMS` |

Version des MCP-Servers: `0.1.0` · SHA-256: `1b90d2afab28183192c580ae50411b4839a43d2c235ad5e9eddbe9a4eab759ad`

---

## Voraussetzungen

- Ein Keystone-Konto (Einladung) und ein persönlicher **Token** (siehe Schritt 1).
- **Node.js 20 oder neuer** im `PATH`. Prüfen mit `node --version`. Download: https://nodejs.org
- Einer dieser Clients:
  - **Claude Code** (empfohlen, mit Plugin) – Windows, macOS und Linux,
  - **OpenAI Codex** (CLI, IDE-Erweiterung oder Desktop-App),
  - ein anderer MCP-Client, der lokale `stdio`-Server starten kann.

Es ist **kein** `npm install` nötig: Der MCP-Server ist eine einzelne, fertig gebündelte Datei.

## 1. Token erstellen

1. In Keystone anmelden: https://meister-ai.io/konto/agent
2. „Neues Token“: Namen vergeben (z. B. „Laptop Claude Code“), Berechtigungen und Ablauf wählen.
3. Den Token (`kst_pat_…`) **sofort kopieren** – er wird nur einmal angezeigt.

Der Token gehört nie in Dateien, die du teilst oder committest, und nie in einen Chat. Wer ihn hat, handelt in deinem
Namen. Widerrufen kannst du ihn jederzeit an derselben Stelle.

## 2. Claude Code (empfohlen)

Im Terminal (PowerShell, Terminal.app, bash, zsh – überall gleich):

```bash
claude plugin marketplace add oemer-coskun/keystone-plugins
claude plugin install keystone@keystone-plugins
```

Alternativ in einer laufenden Sitzung: `/plugin marketplace add oemer-coskun/keystone-plugins` und danach
`/plugin install keystone@keystone-plugins`.

Danach Claude Code (neu) starten. Beim Aktivieren fragt Claude Code nach:

- **Keystone-URL** – vorbelegt mit `https://meister-ai.io`, einfach bestätigen.
- **Keystone-Token** – deinen `kst_pat_…`-Token einfügen. Claude Code legt ihn im sicheren Speicher ab, nicht in `settings.json`.
- **Sitzungs-Erinnerung** – an/aus (lokaler Hinweis auf `/keystone:log`, sendet nichts).

Fragt Claude Code nicht nach, öffne `/plugin`, wähle `keystone` und dort die Konfiguration. Mit
`claude plugin configure keystone@keystone-plugins` siehst du im Terminal, welche Werte noch fehlen.

Mit `/mcp` prüfen: Der Server `keystone` aus dem Plugin muss als verbunden erscheinen.

| Befehl | Wirkung |
|---|---|
| `/keystone:next` | Nächste Lektion im Lernpfad |
| `/keystone:lesson <id> [abschnitt]` | Lektion oder einen Abschnitt kompakt laden |
| `/keystone:lab <lab-id> [ordner]` | Lab laden, Vorschau zeigen, nach Zustimmung Lab-Ordner im Projekt anlegen |
| `/keystone:hint <lab-id> [versuch]` | Nächste Stufe der Hinweis-Leiter |
| `/keystone:note [id] <text>` | Notiz in Keystone speichern (nach Bestätigung) |
| `/keystone:submit <lab-id>` | Prüfbefehl ausführen, Nachweis nach Bestätigung einreichen |
| `/keystone:log [id]` | Sitzungszusammenfassung nach Bestätigung speichern |

Aktualisieren: `claude plugin marketplace update keystone-plugins`, danach Claude Code neu starten.
Entfernen: `claude plugin uninstall keystone@keystone-plugins` und `claude plugin marketplace remove keystone-plugins`.

**Ohne Plugin (nur MCP-Server):** Server-Datei wie in Schritt 3 herunterladen, `KEYSTONE_TOKEN` wie in Schritt 4
setzen und dann:

```bash
claude mcp add keystone --transport stdio --scope user --env KEYSTONE_URL=https://meister-ai.io --env KEYSTONE_SOURCE=CLAUDE_CODE --env KEYSTONE_TOKEN="$KEYSTONE_TOKEN" -- node ~/.keystone/keystone-mcp.mjs
```

```powershell
claude mcp add keystone --transport stdio --scope user --env KEYSTONE_URL=https://meister-ai.io --env KEYSTONE_SOURCE=CLAUDE_CODE --env "KEYSTONE_TOKEN=$env:KEYSTONE_TOKEN" -- node "$HOME\.keystone\keystone-mcp.mjs"
```

Nachteil: Der Token steht dann im Klartext in deiner Claude-Code-Nutzerkonfiguration. Das Plugin speichert ihn sicherer.

## 3. Server-Datei für Codex und andere Clients

Codex und andere MCP-Clients starten die Datei `keystone-mcp.mjs` direkt. Lege sie an einen festen Ort, z. B. in den
Ordner `.keystone` in deinem Benutzerverzeichnis.

**macOS / Linux**

```bash
mkdir -p ~/.keystone
curl -fsSL -o ~/.keystone/keystone-mcp.mjs https://meister-ai.io/downloads/keystone-mcp.mjs
shasum -a 256 ~/.keystone/keystone-mcp.mjs
```

Unter Linux ohne `shasum`: `sha256sum ~/.keystone/keystone-mcp.mjs`.

**Windows (PowerShell)**

```powershell
New-Item -ItemType Directory -Force "$HOME\.keystone" | Out-Null
Invoke-WebRequest https://meister-ai.io/downloads/keystone-mcp.mjs -OutFile "$HOME\.keystone\keystone-mcp.mjs"
Get-FileHash "$HOME\.keystone\keystone-mcp.mjs" -Algorithm SHA256
```

Die ausgegebene Prüfsumme muss `1b90d2afab28183192c580ae50411b4839a43d2c235ad5e9eddbe9a4eab759ad` lauten (Großschreibung egal). Dieselbe Datei liegt in diesem Repository unter
`plugins/keystone/server/keystone-mcp.mjs`.

Den absoluten Pfad, den du gleich brauchst, zeigt dir:

- macOS / Linux: `echo ~/.keystone/keystone-mcp.mjs`
- Windows (PowerShell): `(Resolve-Path "$HOME\.keystone\keystone-mcp.mjs").Path.Replace('\', '/')`

## 4. OpenAI Codex

Codex (CLI, IDE-Erweiterung und Desktop-App teilen sich `~/.codex/config.toml`) nutzt denselben MCP-Server.

1. Token als Umgebungsvariable setzen – er steht so **nicht** in der Konfigurationsdatei. Die Befehle fragen den
   Token ab, ohne ihn anzuzeigen oder im Verlauf zu speichern.

   macOS / Linux (gilt für dieses Terminal; dauerhaft `export KEYSTONE_TOKEN="kst_pat_..."` mit einem Editor in
   `~/.zshrc` bzw. `~/.bashrc` eintragen):

   ```bash
   printf "Keystone-Token: "; read -rs KEYSTONE_TOKEN; echo; export KEYSTONE_TOKEN
   ```

   Windows (PowerShell; dauerhaft für deinen Benutzer und sofort in diesem Fenster):

   ```powershell
   $t = Read-Host "Keystone-Token"
   [Environment]::SetEnvironmentVariable("KEYSTONE_TOKEN", $t, "User")
   $env:KEYSTONE_TOKEN = $t; Remove-Variable t
   ```

2. Diesen Block in `~/.codex/config.toml` einfügen (Windows: `%USERPROFILE%\.codex\config.toml`) und den Pfad aus
   Schritt 3 eintragen. Unter Windows im Pfad Schrägstriche `/` verwenden (der Befehl aus Schritt 3 gibt den Pfad schon so aus).
   Eine Vorlage liegt in `codex/config.toml.example`.

   ```toml
   [mcp_servers.keystone]
   command = "node"
   args = ["/ABSOLUTER/PFAD/.keystone/keystone-mcp.mjs"]
   env_vars = ["KEYSTONE_TOKEN"]
   startup_timeout_sec = 15
   tool_timeout_sec = 60

   [mcp_servers.keystone.env]
   KEYSTONE_URL = "https://meister-ai.io"
   KEYSTONE_SOURCE = "CODEX"
   ```

3. Codex in einem neuen Terminal starten. `codex mcp list` zeigt den Server `keystone`.

Für Labs legt `keystone_start_lab` eine `AGENTS.md` mit den Tutor-Regeln in den Lab-Ordner (Vorlage:
`codex/AGENTS.lab-template.md`). Codex liest `AGENTS.md` vom Projekt-Root bis zum Arbeitsverzeichnis – starte Codex
für ein Lab deshalb **im Lab-Ordner**.

## 5. Andere MCP-Clients

Jeder Client, der lokale `stdio`-Server startet, funktioniert mit diesem Eintrag (übliches `mcpServers`-Format; wo
die Datei liegt, steht in der Doku deines Clients):

```json
{
  "mcpServers": {
    "keystone": {
      "command": "node",
      "args": ["/ABSOLUTER/PFAD/.keystone/keystone-mcp.mjs"],
      "env": {
        "KEYSTONE_URL": "https://meister-ai.io",
        "KEYSTONE_TOKEN": "kst_pat_...",
        "KEYSTONE_SOURCE": "MCP"
      }
    }
  }
}
```

Achtung: So steht der Token im Klartext in der Konfigurationsdatei. Wenn dein Client Umgebungsvariablen expandiert
(z. B. `"${KEYSTONE_TOKEN}"`), nutze das und setze den Token nur in der Shell.

Optional: `KEYSTONE_PROJECT_DIR` legt fest, unter welchem Ordner `keystone_start_lab` Lab-Ordner anlegen darf
(Standard: Arbeitsverzeichnis des Servers).

Für Clients, die keine Prozesse starten können, gibt es einen lokalen HTTP-Modus:
`node keystone-mcp.mjs --http --port 3917` (lauscht nur auf `127.0.0.1`).

## 6. Verbindung testen

Frag deinen Agenten:

> Rufe keystone_whoami auf.

Die Antwort zeigt deinen Namen, deine Kurse und den Projektordner. In Keystone wechselt der Status unter
**Konto › Agent-Zugang** auf „verbunden“.

## 7. Fehlersuche

| Symptom | Lösung |
|---|---|
| `node` wird nicht gefunden / Server startet nicht | Node.js ≥ 20 installieren, Terminal und Agent neu starten, `node --version` prüfen. |
| `/mcp` zeigt `keystone` als fehlgeschlagen | Plugin-Konfiguration prüfen (`/plugin` › keystone): URL `https://meister-ai.io` und Token gesetzt? Danach Claude Code neu starten. |
| `claude plugin marketplace add` schlägt fehl | Schreibweise `oemer-coskun/keystone-plugins` prüfen; Internetzugang zu github.com nötig. Alternativ das Repository herunterladen und den lokalen Ordner angeben: `claude plugin marketplace add ./keystone-plugins`. |
| „KEYSTONE_URL muss https:// verwenden“ | Die URL lautet `https://meister-ai.io` (ohne Pfad, mit `https://`). |
| „Token ungültig oder fehlt“, „abgelaufen“, „widerrufen“ | Neuen Token erstellen und neu eintragen (Plugin-Konfiguration bzw. `KEYSTONE_TOKEN`), Agent neu starten. |
| „Dem Token fehlt die nötige Berechtigung“ | Token mit passender Berechtigung erstellen, z. B. „Notizen speichern“. |
| „… in deinem Tarif nicht freigeschaltet“ | Die Lektion gehört zu einem Kurs, der für dein Konto nicht freigeschaltet ist. |
| Codex findet den Token nicht | `env_vars = ["KEYSTONE_TOKEN"]` gesetzt? Variable gesetzt, **bevor** Codex gestartet wurde? Sonst Codex aus einem neuen Terminal starten. |
| zsh: `command not found: #` | Kommentarzeilen nicht mitkopieren – nur die Befehle aus den Codeblöcken. |
| Windows: Pfad mit Leerzeichen | Den vollständigen Pfad als einen String in `args` angeben, mit `/` statt `\`. |
| Prüfsumme stimmt nicht | Datei erneut herunterladen. Weicht sie weiter ab, nicht verwenden und Keystone kontaktieren. |
| `keystone_start_lab` schreibt in den falschen Ordner | `keystone_whoami` zeigt den Projektordner. Claude Code im Projekt starten bzw. `KEYSTONE_PROJECT_DIR` setzen. |

## 8. Datenschutz in Kürze

- An Keystone geht nur, was du über die Tools auslöst: Notizen, Lab-Nachweise mit Testausgabe, Sitzungszusammenfassungen.
  Dein Code, deine Dateien und dein Terminal-Verlauf bleiben lokal, außer du fügst Teile davon selbst ein.
- Der Token wird nur an die Keystone-URL gesendet, nie geloggt und in Fehlermeldungen geschwärzt. `http://` ist nur für
  `localhost` erlaubt, Weiterleitungen werden abgelehnt.
- Was dein Agent aus Keystone liest, verarbeitet dein KI-Anbieter (Anthropic bzw. OpenAI) wie jeden anderen Kontext –
  unter dessen Bedingungen und mit deinem Abo.

Ausführlich: https://meister-ai.io/datenschutz

## Lizenz

Siehe [LICENSE](LICENSE). Die im MCP-Server gebündelten Open-Source-Pakete stehen unter ihren eigenen Lizenzen
(`plugins/keystone/server/THIRD-PARTY-NOTICES.txt`).

Dieses Repository wird automatisch aus dem Keystone-Quellcode erzeugt. Änderungen hier werden beim nächsten Abgleich
überschrieben.
