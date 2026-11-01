---
description: Keystone-Lab einreichen – Pruefbefehl ausfuehren, Ausgabe unveraendert mitsenden.
argument-hint: <lab-id>
disable-model-invocation: true
---

Reiche Lab `$0` nach dem Skill `keystone-lab` (Abschnitt "Einreichen") ein:

1. `keystone_get_lab` mit `$0`, Erfolgskriterium/Pruefbefehl ermitteln.
2. Pruefbefehl jetzt ausfuehren und die Ausgabe zeigen.
3. Die Person bitten, in 2–5 Saetzen zu erklaeren, was sie gebaut hat und warum es funktioniert (das ist `evidence`).
4. Entwurf der Einreichung zeigen (evidence, command, passed laut Ausgabe, optional commit via `git rev-parse HEAD`). Secrets pruefen.
5. Erst nach ausdruecklicher Bestaetigung `keystone_submit_lab` mit der unveraenderten Ausgabe als `testOutput` aufrufen.
