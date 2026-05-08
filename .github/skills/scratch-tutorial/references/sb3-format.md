# SB3 File Format Reference

An `.sb3` file is a standard **ZIP archive** containing a Scratch 3.0 project.

## Archive Contents

| File | Description |
|------|-------------|
| `project.json` | All project data: sprites, scripts, variables, costumes metadata |
| `<md5ext>` | Asset files (costumes/sounds), named by MD5 hash + extension (e.g. `abc123.png`) |

## Extracting on Windows (PowerShell)

```powershell
Add-Type -Assembly System.IO.Compression.FileSystem

[System.IO.Compression.ZipFile]::ExtractToDirectory(
    (Resolve-Path "Lesson 1\Scratch Platformer Lesson 1.sb3"),
    (Join-Path (Get-Location) "temp-sb3-extract")
)

$project = Get-Content "temp-sb3-extract\project.json" -Raw | ConvertFrom-Json
```

> **Note:** `Resolve-Path` is required because `ZipFile::ExtractToDirectory` needs an absolute path. If the destination folder already exists, delete it first with `Remove-Item -Recurse -Force`.

## project.json Structure

```json
{
  "targets":    [ ... ],   // Array of sprites + Stage (Stage is always first)
  "monitors":   [ ... ],   // Variable/list display monitors on the stage
  "extensions": [ ... ],   // Scratch extensions in use
  "meta":       { ... }    // Scratch version info
}
```

### Target Object (Sprite or Stage)

| Field | Type | Description |
|-------|------|-------------|
| `isStage` | bool | `true` for the Stage, `false` for sprites |
| `name` | string | Sprite/Stage name (e.g. `"Player"`) |
| `variables` | object | `{ id: [name, value] }` — sprite-local or global variables |
| `lists` | object | `{ id: [name, [items]] }` |
| `broadcasts` | object | `{ id: name }` |
| `blocks` | object | `{ blockId: Block }` — flat dictionary of all blocks |
| `costumes` | array | Array of costume objects (`name`, `assetId`, `md5ext`, etc.) |
| `sounds` | array | Array of sound objects |
| `x`, `y` | number | Sprite position |
| `direction` | number | Sprite direction (90 = right) |
| `visible` | bool | Visibility |
| `size` | number | Size percentage (100 = normal) |
| `currentCostume` | number | Index into `costumes` array |

> Variables/lists on the **Stage** target are **global** (accessible by all sprites). Variables/lists on a sprite are local to that sprite.

### Block Object

```json
{
  "opcode":   "motion_movesteps",
  "next":     "blockId_or_null",
  "parent":   "blockId_or_null",
  "inputs":   { "STEPS": [1, [4, "10"]] },
  "fields":   {},
  "shadow":   false,
  "topLevel": false
}
```

| Field | Description |
|-------|-------------|
| `opcode` | Block type — see tables below |
| `next` | ID of the next sequential block, or `null` |
| `parent` | ID of the enclosing/preceding block, or `null` |
| `inputs` | Named inputs. Format: `[input_type, block_id_or_literal]`. Substacks use `SUBSTACK`/`SUBSTACK2` |
| `fields` | Dropdown/field values. Format: `{ FIELD: [value, id_or_null] }` |
| `topLevel` | `true` for hat blocks (script starts) and detached stacks |

### Reconstructing a Script

```
1. Filter blocks where topLevel == true AND opcode is a hat block opcode
2. For each hat block, follow the `next` chain to get the linear sequence
3. For C-slot blocks (forever, repeat, if, if_else):
   - Check inputs.SUBSTACK[1] for the inner stack block ID
   - Check inputs.SUBSTACK2[1] for the else branch (if_else only)
   - Recursively reconstruct inner stacks with extra indentation
4. For reporter/boolean blocks embedded as inputs, resolve them recursively
```

### `inputs` Encoding

| Input type code | Meaning |
|-----------------|---------|
| `1` | Shadow (default value) |
| `2` | Block (an actual block ID) |
| `3` | Block overlying a shadow |

Literal value arrays: `[4, "10"]` = number 10; `[10, "hello"]` = string "hello".

### `fields` Encoding

Fields are direct values such as variable names, dropdown selections, key names:

```json
"fields": {
  "VARIABLE": ["Speed", "variableId"],
  "KEY_OPTION": ["space", null]
}
```

---

## Common Block Opcodes

### Events (Yellow `#FFCA36`)
| Opcode | Label |
|--------|-------|
| `event_whenflagclicked` | `when 🚩 clicked` |
| `event_whenkeypressed` | `when [key] key pressed` |
| `event_whenbroadcastreceived` | `when I receive [broadcast]` |
| `event_broadcast` | `broadcast [message]` |
| `event_broadcastandwait` | `broadcast [message] and wait` |
| `event_whentouchingobject` | `when this sprite touches [object]` |
| `event_whenstageclicked` | `when stage clicked` |

### Control (Orange `#FFAB19`)
| Opcode | Label |
|--------|-------|
| `control_forever` | `forever` |
| `control_repeat` | `repeat [n]` |
| `control_repeat_until` | `repeat until <condition>` |
| `control_if` | `if <condition> then` |
| `control_if_else` | `if <condition> then ... else ...` |
| `control_wait` | `wait [n] seconds` |
| `control_wait_until` | `wait until <condition>` |
| `control_stop` | `stop [option]` |
| `control_start_as_clone` | `when I start as a clone` |
| `control_create_clone_of` | `create clone of [sprite]` |
| `control_delete_this_clone` | `delete this clone` |

