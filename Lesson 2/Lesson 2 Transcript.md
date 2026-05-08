[Intro]
(0:01) -  Hello fellow Scratchers, I’m Griffpatch, and this is part 2 of our classic Scratch Platformer tutorial in which… we are aiming
(0:09) - to make something pretty special! Yeah, just look at this, Love it. And we sure made a
(0:15) - strong start last episode, building out the basic movement and a clever robust collision detection system. Today we are going to start fleshing out our level, Adding multiple scenes
(0:25) - to visit, and addressing common bugs we Scratchers face when things don’t quite line up as required. Just so you know, there’s no need for you
(0:33) - to make your levels the same as mine, you are free to design them any way you like, and it won’t stop you following this tutorial. The same is true with the variables at the
(0:42) - top of the scripts. For this episode I’m upping my ACCELERATION to 2 so I can move
(0:47) - a bit faster as we test our code! So, as we begin, why not save your episode
(0:55) - 1 project as a copy, and we’ll begin Episode 2! Ok guys – Let’s get Scratching! 

[The Problem with Multicoloured Levels]
(1:01) - So, We began this project by drawing our level as a ‘backdrop’ costume. This was a cool
(1:07) - way to get fast results, and makes for easier scripting… but it also has its limitations.
(1:12) - Say we want to introduce more colour to our level. I could for example make each step
(1:18) - a different colour. All to many Scratch platforms have boring levels without much colour because
(1:23) - they are limited to using the touching colour blocks, and we’ll soon see why! As you can see – None of the steps are counted as part of the level, and our player can walk
(1:35) - and jump right through them. Only the floor and floating platforms are now considered as solid areas to be walked on. Click into the Player Sprite and let’s look
(1:44) - at the “define Move - in Steps” script first. Can I just note, if your project has
(1:49) - been lagging, just make sure this custom block was set to run without screen refresh ok?
(1:56) - So here we are checking for collisions, just with the colour purple. The problem with touching
(2:02) - colour block is that this will ONLY detect collisions with the precise colour that is chosen in the touching colour block, so if we wanted the player to also collide with
(2:11) - another colour in our level, we need to go ahead and combine the sensing blocks together with an OR operator, that is: We are colliding if we are touching the 1st colour, OR touching
(2:22) - this 2nd colour. Make sure to use OR, not and AND operator, otherwise a collision would
(2:27) - only be detected when the player is touching both colours at the same time, not one or
(2:32) - the other! That’s not what we are after. So, we need to duplicate this test into the second check below for vertical collisions too.
(2:40) - Let’s give it a test – Now we find we can collide happily with both the floor colour,
(2:46) - and the 1st step’s colour… but still still have 2 step colours that are uncolliding.
(2:52) - Man, so what, do we need to add them all? You can see why this can become a headache!
(2:58) - And what’s more, the more colours we need to detect, the slower our project will run. 

[Change from Backdrop to a Level Sprite] 
(3:07) - Well, there is an alternative, we could switch to using Sprite collisions instead of colour based collisions. This has its advantages,
(3:12) - as sprite sensing is both considerably faster, and allows for any number of colours to be
(3:18) - used in a costume without needing extra checks. Also, unlike with colour sensing blocks, sprite
(3:25) - collisions are not prone to missing collisions when multiple sprites overlap . There are
(3:30) - downsides of course, as every colour will now be solid making it more tricky to design simple one costume levels… with colours for lava, spikes, and other actions… but
(3:40) - well, that’s for another episode entirely. So, let’s take the plunge and begin by making
(3:46) - a new sprite, naming it “Level”. Then click into the Stage Backdrop, and drag
(3:53) - the level costume right across into the new Level sprite like so. From this point, we
(4:01) - no longer want this backdrop costume, so, making sure nothing is selected, we can click
(4:06) - the Delete button to clear the entire backdrop. Great, click back into our new Level sprite,
(4:13) - and – oh yes, we can click on the first empty costume, and delete it, leaving us with
(4:18) - just the level costume itself. Move into the code tab. So, because the level is now a sprite, not a backdrop, it isn’t positioned correctly
(4:27) - on the stage. We should address that first. When green flag clicked, go to an x/y of 0,
(4:36) - 0. Then, for good measure, we’ll send it behind all the other sprites. Go to back layer.
(4:44) - A quick test should show the colour sensing works just as well with sprites as with backgrounds…
(4:51) - Ok, in the Player sprite, find the colour sensing blocks. Now that we have the level
(4:56) - drawn as a sprite costume, we can substitute all the touching colour blocks with a simple
(5:01) - touching block, and from the dropdown choose the “Level” sprite – Nice. This can
(5:08) - fully replace both touching colours here… and here. Now this is exciting, we’ve made a quick switch from colour, to sprite collisions.
(5:18) - If we run the project, this is looking like normal, but Hey look! We are colliding with
(5:23) - all the stair colours! That’s not bad right! Not bad at all! 

