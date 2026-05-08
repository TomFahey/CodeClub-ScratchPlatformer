# Code Analysis: Lesson 2

## Summary of Changes

Lesson 2 introduces a **broadcast-driven game loop architecture**, replacing Lesson 1's single `when 🚩 clicked` forever loop. The player's logic is decomposed into six new custom blocks (`Controls - Up and Down`, `Controls - Left and Right`, `Check Touching Solid`, `Reset and Begin Level`, `Begin Scene # %s go to x: %s`, `Fix Collision in Direction %s`) and three new broadcast-triggered scripts (`Game Loop`, `Tick - Player`, `Tick - Last`). A brand new **Level** sprite is added with three scene costumes, serving as the solid collision surface and visual level layout. The collision detection method changes from `touching color (#9966ff)?` to `touching (Level)?` via the `Check Touching Solid` custom block. A scene-transition system is also added: when the player walks off either side of the screen, the scene number increments or decrements and the player is repositioned on the opposite side.

---

## New Sprites

### Level
**Status:** New

#### Variables
*(none)*

#### Costumes
| Name |
|------|
| Scene1 |
| Scene2 |
| Scene3 |

#### Sounds
| Name |
|------|
| pop |

#### Scripts

**`when 🚩 clicked`:**
```
when 🚩 clicked
go to x:(0) y:(0)
go to [back] layer
```
**Purpose:** Positions the Level sprite at the centre of the stage and sends it to the back layer so it renders behind the player.

---

**`when I receive [Change Scene]`:**
```
when I receive [Change Scene]
switch costume to (join [Scene] (SCENE #))
```
**Purpose:** Switches the Level sprite's costume to match the current scene number (e.g. scene 1 → costume "Scene1"), updating the visible level layout.

---

## Modified Sprites

### Sprite1
**Status:** Modified

#### Variables
| Name | Scope | Change |
|------|-------|--------|
| speed_x | This Sprite | Unchanged |
| last_value | This Sprite | Unchanged |
| falling | This Sprite | Unchanged |
| touching | This Sprite | Unchanged |
| temp | This Sprite | **Added** |
| distance | This Sprite | **Added** |

*(Note: `GRAVITY` default changed from `-1` → `-1.5` and `ACCELERATION` default changed from `1.5` → `2`. These are Stage-scoped variables whose initial values are set inside the `when 🚩 clicked` script.)*

#### Costumes
*(unchanged — costume1, costume2)*

#### Sounds
*(unchanged — Meow)*

---

#### Scripts

**`when 🚩 clicked` — CHANGED:**
```
when 🚩 clicked
set [GRAVITY] to (-1.5)
set [JUMP FORCE] to (12)
set [ACCELERATION] to (2)
set [RESISTANCE] to (0.8)
Reset and Begin Level
```
**Changes:** In Lesson 1 this script contained the full game loop (variable inits + `go to x y` + `forever` loop with all controls and physics). In Lesson 2 it only initialises constants and then delegates to the `Reset and Begin Level` custom block. The `forever` loop, movement, and controls have all been moved to separate broadcast-driven scripts and custom blocks. GRAVITY initialisation value changed from `-1` to `-1.5`; ACCELERATION from `1.5` to `2`.

---

**`when I receive [Game Loop]` — NEW:**
```
when I receive [Game Loop]
forever
  broadcast [Tick - Player]
  broadcast [Tick - Last]
end
```
**Purpose:** Drives the main game loop. Each frame it broadcasts `Tick - Player` (player input and physics) then `Tick - Last` (screen-edge/scene transitions). This replaces the bare `forever` loop that was inside `when 🚩 clicked` in Lesson 1.

---

**`when I receive [Tick - Player]` — NEW:**
```
when I receive [Tick - Player]
Controls - Up and Down
Controls - Left and Right
Move - in steps (abs of (speed y) + abs of (speed_x))
```
**Purpose:** Runs every game tick to handle player input and move the sprite. Delegates to three custom blocks: jumping/gravity, horizontal movement, and the sub-pixel collision-aware movement routine.

---

**`when I receive [Tick - Last]` — NEW:**
```
when I receive [Tick - Last]
if <(x position) > 235> then
  Begin Scene # ((SCENE #) + 1) go to x: (-235)
end
if <(x position) < -235> then
  Begin Scene # ((SCENE #) - 1) go to x: (235)
end
```
**Purpose:** Checks whether the player has walked off the right or left edge of the screen. If so, advances or retreats the scene number and repositions the player on the opposite side, creating a side-scrolling scene-transition effect.

---

**`define [Move - in steps %s]` — CHANGED:**
```
define [Move - in steps %s]
change [falling] by (1)
repeat (steps)
  set [last_value] to (x position)
  change x by ((speed_x) / (steps))
  Check Touching Solid
  if <(touching) > 0> then
    set x to (last_value)
    set [speed_x] to (0)
  end
  set [last_value] to (y position)
  change y by ((speed y) / (steps))
  Check Touching Solid
  if <(touching) > 0> then
    set y to (last_value)
    if <(speed y) < 0> then
      set [falling] to (0)
    end
    set [speed y] to (0)
  end
end
```
**Changes:** The collision condition `touching color (#9966ff)?` (used in both the X and Y collision checks) has been replaced with calls to the new `Check Touching Solid` custom block followed by `(touching) > 0`. This decouples collision detection from a hard-coded colour, instead checking whether the sprite touches the Level sprite.

---

