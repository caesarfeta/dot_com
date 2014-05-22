# Haml and cheese.
So recently I've begun working with a team of web-developers on an application built on Rails.  It's been my first exposure to Rails and Haml.

For those who don't know Haml is a meta-HTML markup language.
It's creators see it as HTML shorthand.
Here's the intro paragraph of the Haml homepage.

"Haml (HTML abstraction markup language) is based on one primary principle: 
markup should be beautiful.
It’s not just beauty for beauty’s sake either;
Haml accelerates and simplifies template creation down to veritable haiku."

So you noticed all of the references to haiku.
Kind of obnoxious right?
Well I think so.
Web page mark-up is not poetry and it never will be.
Mark-up describes content structure.
Poetry IS content.
Whenever a new technology is marketed to you by coopting a somewhat exotic centuries old artform get your guard up.
Usually you're being fed a big ol' heaping spoon of marketing bullshit.

I have to get this off of my chest, web-developers, the majority of our work is the digital equivalent of setting-type and making sure the printing presses are running smoothly.
We aren't Lao-Tzu meditating on how to live harmoniously with the rest of the universe.
Take pride in your work, certainly, but learn some humility please.  Just because some guys got to the game early and made a lot of money doesn't mean we're intellectual gods
I want practical, reliable tools.  Sell me on your code with numbers, units, and realistic examples.
Your career will thank you, and I'll thank you because I won't have the tools of my trade sold to me by appealing to my inner failed artist.


## Marketing bullshit aside...
Here's why Haml is ridiculous fundamentally.
Web browsers render HTML.
They don't render HAML.

The time it will save you typing is negligible once you realize developers don't spend the majority of their time typing.
The majority of our time is spent asking this question, 
"Why is the computer doing this?"

A front-end web developer's primary question is a bit more specific, "Why is the browser making my code look this way?"
Answering that question becomes much more complex with Haml.
Why? 
Because Haml has to be turned into HTML before it can be rendered by a browser.
Does that translation go smoothly?
Sometimes...
But what happens when it doesn't?

Well this happens.
The developer looks at the page and its source in his browser, then he looks at the template in his text-editor and tries to figure out where things have gone wrong.  The more layers of abstraction you add the harder that process becomes.


## HTML isn't beautiful.
So HTML and it's big-brother XML have problems.
They're tag based which means all of your content gets wrapped in opening and closing tag pairs.
If somebody isn't careful they can easily make a mess for themselves by carelessly omitting a tag.
Haml tries to remedy this situation by replacing tag-pairs with strictly enforced whitespace rules. This has precendence, Ruby and Python, for example. The problem with whitespace determining structure is mark-up languages and scripting languages serve very different purposes and are used by different people.

HTML, unfortunately, has a very complex relationship with two other languages, CSS and Javascript.  It's so complex that the lines between these languages frequently blur.  Good developers are like a TV dinner tray and know how to keep each in its proper container but 

## HTML is here to stay.
Until there is an alternative mark-up language rendered by the majority of web-browsers we have to live with HTML.
And since we have to live with HTML people have to learn how to use it responsibly.
Trying to abstract it away adds complexity to the whole process.
You've saved a few seconds in typing but you've added minutes if not hours in troubleshooting.





# Battle Asteroids
All dances and martial-arts can be understood as a sequence of well-rehearsed movements.
To become accomplished one has to repeat these movements thousands of times until they become automatic.
The purpose of Battle Asteroids is to document the world's martial-arts movements in a universally understood visual cartoon language.

## Scenes
Scenes with cartoon characters in martial-arts poses are drawn.
Each scene is an 'asteroid', which in our case is a free floating island composed of fantasy vegetation and architecture which frame or contextualize the martial-art action.
Ideally each asteroid has a theme.
By theme I mean a focus on a particular movement, a useful mental-state, or a well-defined visual aesthetic.

## Character Classes
Characters must belong to a character class.
Great care must be made to design classes that...

