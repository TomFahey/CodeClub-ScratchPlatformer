[Intro]
(0:02) - Hello fellow Scratchers,
(0:03) - I’m Griffpatch and I love all kinds of Scratch Projects, especially Platformers, but until
(0:08) - now I’ve not covered the traditional bread and butter of Scratch, the “Classic Scratch
(0:13) - Platformer”… There may be no scrolling or complex lists here, but we have great expectations,
(0:18) - because we are laying solid foundations to build up to something more like this!
(0:22) - Wow doesn’t that look great – Why not drop me a message in the comments below to
(0:26) - share what you are most excited to learn about! There’s a lot to see, from the solid platforming,
(0:31) - to wall sliding. Scratch cat’s feet matching the slope he is standing on, did you see that?
(0:36) - Moving platforms, and lava, Wall jumping and level navigation. Oh wow…
(0:41) - This is all classic Scratch coding, there’s no complex lists or grids to worry about,
(0:46) - just Scratch at its best using simple level costumes drawn within the scratch costume
(0:50) - editor, and thus it’s going to be a breeze for you to take what we create together, and
(0:55) - in no time at all, make your very own style of game with it!
(0:58) - Oh yeah, so excited! But we have to start somewhere, and to ensure
(1:03) - we get things right, we’ll be starting simple and our concern will be with player movement
(1:08) - and collision detection – and for those who’ve done this all before, no - you may
(1:12) - not have done it quite like this before – So stay with us!
(1:17) - As with my other tutorials, if you want to begin this project by remixing by starter
(1:21) - project then there is a link under this video. This project contains all the costumes needed
(1:25) - to get Scratch Cat animating in later episodes. If you are not interested in following this
(1:30) - tutorial exactly, then don’t worry about using these, but even though we are not using
(1:35) - these costumes today, we will soon, and it might be easier if you have them in your project
(1:40) - right from the start. I’m just going to remix the project and
(1:43) - we’re ready to go! So, check out these costumes! Loads-o-cats!
(1:48) - Man yeah, they took me some time to draw, and no, I didn’t do them in Scratch. I painstakingly
(1:53) - drew them out in adobe illustrator. But as I said, today, we’ll make a ‘new costume’
(1:58) - for the player… Why are we doing this? Well because simple platforming scripts work best
(2:04) - with simple costumes. So, using mostly rectangles I can quickly draw a ‘’completely original’
(2:10) - square protagonist! Just please, please ensure you have him completely centred. You know,
(2:15) - by dragging the big square towards the middle of the drawing canvas until you see it snap
(2:20) - into place. Oh yeah… Gotta love ‘em – All I can
(2:24) - say is. You see this guy and you know exactly what game you’re about to play lol. I’m
(2:30) - going to christen him ‘Guy’ – There, job done.
(2:34) - You know, we should rename this sprite as “Player”, so we know what it’s for.

[backdrop]
(2:38) -  Now for the level. Some people prefer to use
(2:41) - backdrops, some people prefer to use sprites for some very good reasons… In these tutorials
(2:46) - I’m going to teach both! But today, it’s backdrops, so click with me into the stage
(2:50) - backdrop. Ensure you select the rectangle tool so that
(2:53) - we draw a perfectly straight line, and make a nice floor for our first screen.
(2:59) - Next we can make a few new rectangles to act as stairs.
(3:04) - And finally, I’ll add a little floating platform to test our skills!
(3:08) - That’ll do nicely, click back into the player sprite and we can begin to code!

[Gravity]
(3:15) - Begin as so often we do with a When green
(3:20) - flag clicked block, and then set the player’s position x to -150, and y to 50.
(3:29) - How do we get the player to fall to the ground, simple, a forever loop, and change y by, say
(3:37) - -1. Negative numbers move us downwards. Run that, and yeah – we at least can see
(3:43) - he does drop downwards, but very uninspiringly. The problem here is that objects do not fall
(3:48) - to the ground at a constant speed, nope, the longer they fall, the faster they travel right?
(3:54) - To keep track of our players speed we’ll need to make a new variable, naming it “speed
(3:59) - y”, for this sprite only (because it’s this players speed, no one else’s).
(4:03) - We’ll set speed y to 0 when the project starts,
(4:09) - and then change speed y by -1 each loop, and finally then change y by speed y. So now,
(4:18) - every time the player is moved down, they move a little faster than they did the time
(4:23) - before. Let’s give that a test. Splendid – That’s far more convincing
(4:28) - don’t you think. Our next goal is to actually stop when we hit the ground.