[Consolodate Touching Scripts] 
(5:29) - Ok, so this is the way I want to proceed with the collision detection in this platformer, but it doesn’t have to be done this way, you can choose to keep on using colour sensing if that suits you better. As we continue to
(5:38) - enhance this project, there will be even more colours and sprites to collide with, like moving platforms and other sprite costumes. Therefore, to avoid us making the same checks
(5:49) - in many places, let’s make a custom block, naming it “Check Touching Solid”, and
(5:54) - make it run without screen refresh. Using an IF ELSE block, check if we are touching
(6:03) - the level. I want this to be the only place that we check for actual collisions in this entire sprite, replacing both the other two checks here, and replacing any future collision
(6:14) - checks too. This bit of code will then be the only place we need to update to add new
(6:19) - collision sprites or colours to. We’ll need a new variable, name it “touching”
(6:26) - for this sprite only. Set it to 1 when we are touching level, and 0 when we are not.
(6:38) - So… it would be nice if Scratch just let us just drop this new block into the IF condition
(6:46) - here, but sadly we don’t yet have that functionality in scratch! A feature many scratchers look
(6:51) - wistfully forward to! Anyhow, for now, drop the new custom block just before the IF condition,
(6:58) - and then we simply check for the variable ‘touching’ being greater than 0.
(7:04) - We do the same for the 2nd touching block. Indeed, this will be the patten we use for
(7:12) - all collision checks from now on. Use the “Check Touching Solid” block, and follow it up with an IF touching > 0 to check for solid collisions between this sprite and the
(7:21) - level. It would be a good idea to give that a quick test, ensure it’s all still running as expected… Great!

[Organise our code]
(7:28) -  Before we begin adding more scenes to our level, let’s look back at our Player code from episode 1.
(7:36) - Ok, nice – This is pretty much everything. It’s concise, but it’s not very well laid
(7:41) - out. We have a few long scripts that are doing everything, and that will make it hard for
(7:46) - us as we continue to build the project up. We need to break it up into events and custom
(7:51) - blocks with names. Then in future, when I ask you to find a certain script, I can simply tell you its name and we can find it together. Let’s start with the contents of this forever
(8:02) - loop. This is our main game loop, and the scripts inside run once every frame of the
(8:07) - game. Pop in a broadcast block and make a new message “Tick - Player”. I use the name Tick because it reminds me of the ticking of a clock. The
(8:17) - scripts in this event need to run in just a single tick of the game, just a single tiny movement of the player, but with 30 ticks running every second, this produces the games
(8:27) - animation. All the scripts we detached here can now be hooked up under a “when I receive Tick – Player” hat block.
(8:35) - So now let’s split this long tick script into its component parts. The first is the check for the jump key (the up arrow key in my case). Make a new custom
(8:45) - block, naming it “Controls – Up and Down” (run without screen refresh).
(8:54) - These jump scripts can be attached to the define block, and then make use of the actual custom block under the tick receiver here. Next up are the left and right arrow key checks.
(9:06) - I’ll make a similar custom block for these, naming it “Controls – Left and Right”,
(9:14) - again run without screen refresh. We’ll use this block after the previous
(9:23) - one. There that’s nice, it’s getting much easier to see what scripts do what. Ok, this
(9:30) - last “move – in steps” block can be moved back on to the end. Now if I just tidy this up – Please note I’m using Scratch Addons here, and it’s
(9:39) - my Scratch Dev Tools extension that provides us with the “Clean up Blocks +” feature that keeps the scripts in tidy columns. There’s a link to the extensions under this video
(9:49) - if you don’t have it already, I know a lot of Scratchers do. Oh hold on, you see this “change speed y” block here in the Left Right controls script,
(9:57) - this should be moved up into the Controls – Up and Down script instead as it’s to do with movement in the up, down direction. Is it all still all working…? Yep – excellent.
(10:09) - Ok, so scroll to the start of the project, the when green flag clicked. These first 4
(10:17) - set blocks are the project settings, and everything underneath is for resetting the level, and
(10:22) - beginning the game loop. We can create a new custom block named “Reset and Begin Level” – However, be careful to NOT tick the run without screen refresh,
(10:33) - that’s right I know… it’s crazy right 😊. But some of the things we do in here don’t run over a single game frame. Bring in the new block and use it here, then
(10:43) - the rest of the scripts go under the new define block. Finally, we are going to separate off the forever loop itself. This time we’ll use
(10:54) - a broadcast, and name it “Game Loop”. A receiver for this can go above the forever
(11:04) - loop like so. Super!!! That’s our code all named and reordered.
(11:10) - That’s much tidier. Before we continue though, we should be good coders and ensure we have truly reset everything in this Reset and Begin script.
(11:19) - We should add in a set speed x to 0. And also a set falling to 99. The reason to set falling
(11:28) - to a big number is to ensure we can’t jump right away until we are touching the ground.
(11:35) - Ok – Final Test. Yeah, it’s always worth ensuring things haven’t got broken after
(11:40) - all that moving scripts around! The scripts are also looking much cleaner.
(11:45) - I think I might just take this “when I receive tick – player” script up to the top of the second column as its rather wide. 

