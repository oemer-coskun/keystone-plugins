---
name: keystone-notes
description: Notizen, Erkenntnisse und Code-Ausschnitte in Keystone speichern oder abrufen (erscheinen in der Notiz-Seitenleiste der Lektion mit Quelle "Claude Code"). Nutzen, wenn die Person etwas merken, in Keystone speichern, als Notiz ablegen oder ihre Keystone-Notizen sehen will.
when_to_use: Lernerkenntnisse zu einer Keystone-Lektion speichern; eigene Notizen zu einer Lektion auflisten.
---

# Keystone-Notizen

## Speichern (`keystone_save_note`)
- Nur auf Wunsch der Person. Inhalt vor dem Speichern kurz zeigen.
- `articleId` setzen, wenn es um eine Lektion geht (dann erscheint die Notiz dort in der Seitenleiste).
- `kind`: `INSIGHT` fuer Erkenntnisse ("ich habe verstanden, dass ..."), `SNIPPET` fuer kurze Code-/Config-Ausschnitte, sonst `NOTE`.
- Titel kurz und suchbar (hoechstens etwa 8 Woerter). Body: Markdown, knapp, in den Worten der Person.
- Nicht speichern: Secrets, Tokens, `.env`-Inhalte, komplette Dateien, personenbezogene Daten Dritter.

## Abrufen (`keystone_list_notes`)
- Mit `articleId` fuer eine Lektion, sonst die neuesten. Standard 10 Eintraege, Vorschau gekuerzt.

## Sitzungsprotokoll
Fuer eine Zusammenfassung der ganzen Sitzung stattdessen `/keystone:log` (`keystone_log_session`).
