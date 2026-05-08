---
name: generate-scratch-blocks
description: Generate SVG images of scratch blocks, based on supplied input script. Use this when generating web tutorial documents for a lesson, storing generated images so that they can be embedded in the tutorial page.
---

To generate example images of Scratch blocks used in the tutorial, follow this process:

1. Read the supplied input script consisting of text-based scratch blocks.
2. Use a web request to the following site (https://scratchblocks.github.io/#?style=scratch3&script=), inserting a URL encoded copy of the input script after the 'script=' query parameter.
3. Download the generated .svg file, depicting the rendered Scratch blocks.
