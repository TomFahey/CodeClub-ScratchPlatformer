---
name: generate-scratch-blocks
description: "Generate SVG images of Scratch block stacks from text notation. Use when creating screenshots of Scratch code for a tutorial page, rendering scratchblocks notation to SVG files, or replacing image placeholders in lesson HTML."
argument-hint: "Path to a .txt file containing scratchblocks notation"
---

# Generate Scratch Block Images

Renders Scratch block stacks from text notation into SVG image files using the
[scratchblocks](https://scratchblocks.github.io) library, for embedding in tutorial pages.

## When to Use
- Replacing `[IMAGE: ...]` screenshot placeholders in a lesson page with actual block diagrams
- Generating SVG images of Scratch code stacks for any lesson

## Input Format

Plain text using [scratchblocks notation](https://en.scratch-wiki.info/wiki/Block_Plugin/Syntax), one script per file. Example:

```
when gf clicked
forever
  if <key [right arrow v] pressed?> then
    change x by (10)
  end
end
```

## Procedure

### Step 1 — Prepare the input

Create a temporary text file containing the scratchblocks notation to render, e.g.:
`j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer\temp-blocks-input.txt`

### Step 2 — Ensure dependencies are installed

Check whether `scratchblocks` and `jsdom` are available in the project's `node_modules`:

```powershell
$deps = "j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer\node_modules"
if (-not (Test-Path "$deps\scratchblocks") -or -not (Test-Path "$deps\jsdom")) {
    Set-Location "j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer"
    npm install --save-dev scratchblocks jsdom
}
```

### Step 3 — Run the render script

Run [render-blocks.js](./scripts/render-blocks.js) with the input file and desired output path:

```powershell
node ".github\skills\generate-scratch-blocks\scripts\render-blocks.js" `
     "j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer\temp-blocks-input.txt" `
     "j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer\site\lesson-N\images\block-name.svg"
```

The script will create any missing parent directories automatically.

### Step 4 — Embed in the lesson HTML

Replace the corresponding `<figure class="screenshot-placeholder">` in the lesson HTML with:

```html
<figure>
  <img src="images/block-name.svg" alt="Description of the block stack" />
  <figcaption>Caption text</figcaption>
</figure>
```

### Step 5 — Clean up

```powershell
Remove-Item -Force "j:\GoogleDrive\Programming\CodeClub\ScratchPlatformer\temp-blocks-input.txt" -ErrorAction SilentlyContinue
```

## Notes
- Output is always Scratch 3 style (matching the tutorial site's visual style)
- SVG files are self-contained and scale cleanly at any size
- Create one SVG per distinct block stack (not one per section)
- Save images to `site\lesson-N\images\` so they are relative to the lesson `index.html`