[Ground Collisions]
(4:33) - So, after we’ve moved down with the change
(4:36) - y by speed y, add in a IF, and (for the time being) we’ll check for touching color, and
(4:44) - use the colour picker to select the colour of your level. Now for all of you worrying
(4:49) - about using the colour sensing blocks, don’t fret, this is just for the time being as it
(4:53) - makes things easier to explain. Right, drop in a “stop all” block within
(4:59) - that IF and we can confirm that we are detecting the collisions.
(5:02) - Run the project and now everything comes to a halt as soon as the player is touching the
(5:06) - level. It’s worth noting here what touching actually means. Unlike in the real world where
(5:12) - you’d say you were touching something if you were pressed up against it, in Scratch
(5:16) - the objects need to be overlapping to be counted as touching. And this, this is overlapping
(5:22) - – check! Goal number 3 then is to get our player back
(5:27) - out of the ground again now that we have collided. Well, if we weren’t colliding last frame,
(5:32) - we could just move back to where we were before? To do that, we change y again, but this time
(5:38) - by negative speed y (that is 0 – speed y). Run that again – Hmm, as soon as we collided,
(5:47) - we quickly have been taken back to just before the collision occurred… That actually looks
(5:52) - pretty good, but notice the small gap under our player? That happened to be a rather lucky
(5:57) - fall, things can look a lot worse. Let me adjust our starting y position to 55 and run
(6:04) - the test again. Oh no – That is no good at all, we’ve
(6:08) - moved way too far. This strategy of just moving back out the floor by the same amount we moved
(6:13) - in doesn’t work. Instead we need to carefully move our player back up only a single step
(6:20) - at a time, until we finally reach the point where they are no longer colliding. Then we
(6:25) - can be sure they are not floating off the ground after the collision, and the world
(6:29) - will be set to rights. We’ll do this by repeating until we’re
(6:34) - NOT touching color. And in this repeat loop we change y by 1. That is, we move them up
(6:46) - 1 screen pixel. We don’t need the stop all block any longer…
(6:51) - If we run that, we can now see after a collision we are raised back up to the surface, but
(6:56) - then suddenly we plunge back down into the ground again! Why is that? Ok, simple… after
(7:01) - an impact with the ground, we need to reset our speed y to 0 since the impact should take
(7:07) - all the speed out of our fall. Great – Gone is the glitch, but I’m not
(7:14) - dead keen on the way the player is seen to glide up out of the ground.
(7:18) - Luckily this can be easily fixed using our friend the custom block.
(7:22) - So, make a new block, naming it “Fix Overlap” – and here’s the important thing, we click
(7:30) - “Run without screen refresh”. This means everything we place inside this block will
(7:35) - no longer animate, but will finish running before the screen refreshes. This is perfect
(7:40) - for getting the player out of the ground without us having to see it happen.
(7:44) - Move the entire repeat until block under the new define Fix Overlap block, replacing it
(7:50) - with the “Fix Overlap” block itself. Let’s see that in action. Oh yeah, smooth.
(7:58) - The player now looks to be falling and landing flush with the ground, no visible penetration,
(8:03) - and no floating or unwanted bouncing around. Perfect.
(8:06) - Ok, now before we move on, what if we wanted to change the speed at which the player falls
(8:12) - to the ground? Well, that we be a change in the force of gravity right, that’s our -1
(8:18) - value here. What we will do is create a constant variable specifically for this. Make a new
(8:24) - variable, naming it GRAVITY, for all sprites. And we’ll set it to negative 1 right at
(8:32) - the start. Then simply replace the change speed y by -1 with the new GRAVITY variable.
(8:39) - That makes it easier to remember how to change the force of gravity at any time later on.
(8:43) - Feel free to play with different values and have some fun!