1. Are differentiated from all other classes.
2. Are representative enough of the human form to be posed.
3. Just large enough to express individual emotion.

Here's a list of classes.

## Physics
Physics is important.
The characters and environments must respond to forces ( gravity, strikes, environment ) in a way that is caricatured and amusing but still rooted in physical reality.
Effort must be made to show how these forces are coped with by each character.
One way to accomplish this is with tension and compression markers.

[ Sample image here ]

## Animation and subregion dispaly
Scenes are stitched together into one master image.
This master image I'll refer to as 'the poster'.
imgspect is used to select subregions of the poster, sequence them, and caption them.
imgbit is used to display subregions in the desired sequence.

This duo allows for sequences that are animations or Ken Burns pan and scan style slideshows.

[ Sample animation ]
[ Sample slideshow ]

## Color Use
Images should be readable as black and white line drawings.

[ Sample ]

## How to contribute
Read this document in full.
Explore the poster. 
Draw a scene of your own. 
Submit the image.
Our review board will see if it fits our standard of quality and if it does it will be stitched into the existing image at an aesthetically appealing and or logical position.

## Delusions of Grandeur
Hopefully it one day becomes the suprememe visual documention of our world martial-arts heritage.
An image that is joyful, playful, and above all useful to the study of martial-arts.
It's an exploration of time and space as well.
I hope to have subregions printed on wallpaper and stuck to the walls of dojos and practice spaces around the world.





# Image Area / Define Particle Systems / OCR
Big image.
Areas contain like symbols.
Areas are defined creating boundaries like nations on a map.
Objects contained within those boundaries can be animated.
Depending on their shape they become.
	particles in system
	particle, wave/line/curve pairs.
Predefined functions can be written.
Parameters can be set.





# What is Perseids?
One such interface is Perseids, which you can think of as a web interface for Git, with tools designed to make the jobs of philologists, linguists, and historians easier, orbiting around it.

# From Git to Perseids
Perseids is built on top of Sosol and Sosol is built on top of Git.
Sosol ( an acronym for Son of Suda OnLine ) is being developed by Ryan Bauman and Hugh Cayliss at Duke University for papyri.info.
The Perseids team collaborates with them.

Sosol is Git with a web interface ( Ruby on Rails ) along with some code for interacting with common document formats used by Humanities researchers.

Perseids takes the core Sosol functionality and adds some extra tools to for Treebanking, image and text annotation, translation alignments, and image transcription.

## Strengths
Core functionality.
User management and document versioning is strong.
Interoperability with other tools and services.
	Alpheios Treebanking Editor

## Weaknesses
The interface is ugly and sometimes hard to use, but we're working on it.

* Perseids
	* <a href="http://sosol.perseids.org/sosol/">http://sosol.perseids.org/sosol</a>
* Perseids/Sosol source code
	* <a href="https://github.com/sosol/sosol">https://github.com/sosol/sosol</a>
* Imgspect/Imgbit source code
	* <a href="https://github.com/PerseusDL/imgspect">https://github.com/PerseusDL/imgspect</a>

# Plans for the future.
These are my personal plans for Perseids.

1. Improve the existing interface.
2. Create first class tools for...
	 * building image collections.
	 * searching image collections.
	 * transcription and annotation of images.
	 
It talks about version control systems and graph databases primarily, and how they are used in Perseids, software currently being developed by programmers employed by the Perseus Project.





# Research involving images BIG PICTURE
## EXIF - Exchangeable image file format
JEIDA Japan Electronic Industries Development Association developed the Exif standard in 1998
Digital Cameras are storing metadata.

* author
* time
* location
* camera settings
	* make and model
	* aperture
	* shutter speed
	* focal length
	* iso speed
	* metering mode

So basically time, location and technology used in creating the image are now being stored by any image capturing device with GPS attached, which given the popularity of "smart phones" is most image capturing devices.

Which is basically the information museums and archivists gather about images in their collection.

* author
* time
* location
* medium / materials / technology employed