[Change of Scene – A Multi-screen level]
(11:54) - Hoorah, it’s time! Finally to make a new screen for our level! We want to be able to walk off the right hand side of this level and get to the next screen. To do this we’ll
(12:04) - begin by going to the costume editor of the Level sprite. Duplicate the first costume. Now what I want to do is flip this whole screen horizontally,
(12:17) - left to right. That’s a really quick way to ensure everything lines up. However, watch
(12:23) - this. If we click the flip horizontal button, we have a problem. Scratch flips the entire
(12:28) - sprite as expected, but… it’s no longer centred on the canvas. See how there’s extra
(12:34) - space on the left, and the floor is overlapping on the right? Bother. This is because Scratch
(12:40) - flips the costume around the costumes middle point, not the middle point of the canvas
(12:45) - here. Well, don’t fret, I have a trick to get around this which I use all the time. Undo that last flip, and then select the rectangle
(12:55) - tool. Now zoom out and draw the biggest rectangle you can. It must be bigger than the costume
(13:00) - you are trying to flip. Next, drag the rectangle to ensure it snaps to the middle of the canvas
(13:06) - – this is a crucial step so don’t skip it! And now… if we select all the objects
(13:12) - on the canvas using the selection tool, then click the flip horizontal button, everything
(13:18) - is flipped around the middle of the canvas this time! Finally, unselect everything, and
(13:23) - then select and delete the big rectangle leaving just our flipped level all nicely lined up.
(13:29) - Ta-da – Yay, isn’t that useful. Now that we have two screens for our level, let’s make sure to give the costumes good names. This will be important so make sure
(13:39) - you write exactly the same as me. I’m going to name each one as Scene, with a capital
(13:46) - S, and then immediately after that with no space, the number 1. The second costume will be Scene2, and so on if you want more scenes.
(13:57) - Well done, now in the code tab of the Level sprite we can add some new scripts to control
(14:02) - the changing of these so called scenes. This can be done through a broadcast, so “when
(14:09) - I receive”, and a new message of “Change Scene” would be quite appropriate don’t
(14:15) - you think. When this occurs, we switch costume to… And obviously we don’t know which to choose, but it has to start with the word Scene, so
(14:24) - we’ll use a join, entering “Scene” on the left, but obviously banana is not going
(14:32) - to cut it, so let’s make a new variable named “SCENE #”, making it for all sprites
(14:41) - this time, and drop it in the right hand side here. This means by setting this scene variable
(14:47) - to say 1 (click it), and then clicking the change scene, our level will then chance scene
(14:56) - as appropriate. Ok, enough of that, delete it and click into the Player sprite.
(15:05) - Find the define Reset and Begin Level script. We now have a SCENE variable to reset. So
(15:12) - set it to 1 right at the top. But setting this variable alone is not enough, we also
(15:17) - need to broadcast “Change Scene”. Make sure to do that just before broadcasting Game
(15:22) - Loop so that the level is already when the game begins! Give that a test… And of course I can check that changing the
(15:29) - starting scene does in fact change where we begin… and it does. Super!
(15:35) - But we still can’t get to the next level by walking off the right hand edge of the screen! So that’s next – exciting!!! 

