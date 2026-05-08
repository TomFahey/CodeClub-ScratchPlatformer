# Tutorial Style Guide

## Audience

Young/beginner coders, approximately ages 10–14. Assume they can open Scratch and drag blocks, but have no prior programming experience beyond basic familiarity with the Scratch interface.

---

## Tone

- **Friendly and encouraging**: "Great — now let's add some movement!"
- **We-language**: "We're going to...", "Now we need to...", "Let's try..."
- **Avoid jargon**: Say "code" not "algorithm"; "blocks" not "instructions"; "loop" not "iteration"
- **Explain the why**: Don't just say what to do — say *why* it makes the game work
- **Celebrate progress**: At the end of each section, acknowledge what has been achieved

---

## Document Structure

Each lesson page must have:

1. **Header** — Lesson number, title, one-sentence description
2. **Overview** — "What We'll Build" with a brief bullet list of features added in this lesson
3. **Sections** — one section per major feature from the video, in chronological order
   - Section heading describes the feature (not the technical method)
   - Numbered steps
   - "Why?" callout boxes where appropriate
   - Optional "Try it!" prompt to test after each section
4. **Summary** — what was achieved, and a teaser for the next lesson

---

## Step Format

Each step must follow this pattern:

```
[N]. [Action verb] [the block/element] [where/how].
```

**Examples:**
- `1. Click on the **Player** sprite to select it.`
- `2. Drag a **when 🚩 clicked** block into the scripts area.`
- `3. Add a **forever** loop block below it.`
- `4. Inside the loop, place a **change x by (10)** block.`

**Rules:**
- **Bold** all block names and UI element names
- State *which sprite* we're working on at the start of each section
- One clear action per step — do not combine multiple actions into one step
- Use UK English spelling (colour, programme, initialise) *except* where the Scratch UI uses US English (e.g. "costumes" not "costumes", "forever" not "for ever")

---

## Referencing Scratch Blocks

Use the block's visual label exactly as it appears in Scratch:

| ✅ Do | ❌ Don't |
|-------|---------|
| **when 🚩 clicked** | `event_whenflagclicked` |
| **forever** | `control_forever` |
| **change x by (10)** | "the changex block" |
| **if \<\> then** | "a conditional" |
| **set [Speed ▾] to (0)** | `data_setvariableto` |

When referencing a block category, note its colour:

- 🟦 **Motion** (blue)
- 🟣 **Looks** (purple)
- 🩷 **Sound** (pink)
- 🟡 **Events** (yellow)
- 🟠 **Control** (orange)
- 🩵 **Sensing** (light blue)
- 🟢 **Operators** (green)
- 🟥 **Variables** (dark orange)

---

## "Why?" Callouts

Use a callout box to explain *why* a feature is implemented a certain way. Include a "Why?" callout when:
- A non-obvious implementation choice was made
- A Scratch-specific limitation affects the approach
- Understanding the reasoning helps the student learn a transferable concept

HTML format:

```html
<div class="callout why">
  <strong>Why?</strong> Using a variable for speed means we can easily change the value
  in one place later, without having to update every block that uses it.
</div>
```

Other callout types:

```html
<div class="callout tip">
  <strong>Tip!</strong> [Helpful shortcut or best practice]
</div>

<div class="callout note">
  <strong>Note:</strong> [Important thing to be aware of]
</div>
```

---

## Section Headers

Section headers should describe the *feature being added*, not the underlying technical method:

| ✅ Do | ❌ Don't |
|-------|---------|
| "Making the Player Move" | "Implementing motion_changexby" |
| "Adding Gravity" | "Setting up the physics loop" |
| "Detecting the Ground" | "Collision detection with sensing blocks" |
| "Creating the Level" | "Drawing costumes for the tilemap sprite" |

---

## Scratch Block Stacks (HTML)

Represent Scratch block stacks using the `.scratch-blocks` HTML element. Each block on a new line; add `indent` or `indent2` for nested blocks:

```html
<div class="scratch-blocks">
  <div class="block event">when 🚩 clicked</div>
  <div class="block control">forever</div>
  <div class="block motion indent">change x by (Speed)</div>
  <div class="block sensing indent">if &lt;key [right arrow ▾] pressed?&gt; then</div>
  <div class="block variables indent2">set [xVelocity ▾] to (5)</div>
  <div class="block control indent">end</div>
  <div class="block control end">end forever</div>
</div>
```

Block CSS classes: `event`, `control`, `motion`, `looks`, `sound`, `sensing`, `operators`, `variables`.
Add `indent` or `indent2` for nesting. Add `end` to closing blocks (e.g. `end forever`) for visual clarity.

---

## Image Placeholders

Where screenshots would help, insert a placeholder that a human can replace later:

```html
<figure class="screenshot-placeholder">
  <div class="placeholder-box">[IMAGE: Player sprite scripts panel showing the forever loop with movement blocks]</div>
  <figcaption>The Player sprite's scripts after adding left/right movement</figcaption>
</figure>
```

Placeholders should describe the image content specifically enough to recreate the screenshot.

---

## Chronological Order

The tutorial must follow the **same order as the video**. Use the transcript (if provided) to determine the exact sequence. Without a transcript:

1. Follow the order implied by the Lesson Summary
2. Use the code analysis to infer logical dependencies (variables must be created before use, sprites before scripts, etc.)
3. Introduce features in the order the player would notice them when play-testing

---

## "Try it!" Prompts

At the end of each section (or after a meaningful milestone), encourage the student to test the game:

```html
<div class="try-it">
  <strong>🎮 Try it!</strong> Click the green flag and press the arrow keys.
  Does the player move left and right?
</div>
```

Keep these short and specific — tell the student exactly what to test for.
