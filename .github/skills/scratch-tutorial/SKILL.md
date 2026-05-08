---
name: scratch-tutorial
description: "Generate a web-based tutorial lesson for the Scratch Platformer series. Use when adding a new lesson to the tutorial site, processing an sb3 file, analysing griffpatch platformer code, or writing lesson notes from the Code a Platformer Game video series."
argument-hint: "Lesson number to process (e.g. Lesson 3)"
---

# Scratch Platformer Tutorial Generator

Generates a complete web-based tutorial lesson page for griffpatch's "Code a Platformer Game" series by orchestrating two specialist subagents: the **Code Analyst** and the **Tutorial Writer**.

## When to Use
- Adding a new lesson to the tutorial site
- Processing a new `.sb3` project file for a lesson
- Regenerating or updating an existing lesson's tutorial page

## Required Inputs (per lesson)

Place these files in the lesson folder before running:

| File | Required | Notes |
|------|----------|-------|
| `Lesson N\<project name>.sb3` | ✅ | Finished Scratch project for this lesson |
| `Lesson N\Lesson Summary.md` | ✅ | Written summary of features in this lesson |
| `Lesson N\Transcript.md` | Optional | Video transcript — improves chronological accuracy |

## Procedure

### 1. Identify Lesson Materials
Parse the lesson number N from the user's argument (or ask if not provided). Then:
- Locate the `.sb3` file in `Lesson N\` (use glob/search if the exact filename is unknown)
- Confirm `Lesson N\Lesson Summary.md` exists
- Note whether `Lesson N\Transcript.md` exists
- Identify the previous lesson's `.sb3` file in `Lesson N-1\` (if N > 1)

### 2. Run the Code Analyst
Delegate to the **@code-analyst** agent with this instruction:

> "Analyse `Lesson N\<sb3 filename>` comparing with `Lesson N-1\<prev sb3 filename>` (omit the previous file reference if this is Lesson 1). Output the structured code analysis to `Lesson N\code-analysis.md`."

Wait for the Code Analyst to complete and confirm that `Lesson N\code-analysis.md` was created before proceeding.

### 3. Run the Tutorial Writer
Delegate to the **@tutorial-writer** agent with this instruction:

> "Generate the tutorial page for Lesson N. Read `Lesson N\code-analysis.md`, `Lesson N\Lesson Summary.md`, and `Lesson N\Transcript.md` (if it exists). Output the lesson to `docs\lesson-N\index.html` and update `docs\index.html`. Follow the style guide and templates in your references."

Wait for the Tutorial Writer to complete.

### 4. Confirm Outputs
Verify the following files were created or updated and report them to the user:
- `Lesson N\code-analysis.md`
- `docs\lesson-N\index.html`
- `docs\index.html`
- `docs\css\style.css` (created on first run)

Note any issues or files that were not created.

## References
- [SB3 Format Guide](./references/sb3-format.md) — ZIP structure, `project.json` schema, block opcodes, PowerShell extraction
- [Tutorial Style Guide](./references/tutorial-style-guide.md) — tone, step format, Scratch block naming conventions
- [Lesson HTML Template](./templates/lesson-template.html)
- [Docs Index Template](./templates/docs-index-template.html)
- [Stylesheet](./templates/style.css)