[Moving off the Edge of the Screen]
(15:44) - Find the “when I receive Game Loop” script. We already have this “broadcast Tick – Player”.
(15:50) - This handles the player’s movement. We are now going to introduce another event that handles the player moving screens. Broadcast, a new message of “Tick - Last”. Why “last”?
(16:02) - Well it’s simply because I want this to be the last event broadcast in the game loop before the screen updates, simple as that. The good thing about putting a list of broadcasts
(16:12) - in a loop like this is that they will all get run in one frame together, but importantly
(16:18) - they get run in the order you broadcast them. So, this new one… that will run last.
(16:24) - So, when I receive “Tick – Last”, we’ll check for an x position greater than 235.
(16:33) - Yeah, 240 is actually the far right of the screen, but you may find if your player is
(16:40) - too small that they can’t go that far off screen, so let’s stick with 235, 5 pixels
(16:46) - less. What do we do if the player goes off the right, well, add one to the SCENE # variable using a change SCENE # by 1. Then broadcast Change
(16:57) - Scene to make it happen! Let’s give that a test. Run along and…
(17:02) - Cool, yeah – The Scene has changed… in fact it’s going a bit hay-wire, just ignore
(17:08) - that for a second… What we really need to address is that even though the scene changed,
(17:13) - our player stayed on the right side of the screen, but we really would have expected them to appear now on the left. We can do that easy enough. Just set x to
(17:23) - -235. That’s right, negative 235, the left side of the screen. Run the project.
(17:31) - Here we go…! Oh man, that looked good 😊 ! Now we just need to be able to do the same
(17:38) - to move back onto the first screen!? Well no problem at all, duplicate the IF check,
(17:46) - and we swap the greater than for a less than, and check for when x position is less than
(17:53) - -235. That will be off the left side of the screen. Then of course we change Scene by
(18:01) - -1 to make it go to the previous scene number. Don’t forget to also set x to positive 235
(18:10) - to get the player to move to the right hand edge of the screen too. Run it again – Off I go to the right, and then coming back… here we are back in Scene
(18:19) - 1, superb! This is already a lot of fun! So, does the fun have to end in just 2 scenes?
(18:27) - Absolutely not, as we go off the right again we enter scene 3! But… we don’t yet have
(18:34) - a Scene 3, so let’s quickly make one. Click into the level sprite, and duplicate
(18:39) - costume 2. Notice that the costume name has been automatically set to Scene3, so that’s
(18:45) - nice. I’ll just change this costume around a bit to make it different, and then… Here we go… Scene 1, Scene 2, and… Scene
(18:57) - 3! Wasn’t that easy!!! I love it. 

[Getting Stuck in the Level] 
(19:06) - Well, this has all been smooth sailing thus far, what was all the fuss about? Well, I don’t know if you’ve been designing your levels just like me, or if you did things your own way… it’s possible you may have already discovered where things get tricky.
(19:15) - Let me give you a clue. Come back into the Level sprite, and I’ll switch to the second
(19:21) - scene. Remember how we carefully duplicated this costume from the first and flipped it.
(19:26) - This was very purposeful to ensure that the right hand side of the first scene lined up
(19:31) - perfectly with the left hand side of the 2nd scene. So, what happens if this is not the
(19:37) - case? Let’s find out. Select all the elements on the canvas and move them down by a few
(19:43) - pixels… Make sure to unselect them before running the project otherwise the arrow keys
(19:49) - can keep on changing the position of the selected shapes! I hate it when that happens.
(19:55) - Now, moving off the right is no problem at all. So how about moving back to scene 1 to
(20:00) - our left? Oh no! – Disaster!!! We have become stuck in the ground!? Do you see why this
(20:07) - happened? The floor of scene 2 is now lower than scene 1. When we appear back on the right
(20:13) - of scene 1 we are therefore still slightly overlapping the ground. This is fatal to our
(20:18) - engine and causes the player to become permanently trapped, unable to move. Very unpleasant,
(20:24) - and no fun at all for the now very sad player of your otherwise epic game! What’s more, we may not only get stuck in the floor… for example, if we place a platform
(20:34) - here above the ground… then jump across to the next screen! Arrghh, stuck again!
 

