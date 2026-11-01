---
description: Notiz oder Erkenntnis zu einer Keystone-Lektion speichern (erscheint in der Notiz-Seitenleiste).
argument-hint: [lektions-id] <text>
disable-model-invocation: true
---

Speichere eine Keystone-Notiz nach dem Skill `keystone-notes`.

Eingabe: $ARGUMENTS

1. Wenn das erste Wort wie eine Lektions-ID aussieht (z. B. KB3-0101), ist es `articleId`; der Rest ist der Inhalt. Ohne ID: aktuelle Lektion aus dem Gespraech verwenden oder nachfragen.
2. Ohne Inhalt: die wichtigste Erkenntnis aus dem bisherigen Gespraech in 2–4 Saetzen in den Worten der Person vorschlagen.
3. Titel (kurz) und `kind` (INSIGHT/SNIPPET/NOTE) vorschlagen, Entwurf zeigen, nach Bestaetigung `keystone_save_note` aufrufen.
