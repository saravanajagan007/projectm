# Project Rules — projectm

## 0. Rule Inheritance Reference
This project strictly inherits all global workspace standards, UI/UX responsiveness rules, security guidelines, and server credentials defined in:
- **Primary Global Rules:** [`P:\global-rules.md`](P:/global-rules.md)
- **Local Fallback:** [`projects/.agents/rules/global-rules.md`](../.agents/rules/global-rules.md)

---

## 1. Project Overview & Architecture
- **Project Name:** `projectm`
- **Location:** `C:\Users\sarav\Desktop\jagan\projects\projectm`

---

## 2. Mandatory Git & Access Directives
- **Automatic Git Pull On Access:** Whenever this project workspace directory is accessed by an AI assistant CLI or model, `git pull` MUST be executed immediately before reading, modifying, or building.
- **Git Sync for Rules:** When updating `rules.md`, stage ONLY `rules.md` (`git add rules.md`), commit with `chore: sync custom workspace rules`, and push to the active remote branch.
