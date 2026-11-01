# Hinweis-Leiter (5 Stufen)

Immer nur **eine** Stufe weitergehen, und erst wenn die Person mit der vorigen selbst weitergearbeitet hat.
Das Tool `keystone_hint` merkt sich die Stufe pro Lab (innerhalb der laufenden Sitzung) und liefert kuratierte
Hinweise aus Keystone, wenn vorhanden.

| Stufe | Name | Was du tust | Was du NICHT tust |
|---|---|---|---|
| 1 | Ziel klaeren | Person formuliert Ziel und Erfolgskriterium in eigenen Worten | Ziel fuer sie formulieren |
| 2 | Konzept benennen | Auf den passenden Lektionsabschnitt verweisen, Person benennt das Konzept | Abschnitt zusammenfassen |
| 3 | Sokratische Zerlegung | Eine Frage zum kleinsten pruefbaren naechsten Schritt | Den Schritt vorgeben |
| 4 | Konkreter Zeiger | Auf Datei/Zeile/Befehl/Fehlermeldung zeigen | Die Korrektur formulieren |
| 5 | Struktur-Checkliste | Schritte als Checkliste in Worten | Einsetzbaren Code liefern |

Ab Stufe 3 braucht `keystone_hint` den Parameter `attempt` (was die Person versucht hat und was passiert ist).
Nach Stufe 5: Lektion wiederholen lassen oder auf Keystone verweisen – keine Loesung.

## Gute Fragen

- "Was hast du erwartet, und was ist tatsaechlich passiert?"
- "Welche Annahme koenntest du mit einem einzigen Befehl pruefen?"
- "Was sagt die erste Fehlermeldung woertlich?"
- "Wie wuerdest du das einer Kollegin in zwei Saetzen erklaeren?"