**`define [Controls - Up and Down]` — NEW:**
```
define [Controls - Up and Down]
if <key (up arrow) pressed?> then
  if <(falling) < 3> then
    set [speed y] to (JUMP FORCE)
  end
end
change [speed y] by (GRAVITY)
```
**Purpose:** Handles vertical player input (jumping) and applies gravity each tick. This logic was previously inline inside the `forever` loop in `when 🚩 clicked`.

---

**`define [Controls - Left and Right]` — NEW:**
```
define [Controls - Left and Right]
if <key (left arrow) pressed?> then
  change [speed_x] by (0 - (ACCELERATION))
end
if <key (right arrow) pressed?> then
  change [speed_x] by (ACCELERATION)
end
set [speed_x] to ((speed_x) * (RESISTANCE))
```
**Purpose:** Handles horizontal player input and applies friction/resistance each tick. Previously inline inside the `forever` loop.

---

**`define [Check Touching Solid]` — NEW:**
```
define [Check Touching Solid]
if <touching (Level)?> then
  set [touching] to (1)
else
  set [touching] to (0)
end
```
**Purpose:** Tests whether the player is touching the Level sprite and writes the result (`1` or `0`) into the `touching` variable. Called twice per step inside `Move - in steps` (once after the X move, once after the Y move).

---

**`define [Reset and Begin Level]` — NEW:**
```
define [Reset and Begin Level]
set [SCENE #] to (1)
set [speed y] to (0)
set [speed_x] to (0)
set [falling] to (99)
go to x:(-174) y:(-55)
point in direction (90)
broadcast [Change Scene]
broadcast [Game Loop]
```
**Purpose:** Resets the player's state (velocities, falling counter, position) to the starting configuration and kicks off the broadcast game loop. Called at startup from `when 🚩 clicked` and can be called again to restart the level. The starting position changed from `(-150, 55)` (Lesson 1) to `(-174, -55)`.

---

**`define [Begin Scene # %s go to x: %s]` — NEW:**
```
define [Begin Scene # (scene #) go to x: (x)]
set [SCENE #] to (scene #)
set x to (x)
broadcast [Change Scene]
stop [other scripts in sprite]
wait (0) seconds
Fix Collision in Direction (0)
broadcast [Game Loop] and wait
```
**Purpose:** Transitions to a new scene number, repositions the player at the given X coordinate, updates the Level costume, then restarts the game loop. The `stop [other scripts in sprite]` + `wait (0) seconds` pattern halts the current game-loop tick before restarting with `broadcast and wait [Game Loop]`.

---

**`define [Fix Collision in Direction %s]` — NEW:**
```
define [Fix Collision in Direction (dir)]
set [temp] to (direction)
set [distance] to (1)
point in direction (dir)
repeat (64)
  Check Touching Solid
  if <(touching) < 1> then
    point in direction (temp)
    stop [this script]
  end
  move (distance) steps
  turn right (180) degrees
  change [distance] by (1)
end
```
**Purpose:** After a scene transition the player may spawn inside solid geometry. This block nudges the sprite outward in small steps (with growing distance) until it is no longer touching the Level sprite, then restores the original direction. Uses variables `temp` (stores original direction) and `distance` (step size that grows each iteration).

---

## Stage Changes

| Item | Type | Change |
|------|------|--------|
| `SCENE #` | Variable (global) | **Added** — tracks the current scene number (starts at 1) |
| `Game Loop` | Broadcast | **Added** |
| `Tick - Player` | Broadcast | **Added** |
| `Change Scene` | Broadcast | **Added** |
| `Tick - Last` | Broadcast | **Added** |
| `GRAVITY` stored default | Variable value | Changed from `"-1"` to `"-1.5"` |
| `ACCELERATION` stored default | Variable value | Changed from `"1.5"` to `"2"` |
| `backdrop1` | Backdrop | Asset replaced (same name, different SVG content — the stage background was updated) |

---

## Removed Sprites
*(none — all Lesson 1 sprites are present in Lesson 2)*

---

## Unchanged Sprites
*(none — both targets were modified)*

---

## Reference: Lesson 1 Scripts (for diff context)

### Sprite1 — Lesson 1 `when 🚩 clicked` (full, now replaced)
```
when 🚩 clicked
set [GRAVITY] to (-1)
set [JUMP FORCE] to (12)
set [ACCELERATION] to (1.5)
set [RESISTANCE] to (0.8)
set [speed_x] to (0)
set [speed y] to (0)
go to x:(-150) y:(55)
forever
  if <key (up arrow) pressed?> then
    if <(falling) < 3> then
      set [speed y] to (JUMP FORCE)
    end
  end
  if <key (left arrow) pressed?> then
    change [speed_x] by (0 - (ACCELERATION))
  end
  if <key (right arrow) pressed?> then
    change [speed_x] by (ACCELERATION)
  end
  set [speed_x] to ((speed_x) * (RESISTANCE))
  change [speed y] by (GRAVITY)
  Move - in steps (abs of (speed y) + abs of (speed_x))
end
```

### Sprite1 — Lesson 1 `define [Move - in steps %s]` (collision detection diff)
```
define [Move - in steps %s]
change [falling] by (1)
repeat (steps)
  set [last_value] to (x position)
  change x by ((speed_x) / (steps))
  if <touching color (#9966ff)?> then        ← L1 uses colour
    set x to (last_value)
    set [speed_x] to (0)
  end
  set [last_value] to (y position)
  change y by ((speed y) / (steps))
  if <touching color (#9966ff)?> then        ← L1 uses colour
    set y to (last_value)
    if <(speed y) < 0> then
      set [falling] to (0)
    end
    set [speed y] to (0)
  end
end
```