[Preventing collision bugs] 
(20:40) -So with this second example, it’s basic good level design that we don’t put in unavoidable collisions like this. However, the first example,
(20:49) - that is a legitimate problem that we should try to address in code. Not only because it makes our lives easier when designing levels, as we don’t have to be pixel perfect at
(20:59) - lining up our costumes, but also because in Scratch nothing is ‘ever’ pixel perfect when it comes to sprite collision detection… so we’d better be prepared to handle it
(21:07) - ourselves. What we will do therefore is detect the collision after changing scenes, and then move the player up and down, moving further and further away
(21:17) - from the original location, until we find the closest position where they are no longer colliding. And then stop there, we are out of the collision. Simple enough right? So
(21:27) - let’s code that up. In the player sprite, find the “when I receive Tick – Last” script. So notice we have a bit of repetition here,
(21:36) - the scripts for moving off the right side of the screen and moving off the left side are very similar. And since we are now going to add move code to these, let’s make a
(21:45) - new custom block to wrap up this functionality, naming it “Begin Scene #” with a numeric
(21:51) - input of “scene #”, a text label “go to x:” and another numeric input named “x”.
(21:59) - Please note, we are again NOT using the run without screen refresh option… We mustn’t
(22:05) - as a change of scene takes more than one frame to complete. Ok, so move the scripts from one of these Ifs into the new custom block definition.
(22:14) - In its place we put our new block. Now the scene input needs to be set to the actual
(22:22) - scene number we want to move to rather than just a 1 or -1. This will allow the begin
(22:27) - scene block to be used in more ways, but it does mean we need to pass in the full SCENE
(22:32) - # + 1 here. The x position wants to be the same -235 that we had before.
(22:40) - Now let’s update the custom blocks scripts. Hook up the set x with the pink “x input”
(22:46) - variable. But we need to make sure to replace the change SCENE, with a set SCENE # to, and then set it to the pink scene # input variable.
(22:55) - Cool, we can duplicate the block for the left hand edge transition. Setting x to positive
(23:05) - 235, and change the 1 to a -1. Quick test… Yep, it’s working just the
(23:18) - same… So what are we going to do differently this time to check for the player getting stuck? Firstly we need to ensure to stop the main
(23:26) - game loop… to do this, drop in a “Stop other scripts in sprite” right after the
(23:32) - broadcast change scene. We can test that… Yep… the scene changes,
(23:39) - and the project has stopped running. We can see that because the red stop sign has gone dim. The reason we stop things is that we want to check for and fix collisions before
(23:49) - the game loop continues to run. Next I’m going to move the set x block up to before we broadcast the change scene, just to make it clear that this occurs before the
(23:59) - scene changes. Ok, so we want to check whether the player is now colliding with the level after we changed scene right? But not so fast, when using a
(24:09) - broadcast “change scene” without a wait, the event is not actually run right away,
(24:14) - but is instead queued up to run later. But we do need it to happen before doing any collision checks, so the simplest way is to drop in a wait for 0 seconds after the broadcast.
(24:26) - This way the level will have a moment to update and we are now ready to detect collisions.
(24:32) - We’ll make a new custom block named “Fix Collision in Direction” with a numeric input
(24:38) - “dir”. This time please DO tick the run without screen refresh as this needs to run
(24:45) - fast! Use it right away after the wait block, and
(24:51) - set the direction, the dir to 0. This means up as we will want to begin by searching up
(24:57) - and down to get out of any collisions. Finally after the new block, remember that
(25:03) - we stopped the main game loop. So we’ll start it up again using a broadcast “Game
(25:08) - Loop”. I think it’s worth another quick test to ensure things are still holding together as planned. I just need to walk off screen, yep
(25:17) - the game loop is working again, but the bug is still not fixed. So let’s shake things
(25:22) - up and get un-stuck! 

