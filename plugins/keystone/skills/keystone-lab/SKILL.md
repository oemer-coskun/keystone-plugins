---
name: keystone-lab
description: Keystone-Lab-Workflow – Lab abrufen, Lab-Ordner im aktuellen Projekt anlegen, selbst bearbeiten, mit dem Pruefbefehl verifizieren und auf Wunsch einreichen. Nutzen, wenn die Person ein Keystone-Lab (z. B. KB3-0101-LAB-01) starten, pruefen oder einreichen will.
when_to_use: Lab starten, Lab pruefen, Lab einreichen; Lab-IDs im Format <Lektion>-LAB-<NN>.
---

# Keystone-Lab

## 1. Starten
1. `keystone_get_lab` mit der Lab-ID aufrufen; Ziel, Erfolgskriterium und Budget-/Sicherheitsgrenzen kurz nennen.
2. Unterordner vorschlagen (Standard `labs/<lab-id-klein>`), dann `keystone_start_lab` **ohne** `confirm` aufrufen und die Vorschau zeigen.
3. Erst nach Zustimmung `keystone_start_lab` mit `confirm: true`. Nie ins Projekt-Root, nie ueberschreiben ohne ausdrueckliches Okay (`overwrite`).

## 2. Bearbeiten
- Die Person arbeitet selbst; du folgst dem Skill `keystone-tutor` (attempt first, Hinweis-Leiter, keine Loesungen).
- Die im Lab-Ordner angelegte `AGENTS.md` enthaelt dieselben Regeln fuer spaetere Sitzungen und andere Agenten.

## 3. Verifizieren
- Den Pruefbefehl aus dem Erfolgskriterium **wirklich ausfuehren** und die Ausgabe zeigen.
- Nie Erfolg behaupten ohne Ausgabe. Tests und Kriterien nie veraendern.

## 4. Einreichen (nur auf Wunsch)
Checkliste vor dem Aufruf: [references/submission-checklist.md](references/submission-checklist.md).
`keystone_submit_lab` mit `evidence` (Worte der Person), `testOutput` (unveraenderte Ausgabe), `command`, `passed` laut Ausgabe, optional `repoUrl`/`commit`.

Danach anbieten: Erkenntnis als Notiz (`/keystone:note`) oder Sitzung protokollieren (`/keystone:log`).
