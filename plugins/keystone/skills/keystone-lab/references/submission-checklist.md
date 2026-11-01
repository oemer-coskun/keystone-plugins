# Checkliste vor `keystone_submit_lab`

- [ ] Die Person hat ausdruecklich gesagt, dass sie einreichen will.
- [ ] Der Pruefbefehl aus dem Erfolgskriterium wurde in DIESER Sitzung ausgefuehrt.
- [ ] `testOutput` ist die unveraenderte Ausgabe (nicht zusammengefasst; sehr lange Ausgaben kuerzt der MCP-Server selbst am Anfang, das Ende mit der Zusammenfassung bleibt erhalten).
- [ ] `passed` entspricht der Ausgabe (Exit-Code/Zusammenfassung), nicht dem Wunsch.
- [ ] `evidence`: 2–5 Saetze der Person – was gebaut wurde und warum es funktioniert.
- [ ] Keine Secrets, Tokens, `.env`-Inhalte oder personenbezogenen Daten Dritter in Evidence oder Ausgabe (vorher pruefen, ggf. schwaerzen und das sagen).
- [ ] Optional: `commit` (Hash) und `repoUrl`, falls die Person den Stand gepusht hat.

Die finale Bewertung macht Keystone; der Agent meldet nur den Nachweis.