[Getting Un-Stuck] 
(25:29) - We are going to be moving, turning, moving and turning to get them out of the ground, so we’ll make a note of the direction they are currently facing by creating a new variable “temp”. That stands for temporary, making it for this sprite only.
(25:39) - And set temp to the player’s direction. To restore their direction again at the end
(25:48) - we’ll use a point in direction, temp. Like that.
(25:53) - Now make another new variable, naming it “distance”, for this sprite only. This will keep track
(26:00) - of how far we should move looking for a non-collision. Begin by setting it to 1.
(26:09) - Next we point in direction, and use the input variable dir. This is the direction we want
(26:14) - to begin moving in to get un-stuck. So we are going to need a repeat loop, and
(26:20) - let’s opt for 64 attempts to get free? Next up, before we’ve even moved anywhere,
(26:27) - we’ll look to see if we are actually colliding with the level! Use our “Check touching
(26:34) - solid” block, and then IF touching < 1 then no collision is occurring, so we are good!
(26:41) - Use that point in direction temp to restore our direction to what it was before, and then stop this script to break out of this repeat loop… We are done.
(26:49) - But… if we are still touching, we have work to do to get free. We move forward by the
(26:56) - value of our distance variable. That would be 1 pixel to begin with. Then, we turn around
(27:01) - by 180 degrees ready to move back and check the opposite side. Lastly, change distance
(27:09) - by 1 so that next time we move we will move further… And that’s basically it because
(27:14) - now this repeat loop will run over and over moving us further each time until the player is no longer colliding, or that is until we’ve tried 64 times. Without a maximum number of
(27:26) - tries we can get into infinite loops that lag out our Scratch project horribly. The good news is that we can test this custom block super easily. This is really fun. So
(27:36) - simply position the player overlapping the level, and then click on the custom block…
(27:41) - Because we ran the custom block by clicking on it, it doesn’t run without screen refresh,
(27:47) - so we get to see it in action wiggling up and down further and further, until the player is no longer colliding! I love that 😊 – So cool. And it works for both collisions below
(27:57) - and above the player. So, how does it look when it runs full speed?
(28:03) - Just drop in a fix collision block, and test it by clicking that instead. Pow – The player instantly jumps to the surface.
(28:10) - And as before, it works for both upper and lower collisions, finding whichever is the nearest free space. Excellent!!! So, we’ve already plugged this in to our
(28:20) - begin scene script, so we can give this an official test! Run the project and let’s see… Can we come in from the right now?
(28:30) - Yes we can!!! Celebration time, that is awesome news. I wonder if we can also jump into that floating platform? Jumping now… and yes it appears
(28:40) - to be working… moving me both up and down as needed. Yes!!! I guess we might as well hide all these variable reporters – I’ll leave the Scene number
(28:50) - as that’s quite useful to see. 

[Bad Level Design] 
(28:59) - So, just before we finish, what would happen if I still made a bad level design and blocked the player more severally with a larger wall. Well, of course no problem coming in along
(29:07) - the ground, but jumping… and boom… I am stuck again! Well, that’s quite inevitable. Bad level design will lead to a bad platformer, so do
(29:17) - think carefully about where you put your walls. However, we could still be a little more tolerant
(29:24) - of these collisions if we wished, simply find the Fix collisions in direction script, and
(29:30) - up this 64 to a bigger number like 128. Now if we test again we find that even this wall
(29:37) - is handled in a very acceptable manor. Another consideration is that we also need
(29:44) - to prevent the player walking off the level to scenes that don’t exist, to the far right, but also the far left… See how we can get to Scene 0… To prevent this it might be
(29:54) - a good idea to draw in a left hand wall on scene 1 of your level sprite.

[Outro] 
(30:01) - Ok, this is so cool. We’re creating a whole 
(30:06) - little world for this guy and it feels so nice to play, and to explore. Now, you may be happy with your platformer only changing scene left and right, but in
(30:15) - a future episode we’ll also look at allowing the scene to change up and down too, I’m
(30:21) - really looking forward to that, as well as all the other super cool features you see here like animating player costumes, wall jumping, moving platforms and so much more!
(30:30) - This though is all we have time for today, but I do hope you’ve enjoyed this episode, if you have then please squish the like button, and if you haven’t subscribed yet, then
(30:39) - you must do that right away, we don’t want you missing part 3 when it comes out do we!
(30:44) - If you want to support this channel or want to catch episodes early, then you can join the channel membership, you can also get prioritized comments with super cool custom channel emoji,
(30:54) - or access to the tutorial scratch projects themselves. This channel wouldn’t be here without your support, so thank you so much! Until next time, have a great week ahead,
(31:03) - and Scratch On guys!
