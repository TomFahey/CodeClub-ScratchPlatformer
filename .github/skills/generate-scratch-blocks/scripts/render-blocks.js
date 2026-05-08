/**
 * render-blocks.js
 * Renders a scratchblocks notation text file to an SVG image.
 *
 * Usage:
 *   node render-blocks.js <input.txt> <output.svg>
 *
 * Note: scratchblocks is an ES module that attaches to window at load time.
 * jsdom globals must be set before import, and canvas.getContext must be mocked.
 */

import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

const [,, inputFile, outputFile] = process.argv

if (!inputFile || !outputFile) {
  console.error('Usage: node render-blocks.js <input.txt> <output.svg>')
  process.exit(1)
}

if (!fs.existsSync(inputFile)) {
  console.error(`Input file not found: ${inputFile}`)
  process.exit(1)
}

// Set up jsdom environment BEFORE importing scratchblocks
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')

// Mock canvas context for text measurement (jsdom doesn't implement HTMLCanvasElement.getContext)
const mockCtx = {
  font: '',
  measureText: (text) => ({ width: text.length * 7 }),
}
dom.window.HTMLCanvasElement.prototype.getContext = () => mockCtx

// Expose DOM globals that scratchblocks expects
global.window      = dom.window
global.document    = dom.window.document
global.SVGElement  = dom.window.SVGElement
global.HTMLElement = dom.window.HTMLElement
global.Element     = dom.window.Element
global.Node        = dom.window.Node

// Dynamic import so globals are in place when the module initialises
await import('scratchblocks')
const sb = dom.window.scratchblocks

const script = fs.readFileSync(inputFile, 'utf8').trim()

const doc = sb.parse(script, { style: 'scratch3', languages: ['en'] })
const svg = sb.render(doc, { style: 'scratch3' })

const svgString = new dom.window.XMLSerializer().serializeToString(svg)

const outDir = path.dirname(outputFile)
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true })
}

fs.writeFileSync(outputFile, svgString, 'utf8')
console.log(`SVG written to: ${outputFile}`)