[Jumping]
(8:46) - Talking of gravity, how better to show it
(8:49) - off than to add in the ability to jump! And this is surprisingly easy! Right at the
(8:55) - top of our forever loop add a new IF, checking whether the up arrow key is pressed. Then
(9:02) - we set speed y to a positive number, say 12. And, just run the project… Tap the up key
(9:12) - – And up we go! Our speed keeps us travelling up for a moment, and then gravity naturally
(9:16) - returns us back to the ground – That’s excellent. Of course, there’s nothing to
(9:21) - stop us holding down the up key and flying off! So it’s more of a rocket jump at present,
(9:26) - but not to worry, we’ll fix that later.

[Walking]
(9:30) - Let’s add in the left and right movement. IF left arrow key pressed, then… Ah, we
(9:40) - need a new variable for our x speed. Name it “speed x”, again for this sprite only.
(9:47) - Now when the left key is pressed, we can ‘change’, yes don’t set this time, change speed x
(9:54) - by negative 1.5. We’ll do the same for the right key, changing speed x by positive 1.5.
(10:08) - That takes care of our player’s acceleration, but doesn’t actually move them, that we
(10:13) - will do down here, just above the “change y by”, we add a “change x by, speed x”.
(10:23) - Run the project! And we are off, I can now press an arrow key
(10:27) - and the player begins moving in that direction… however I have to stress, they don’t then
(10:32) - slow down, but keep moving very fast in that direction, that is until I press the opposite
(10:38) - arrow key again. Oh man, that’s hard to control. What we need is some resistance,
(10:44) - that is friction with the floor to slow us down and stop us moving.
(10:48) - Not a problem, just before we change speed y, add in a SET speed x to, speed x * a value
(11:00) - between 0 and 1, I’m going to pick 0.8. The closer to 1 this number is the more slippy
(11:06) - the floor will feel. Play testing again… and that’s quite a
(11:10) - transformation – This is feeling much more like a platformer already.

[Rethink and Innovate!]
(11:14) - The next step , no pun intended, would obviously
(11:19) - be, to stop us colliding with this right hand step (or wall) by detecting the collision
(11:24) - and backing our player sideways carefully out of it, just like we did for gravity…
(11:29) - however… I’m going to stop us right there, and take a short breather! Why? Because I
(11:36) - want to try something a bit different. What I love about coding is that there’s always
(11:41) - space to innovate – To try doing things a little differently to see if you can improve
(11:46) - things! We yet have many problems ahead of us that
(11:49) - we will need to address, some easy to work around, others more problematic, for example,
(11:54) - like the player getting caught on the irregular pixels of steep inclines, the very pixels
(11:58) - that make up our bitmap level – man that’s a real doozey. What I am going to propose
(12:04) - is that, rather than moving the player in large steps until they collide, and then using
(12:09) - small steps to get out of the collision. We instead use small steps at all times while
(12:15) - moving the player. This allows us to detect collisions as soon as they occur, and also
(12:20) - allows us to handle the movement and collisions in far more detail going forward.
(12:25) - Shall we give it a go? We’ll begin by replacing just the change
(12:30) - y and collision script here. Make a new custom block named “Move – in
(12:36) - steps” with a numeric input of “steps”. Make it run without screen refresh.
(12:43) - As usual, drop in this new block where we took the original scripts from.
(12:48) - We’ll leave the steps input empty for a moment.
(12:51) - So, we want to move by speed y as before, but split up over a number of smaller steps.
(12:58) - We’ll start by repeating for the given number of steps.
(13:02) - It’ll be useful to remember the last position we were in before the move. Make a new variable
(13:06) - naming it “last value”, for this sprite only.
(13:13) - Set last value to the current “y position” of the player.
(13:18) - And now we “change y by”. But how much? Well, we need to divide the total distance
(13:27) - we want to travel (speed y) by the number of steps we are going to take (That is, ‘steps’).
(13:33) - We can then put back the collison check, removing the fix overlap. Since moving by small increments
(13:40) - can no longer leave us deeply overlapping the ground on collision, all we need to do
(13:45) - is restore the player to their last position before the collision, so set y position to
(13:49) - the “last value” we recorded. Now bring back the old fix overlap script,
(13:55) - did we forget anything, yes – we need to borrow the set speed y to 0 to ensure our
(14:00) - player is slowed down after the collision. Super! No looking back now, throw away the
(14:06) - old “fix overlap” scripts. Finally, looking back to where we make use
(14:10) - of the “move in steps” block. We need do decide on how many steps to split this
(14:15) - movement up into to ensure it’s accurate enough. Well, we could plum for a number,
(14:20) - say 100! Perhaps a bit overkill, but let’s just give that a test and see if it is working?
(14:27) - That seemed ok, let me try moving around… and even dare I bump my head, yeah, now that
(14:33) - didn’t work before . So, was 100 a good number of steps then? Well,
(14:40) - not really, No. Because performing a hundred checks every frame is far more than is required
(14:45) - when we might generally only be moving a few steps at a time max. Luckily we know how
(14:51) - far we are moving. It’s told to us by the value of ‘speed y’, only we just have
(14:56) - to be careful because it’s often negative, so how about we put the maths operator abs
(15:03) - in here around the speed y. Then it will switch it to always be a positive number, and the
(15:09) - perfect number of steps to take to move by 1 pixel at a time.
(15:13) - Run the project again. And it feels identical… but will be performing
(15:20) - far far less collision checks, which is good news.