# Research Fundamentals
Collect
Analyze
Categorize
Synthesize
Publish

## Publication
## Who are you talking to?
* Audiences:
	* Colleagues
		* Knows context, will struggle to assimilate new knowledge. 
		* Why? $$$ or ;D for doing so.
		* Do the work to make it accurate.
	* Students
		* Doesn't know context, will struggle to assimilate new knowledge.
		* Why? Hope of $$ or ;) for doing so.
		* Do the work to make it accessible.
	* The Public
		* Doesn't know context, will NOT struggle to assimilate new knowledge.
		* Why? No hope of $ or :) for doing so.
		* Do the work to make it entertaining.

What audience are we trying to reach?
I don't believe that messages need to be dumbed-down to reach a general audience.
They just need context, guidance, and a sense of wonder.
That takes a charismatic content expert.
That takes a Carl Sagan or a Neil Degrasse Tyson, a scientific media-whore, and I mean that lovingly and with respect.





# Software Engineering Wisdom
Put the puzzle pieces together.
One big jigsaw puzzle.
Put the edges together first, because those pieces are the most visible.
APIs must be well defined and documented.

First thing you should ask yourself is what's the easiest way for people to use this.
Occham's razor... always.

When naming things think context.
Keep names short and relevant and context specific.
You know many Johns.
That doesn't mean John is a terrible name and needs to be lengthened to John-From-The-South-Side-Of-Chicago.
You know which John based on context.
This is true for your code.

Human or machine?  Human or machine?
Your audience is both. 

Don't abuse "else if" and "else".
If you are nesting lots of elses know that you could be creating a maintenance nightmare for yourself.
Sure the logic makes sense now when the problem is fresh in your head, but will it make sense weeks from now?





# Practice
Practice slowly and thoughtfully.
Always building on what you already know.
This is how you get better at things.





# Jokes
It is unwise to half-ass a project just so you can start another project, which you will also half-ass.  
Be patient and use all of your ass.

Civilians. Stop using the word "taskforce".
We already have the word committee.
Discussing dress-code policy is not the same as invading an enemy base.

Why do you hate rich old white guys who run the world solely for their own benefit?  They're people too you know.  Learn some empathy.

Who likes men's sneakers more... young black guys... or cats in heat?  You decide.

Russian dressing is just French dressing with extra mayonnaise and corruption.

Commute to compute!  The battle cry of a generation.

Some people swim for their health. Others for fun. Me? I swim for the used band-aids.

You know you're old when going to a dance club and watching a nature documentary feel like the same activity.

I like algebra because you can think about y's and x's without the painful memories.

A dog is not a human child and should not be dressed like one.





# Victimhood
Welcome to the victimhood, neighbor!  I'd invite you over to my house but it's a mess.  Why is it a mess?  The government.
Welcome to the victimhood, neighbor!  I'd invite you over to my house but it's a mess.  Why is it a mess?  Big business.
Welcome to the victimhood, neighbor!  I'd invite you over to my house but it's a mess.  Why is it a mess?  Men.
Welcome to the victimhood, neighbor!  I'd invite you over to my house but it's a mess.  Why is it a mess?  Gold-digging women.
Yeah it's kind of ridiculous how people will blame everybody else but themselves.
Ehhhh I'm guilty of this.

Seeing yourself as the hapless victim of invisible social forces can make you seem like an insufferable asshole to people who don't share your situation.
Maybe they're right.
Maybe you're right.
It doesn't matter.
So when explaining your position it's best to stay detached and unemotional.
Unshared feelings will only drive people away from your message.





# Periodic Table of Elements
6			-- Atomic Number # equal to the number of protons in nucleus
C			-- Symbol
Carbon		-- Name
12.011		-- Atomic Mass  Weighted average of the masses of all the element's isotopes.

Element -- Stores the information above
Cell	-- Displays the information
Grid	-- WxH Grid
View	-- Arrangement of grids
Canvas	-- XYZ