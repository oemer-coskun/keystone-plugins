---
description: Naechste Keystone-Lektion im Lernpfad anzeigen und optional kompakt laden.
disable-model-invocation: true
---

1. Rufe `keystone_next_lesson` auf und zeige ID, Titel und Link.
2. Frage, ob die Person die Lektion hier durchgehen will. Wenn ja: `keystone_get_lesson` mit der ID (ohne `section`) und fasse **nur** Ziel und Gliederung zusammen; der Rest wird bei Bedarf abschnittsweise geladen.
3. Biete an: Vorhersage-Frage der Lektion zuerst beantworten (Abschnitt "Vorhersage"), dann lesen.