[Horizontal Collisions]
(15:24) - This then is the perfect time to consider
(15:28) - the horizontal movement, and the resolving of their collisions too.
(15:33) - The scripts required are a simple transformation of the scripts that move us in the y direction.
(15:38) - I’ll temporarily move them over to the right so we can compare them as we code.
(15:42) - Set last value to the x position. Then change x by speed x / steps.
(16:00) - Then check for the collision again with an IF touching color. If we did collide, then
(16:05) - set x back to the last value, and finally set speed x to 0 to stop us moving any further
(16:13) - in that direction. Great, so we can return the y moving scripts,
(16:19) - but put them underneath the x moving scripts, careful to keep them within the repeat loop.
(16:25) - Finally, just scroll up and we can remove the old change x by speed x here as this is
(16:33) - now covered by our changes to the move in steps block!
(16:37) - Oh hold on, one more thing to consider. The move in steps block is only working out the
(16:42) - number of steps to move based on the speed y. Well, now we also have a speed x to consider.
(16:49) - This does complicate matters, but to make life easy, we can just add the two speeds
(16:54) - together. Just make sure to add the abs of speed x to the abs of speed y like so.
(17:02) - And it’s testing time again! I’ll literally dash over to this first
(17:06) - step… And celebration, we have contact! There’s
(17:09) - no passing through this one now. Everything is feeling really solid… which
(17:14) - is brilliant news… 

[Fix Jumping]
(17:16) - So where does that leave us? One last thing I’d like to just address before the next
(17:21) - episode is the jumping mechanic – At present I can still fly around by holding up – Let’s
(17:27) - limit that to a simple jump. For this I like to make use of a new variable,
(17:32) - named “falling”, for this sprite only. This wants to increase all the time we are
(17:37) - in the air… We can put a change falling by 1 at the top of the defione “move in
(17:43) - steps” script. Then, to reset it to 0 when we touch the ground,
(17:48) - set falling to 0 when we set speed y to 0 after a vertical collision.
(17:54) - If we run the project it’s easy to see this at work. Falling is 0 while we are sitting
(17:59) - on the ground, and then quickly starts counting up when we leave the ground.
(18:03) - This makes it easy to now limit our jumping to points of ground contact. Scroll to the
(18:08) - if up arrow pressed, and we can surround the set speed y with a IF, checking for a “falling”
(18:16) - value less than, say 3. Hmm, so why 3? Well, this trick let’s the player still jump 2
(18:26) - frames after they ran off the end of a platform. It’s often known as a coyote jump, and helps
(18:30) - to keep your game feeling less frustrating. Ok, how does that feel – Hm, pretty good.

