This video, "Code a Platformer Game | 2. Next Level" by griffpatch, focuses on transitioning from a basic prototype to a more robust, multi-scene game engine. It covers optimizing collisions, refactoring code for better organization, and implementing a system for switching between different levels (scenes).

1. From Color to Sprite Collisions [03:07]
The video begins by moving away from "touching color" blocks to sprite-based collisions.

Rationale: Color sensing is slow and requires a new "OR" block for every new color added to the level. It also struggles with overlapping colors [02:59]. Sprite sensing is significantly faster and allows you to use any color in your level costumes without changing the code.

The Change: The backdrop is moved into a new "Level" sprite. All touching color []? blocks are replaced with a single touching [Level v]? block [05:03].

2. The Collision Custom Block [05:42]
To keep the code clean and centralize collision logic, a new custom block is created.

The Block: define check touching solid (Run without screen refresh).

Logic: It uses an if/else block to check if the player is touching the Level sprite. It sets a variable called touching to 1 if true, and 0 if false [06:06].

Explanation: This allows all future collision checks (like moving platforms or lava) to be added in one single place rather than updating every movement script [06:13].

3. Refactoring: The "Tick" System [07:51]
As the code grows, the video explains the importance of breaking long scripts into smaller, named "events" and custom blocks.

The Tick: A broadcast named tick player is used inside the main game loop [08:10]. This represents one "tick" or frame of the game.

Modular Controls: The controls are split into:

controls up and down: Handles jumping and gravity [08:42].

controls left and right: Handles horizontal acceleration and friction [09:08].

Reset & Begin: A custom block reset and begin level handles setting starting variables like speed x to 0 and falling to 99 (to prevent jumping mid-air at the start) [11:17].

4. Scene Switching Logic [13:35]
To create a "world," the level is split into multiple costumes (e.g., Scene1, Scene2).

Centering Trick: To flip a level costume so it perfectly aligns with the previous one, you draw a large rectangle that snaps to the center of the canvas, select everything, flip it horizontally, and then delete the rectangle [12:53].

change scene Broadcast: A variable scene # is used to track the current level. When the player moves off-screen, the code joins the word "Scene" with the scene # variable to switch costumes [14:20].

5. Screen Transitions [16:26]
A new broadcast, tick last, handles checks that must happen after movement is calculated.

Logic: If the player's x position is greater than 235 (right edge), the scene # increases by 1, and the player is teleported to the left edge (-235) [17:21]. The opposite happens for the left edge [18:02].

Custom Block: This logic is wrapped in a begin scene hash (scene) go to x (x) block to make it reusable [21:46].

6. Fixing "Stuck" Collisions (The Wiggle Algorithm) [20:51]
One common bug in platformers is getting stuck in the floor when a new scene loads if the ground isn't perfectly aligned.

The Solution: The fix collisions in direction block (Run without screen refresh) [24:30].

The "Wiggle" Logic [27:33]:

Save the current direction in a temp variable.

Use a repeat 64 (or 128) loop.

Check if the player is touching the level. If not, stop the script (success!).

If touching, move forward by a distance variable (starts at 1), then turn 180 degrees.

Increase the distance and repeat.

Rationale: This causes the player to "wiggle" up and down further and further until they find the nearest empty space, instantly popping them out of the ground [28:06].