# Scratch Platformer Tutorial

Step-by-step tutorial notes for building a platformer game in Scratch, following griffpatch's
**[Code a Platformer Game](https://www.youtube.com/playlist?list=PLy4zsTUHwGJIATydhFeZa5pspLZR7yE__)** YouTube series.

🌐 **[View the tutorial site](https://TomFahey.github.io/CodeClub-ScratchPlatformer)**

---

## Attribution

All game design, code, and teaching belong to **[griffpatch](https://www.youtube.com/@griffpatch)**.
This repository contains only tutorial notes written to accompany his video series — it is a
fan-made educational resource and is not affiliated with griffpatch or the Scratch Team.

If you enjoy the series, please subscribe to griffpatch's channel and support his work directly.

---

## About

This site provides written, step-by-step lesson notes for each video in the series, intended as
a companion reference for Code Club sessions. Each lesson page covers:

- The features introduced in that video, in the same order as the video
- Clear instructions for each Scratch block to add
- Explanations of *why* each technique is used
- Code diagrams showing key block stacks

---

## Repository Structure

```
Lesson N/
  Scratch Platformer Lesson N.sb3   ← Finished Scratch project for the lesson
  Lesson N Summary.md               ← Feature summary used to generate the tutorial
  Lesson N Transcript.md            ← Video transcript (where available)
  code-analysis.md                  ← Auto-generated code diff used by the tutorial writer

site/
  index.html                        ← Lesson listing home page
  css/style.css                     ← Shared stylesheet
  lesson-N/index.html               ← Individual lesson tutorial pages

.github/
  agents/                           ← Copilot agents for generating lesson content
  skills/scratch-tutorial/          ← Copilot skill that orchestrates the workflow
```

---

## Lessons

| Lesson | Title | Topics |
|--------|-------|--------|
| [Lesson 1](https://TomFahey.github.io/CodeClub-ScratchPlatformer/lesson-1/) | Player Movement & Physics | Player sprite, gravity, jumping, acceleration, friction, sub-step collision detection |
| [Lesson 2](https://TomFahey.github.io/CodeClub-ScratchPlatformer/lesson-2/) | Levels & Scene Management | Level sprite, broadcast game loop, multiple scenes, scene transitions, spawn collision fix |

---

## Generating Lessons (Copilot Workflow)

This repository uses a GitHub Copilot agentic workflow to generate tutorial pages from `.sb3` project files.

To add a new lesson:

1. Place the lesson files in a `Lesson N/` folder:
   - `Scratch Platformer Lesson N.sb3`
   - `Lesson N Summary.md`
   - `Lesson N Transcript.md` *(optional but recommended)*

2. In GitHub Copilot Chat, run:
   ```
   /scratch-tutorial Lesson N
   ```

The workflow will automatically analyse the `.sb3` file, diff it against the previous lesson, and generate the HTML tutorial page.