[Stuck to ceiling bug]
(18:37) - I’m feeling much more grounded… 
(18:39) - Hey up, did you see that, Oh no! Right we still have one bug – I was able to stick
(18:44) - to the ceiling by holding the jump key. Luckily I’ve seen that many times before and know
(18:49) - exactly what it is. Find the “define move in steps” script,
(18:54) - and scroll down to the set falling to 0. Ok, so this collision triggers both when hitting
(18:59) - the ground, and ‘also’ when hitting the ceiling! We don’t want to say we’ve stopped
(19:04) - falling just because we’ve touched the ceiling, so place an IF around the set falling to 0.
(19:10) - Make sure to move it above the set speed y to 0, and then check whether speed y < 0.
(19:18) - That is we were travelling downwards when we collided. If this is the case, then this
(19:23) - was a floor collision, and we are ok to set falling to 0.
(19:27) - Run the project again… That’s it! We are solid and everything is
(19:31) - feeling just right, and no sticking here. 

[Mess around with the Physics]
(19:35) - We are all but done for episode 1, What I’d just like to do before we finish is make sure
(19:41) - you know how to customise the feel of the movement. Perhaps to make it feel a little
(19:45) - less floaty would be nice. Come right up to the top of the script. We
(19:50) - started everything with this GRAVITY variable. You know about this one, just change it to
(19:53) - a larger negative value, say negative 1.5 to cause the player to be pulled faster back
(19:58) - to the ground. This looks better, but of course, has the
(20:02) - effect that we can’t now jump as high as before.
(20:05) - Well, let’s add a new variable to adjust how high we jump. I’ll name it “JUMP FORCE”
(20:12) - for all sprites. Set it initially to 12. And I’ll drop it
(20:21) - in to the set speed y here where it was previously already set to 12. So no change there, but
(20:28) - what if I change it to 20? Give that a run and woo-hoo, now I can spring
(20:34) - really high into the air, that’s cool :D But… I’m pretty sure 12 is good for me
(20:40) - right now. That leaves us with how fast the player walks
(20:43) - and slows back down. Make a new variable “ACCELERATION” for
(20:48) - all sprites, and set it to 1.5, again up at the top of the project.
(20:56) - We can replace the right arrow change speed x with ACCELERATION right off. But, the move
(21:01) - left requires a negative change, so bring in a subtract block and we’ll change x by
(21:06) - 0 subtract ACCELERATION like so. That just leaves this 0.8 here, this slows
(21:13) - us down, so make a new variable named RESISTANCE, for all sprites, and put it right there.
(21:24) - Scroll to the top and set RESISTANCE to the same value, 0.8.
(21:31) - Good good good! – We can play around with these new variables to find values that make
(21:35) - our platformer behave and feel just the way we want, and this may change over time as
(21:40) - we continue to build up this exciting platforming engine.

[Outro]
(21:43) - There’s something really satisfying about
(21:45) - a functioning platforming engine that feels really solid. And it’s important that we
(21:50) - have this firm foundation to build upon, because we have great aspirations for where we are
(21:55) - going! Next episode we will open up our level map
(21:58) - to include multiple screens, and explore the benefits of sprite vs colour collisions, and
(22:04) - perhaps we’ll look at navigating up sloping inclines? But, there’s so many more exciting
(22:06) - things to come! I can’t wait to add wall jumps and moving platforms
(22:07) - But that is the it for this episode, If you’ve enjoyed watching please smash the like button.
(22:11) - Don’t forget to subscribe to ensure you don’t miss the next episode the moment it
(22:15) - comes out – If you want to support this channel further, then don’t forget you can
(22:19) - join the channel to become a channel member – There’s all sorts of awesome perks including
(22:23) - early access to videos, priority comments with custom emoji, and even access to the
(22:26) - scratch projects themselves. This channel wouldn’t be here without your support, so
(22:31) - thank you so much! So, until next time, have a great week ahead, and Scratch On guys!
