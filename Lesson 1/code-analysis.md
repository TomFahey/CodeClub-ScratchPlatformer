# Code Analysis: Lesson 1

## Summary of Changes

This is the first lesson — all content is new. The project implements a basic side-scrolling platformer character controller. A single sprite (Sprite1) uses a physics-based movement system driven by global constants (GRAVITY, JUMP FORCE, ACCELERATION, RESISTANCE), sprite-local velocity variables (`speed_x`, `speed y`), and a custom block (`Move - in steps`) that performs sub-step collision detection against a solid colour (#9966ff purple). The jump system uses a `falling` counter to restrict mid-air jumps.

---

## Stage

**Backdrops:**
- `backdrop1`

**Sounds:**
- `pop`

**Broadcasts:** *(none)*

**Global Variables** (defined on Stage, accessible by all sprites):

| Name | Initial Value | On-Stage Monitor |
|------|--------------|-----------------|
| `my variable` | 0 | Hidden |
| `speed y` | 0 | Hidden |
| `GRAVITY` | -1 | Hidden |
| `JUMP FORCE` | 12 | Visible |
| `ACCELERATION` | 1.5 | Visible |
| `RESISTANCE` | 0.8 | Visible |

> **Note:** `my variable` is the Scratch default variable and appears to be unused. `speed y`, `GRAVITY`, `JUMP FORCE`, `ACCELERATION`, and `RESISTANCE` are all used by Sprite1's scripts. Although these are technically declared on the Stage (global scope), they are initialised and managed entirely within Sprite1's scripts.

**Scripts on Stage:** *(none)*

---

## Sprites

### Sprite1

**Status:** New

**Position at start:** x: −150, y: 55  
**Size:** 100%  
**Direction:** 90° (right-facing)  
**Rotation style:** All around

#### Costumes
| # | Name |
|---|------|
| 1 | `costume1` |
| 2 | `costume2` |

#### Sounds
| Name |
|------|
| `Meow` |

#### Variables (Sprite-local)

| Name | Scope | Purpose |
|------|-------|---------|
| `speed_x` | This Sprite | Horizontal velocity |
| `speed y` | Global (Stage) | Vertical velocity (declared on Stage) |
| `last_value` | This Sprite | Stores position before a move step (for collision rollback) |
| `falling` | This Sprite | Counts frames since last grounded; used to gate jumping |
| `touching` | This Sprite | Declared but unused in any script |

---

#### Scripts

---

**`when 🚩 clicked`:**
```
when 🚩 clicked
set [GRAVITY] to (-1)
set [JUMP FORCE] to (12)
set [ACCELERATION] to (1.5)
set [RESISTANCE] to (0.8)
set [speed_x] to (0)
set [speed y] to (0)
go to x: (-150) y: (55)
forever
  if <key [up arrow] pressed?> then
    if <(falling) < (3)> then
      set [speed y] to (JUMP FORCE)
    end
  end
  if <key [left arrow] pressed?> then
    change [speed_x] by (0 - ACCELERATION)
  end
  if <key [right arrow] pressed?> then
    change [speed_x] by (ACCELERATION)
  end
  set [speed_x] to ((speed_x) * (RESISTANCE))
  change [speed y] by (GRAVITY)
  Move - in steps ((abs of (speed y)) + (abs of (speed_x)))
end
```

**Purpose:** Initialises all physics constants and velocity variables, places the sprite at its starting position, then runs the main game loop every frame. Each frame it: checks directional key input to adjust horizontal velocity and trigger a jump (only allowed when `falling < 3`), applies resistance (friction) to horizontal speed, applies gravity to vertical speed, and calls the custom movement block to physically move the sprite and resolve collisions.

---

**`define Move - in steps (steps)`** *(run without screen refresh)*
```
define Move - in steps (steps)
change [falling] by (1)
repeat (steps)
  set [last_value] to (x position)
  change x by ((speed_x) / (steps))
  if <touching color [#9966ff]?> then
    set x to (last_value)
    set [speed_x] to (0)
  end
  set [last_value] to (y position)
  change y by ((speed y) / (steps))
  if <touching color [#9966ff]?> then
    set y to (last_value)
    if <(speed y) < (0)> then
      set [falling] to (0)
    end
    set [speed y] to (0)
  end
end
```

**Purpose:** Performs sub-step movement and collision detection to prevent the sprite from tunnelling through solid surfaces (coloured #9966ff purple). Each call increments `falling` by 1 (tracking airborne frames). The total movement is split into `steps` micro-steps (where `steps = abs(speed y) + abs(speed_x)`, so faster movement uses more steps). Each micro-step:
- **X axis:** moves `speed_x / steps` pixels, then checks for solid colour contact. On collision, rolls back X to `last_value` and zeroes `speed_x`.
- **Y axis:** moves `speed y / steps` pixels, then checks for solid colour contact. On collision, rolls back Y to `last_value`; if the sprite was moving downward (`speed y < 0`), resets `falling` to 0 (sprite is grounded), and zeroes `speed y`.

The block runs **without screen refresh** (warp mode), so all micro-steps complete in a single frame.

---

### Notes on Physics Constants

| Constant | Value | Effect |
|----------|-------|--------|
| `GRAVITY` | −1 | Subtracted from `speed y` each frame, pulling the sprite down |
| `JUMP FORCE` | 12 | Set as `speed y` when a jump is triggered |
| `ACCELERATION` | 1.5 | Added/subtracted from `speed_x` per frame when left/right is held |
| `RESISTANCE` | 0.8 | `speed_x` is multiplied by this each frame, creating deceleration/friction |

The `falling` counter being checked against `< 3` (rather than `= 0`) gives a small window of frames after walking off a ledge during which the player can still jump — a common "coyote time"-style allowance.

---

## Unchanged Sprites

*(No other sprites exist in this project.)*
