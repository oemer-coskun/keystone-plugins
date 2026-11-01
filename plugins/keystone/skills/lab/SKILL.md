---
description: Keystone-Lab starten – Aufgabe laden und nach Bestaetigung den Lab-Ordner im aktuellen Projekt anlegen.
argument-hint: <lab-id> [unterordner]
disable-model-invocation: true
---

Starte das Keystone-Lab `$0` nach dem Skill `keystone-lab`:

1. `keystone_get_lab` mit `$0`; Ziel und Erfolgskriterium in 3 Zeilen zusammenfassen.
2. Unterordner: `$1` – falls leer, `labs/` plus die Lab-ID in Kleinbuchstaben vorschlagen.
3. `keystone_start_lab` **ohne** `confirm` aufrufen, Vorschau zeigen, auf Zustimmung warten.
4. Nach Zustimmung mit `confirm: true` anlegen.
5. Dann als Tutor weiter (Skill `keystone-tutor`): erste Frage stellen, keine Loesung vorwegnehmen.