### Motion (Blue `#4C97FF`)
| Opcode | Label |
|--------|-------|
| `motion_movesteps` | `move [n] steps` |
| `motion_turnright` | `turn ↻ [n] degrees` |
| `motion_turnleft` | `turn ↺ [n] degrees` |
| `motion_goto` | `go to [target]` |
| `motion_gotoxy` | `go to x:[x] y:[y]` |
| `motion_glidesecstoxy` | `glide [s] secs to x:[x] y:[y]` |
| `motion_setx` | `set x to [n]` |
| `motion_sety` | `set y to [n]` |
| `motion_changexby` | `change x by [n]` |
| `motion_changeyby` | `change y by [n]` |
| `motion_setdirectionto` | `point in direction [n]` |
| `motion_xposition` | `x position` |
| `motion_yposition` | `y position` |
| `motion_direction` | `direction` |

### Looks (Purple `#9966FF`)
| Opcode | Label |
|--------|-------|
| `looks_say` | `say [text]` |
| `looks_sayforsecs` | `say [text] for [n] secs` |
| `looks_switchcostumeto` | `switch costume to [costume]` |
| `looks_nextcostume` | `next costume` |
| `looks_show` | `show` |
| `looks_hide` | `hide` |
| `looks_setsizeto` | `set size to [n]%` |
| `looks_changesizeby` | `change size by [n]` |
| `looks_seteffectto` | `set [effect] effect to [n]` |
| `looks_changeeffectby` | `change [effect] effect by [n]` |
| `looks_cleargraphiceffects` | `clear graphic effects` |
| `looks_costume` | `costume [number or name]` |

### Sound (Pink `#CF63CF`)
| Opcode | Label |
|--------|-------|
| `sound_playuntildone` | `play sound [sound] until done` |
| `sound_play` | `start sound [sound]` |
| `sound_stopallsounds` | `stop all sounds` |
| `sound_setvolumeto` | `set volume to [n]%` |

### Sensing (Light Blue `#5CB1D6`)
| Opcode | Label |
|--------|-------|
| `sensing_touchingobject` | `touching [object]?` |
| `sensing_touchingcolor` | `touching color [color]?` |
| `sensing_coloristouchingcolor` | `color [color] is touching [color]?` |
| `sensing_keypressed` | `key [key] pressed?` |
| `sensing_mousedown` | `mouse down?` |
| `sensing_mousex` | `mouse x` |
| `sensing_mousey` | `mouse y` |
| `sensing_distanceto` | `distance to [target]` |
| `sensing_timer` | `timer` |
| `sensing_resettimer` | `reset timer` |
| `sensing_of` | `[property] of [target]` |

### Operators (Green `#59C059`)
| Opcode | Label |
|--------|-------|
| `operator_add` | `[a] + [b]` |
| `operator_subtract` | `[a] - [b]` |
| `operator_multiply` | `[a] * [b]` |
| `operator_divide` | `[a] / [b]` |
| `operator_gt` | `[a] > [b]` |
| `operator_lt` | `[a] < [b]` |
| `operator_equals` | `[a] = [b]` |
| `operator_and` | `<a> and <b>` |
| `operator_or` | `<a> or <b>` |
| `operator_not` | `not <a>` |
| `operator_random` | `pick random [a] to [b]` |
| `operator_join` | `join [a] [b]` |
| `operator_letter_of` | `letter [n] of [string]` |
| `operator_length` | `length of [string]` |
| `operator_contains` | `[string] contains [string]?` |
| `operator_mathop` | `[function] of [n]` |
| `operator_round` | `round [n]` |
| `operator_mod` | `[a] mod [b]` |

### Variables (Dark Orange `#FF8C1A`)
| Opcode | Label |
|--------|-------|
| `data_setvariableto` | `set [var] to [value]` |
| `data_changevariableby` | `change [var] by [n]` |
| `data_variable` | `[var]` (reporter block) |
| `data_showvariable` | `show variable [var]` |
| `data_hidevariable` | `hide variable [var]` |

### Lists
| Opcode | Label |
|--------|-------|
| `data_addtolist` | `add [item] to [list]` |
| `data_deleteoflist` | `delete [n] of [list]` |
| `data_deletealloflist` | `delete all of [list]` |
| `data_insertatlist` | `insert [item] at [n] of [list]` |
| `data_replaceitemoflist` | `replace item [n] of [list] with [item]` |
| `data_itemoflist` | `item [n] of [list]` |
| `data_itemnumoflist` | `item # of [item] in [list]` |
| `data_lengthoflist` | `length of [list]` |
| `data_listcontainsitem` | `[list] contains [item]?` |

### Custom Blocks (Dark Purple)
| Opcode | Label |
|--------|-------|
| `procedures_definition` | `define [block name]` (hat block) |
| `procedures_call` | `[block name]` (call) |
| `argument_reporter_string_number` | Reporter for a custom block argument |
| `argument_reporter_boolean` | Boolean reporter for a custom block argument |

---

## Comparing Two Projects

When diffing `project.json` from two lessons:

1. **Sprites added**: Targets in current but not previous (matched by `name`)
2. **Sprites removed**: Targets in previous but not current
3. **Scripts changed**: For each sprite in both, compare block chains starting from hat blocks
   - Match scripts by hat block `opcode` + key `fields` values (e.g. broadcast name, key name)
   - Note blocks added, removed, reordered, or changed within a script
4. **Variables added/removed**: Compare `variables` object for each target (and Stage for globals)
5. **Lists added/removed**: Compare `lists` object similarly
6. **Broadcasts added**: Compare `broadcasts` on the Stage target
7. **Costumes added**: Compare `costumes` arrays by `name`
8. **Sounds added**: Compare `sounds` arrays by `name`

> **Tip**: Sprite-local variables appear in that sprite's `variables` object. Global variables appear in the **Stage** target's `variables` object.
