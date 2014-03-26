# Haml and cheese.
So recently I've begun working with a team of web-developers on a Rails based application.
It has been my first exposure to Rails and Ruby for that matter, so I'm coming to this project as a bit of an outsider.

## What is it?
For those who don't know Haml is a meta-HTML markup language.
It's creators see it as HTML shorthand.
Here's the intro paragraph of the Haml homepage.

"Haml (HTML abstraction markup language) is based on one primary principle: 
markup should be beautiful.
It’s not just beauty for beauty’s sake either;
Haml accelerates and simplifies template creation down to veritable haiku."

## HTML isn't beautiful.
So HTML and it's big-brother XML have problems.
They're tag based which means all of your content gets wrapped in opening and closing tag pairs.
If somebody isn't careful they can easily make a mess for themselves by carelessly omitting a closing tag.
Haml tries to remedy this situation by replacing tag-pairs with strictly enforced whitespace rules.

## See for yourself.
Take a look at the haml project's homepage http://haml.info/

You're back... Excellent.
So you noticed all of the references to haiku.
Kind of obnoxious right?
Well I think so.
Web page mark-up is not poetry and it never will be.
Mark-up holds content.
Poetry IS content.
Whenever a new technology is marketed to you by coopting a somewhat exotic centuries old creative art get your guard up.
Usually you're being fed a big ol' heaping spoon of marketing bullshit.

I understand what the people marketing Haml are trying to do, and they're not alone in this.
They're trying to convince you that their language is elegant,
and it will increase your expressive power.
With just a small smattering of expertly sequenced letters you will build templates, which used to take you hours, in only a few minutes.
But sorry to say... nah... that's probably not going to happen.

Not to get too side-tracked but I have to get this off of my chest... web-developers, I'm talking to you... the majority of our work is the digital equivalent of setting-type and making sure the printing presses are running smoothly.
We aren't Lao-Tzu meditating on how to live harmoniously with the rest of the universe.
Take pride in your work, certainly, but learn some humility.
Your career will thank you, and I'll thank you because I won't have the tools of my trade sold to me by incessantly stroking my ego.
I want practical tools not "creative feel-goodery".

## Marketing bullshit aside...
Here's why Haml is ridiculous fundamentally.
Web browsers render HTML.
They don't render HAML.

The time you save typing is negligible when you realize developers don't spend the majority of their time typing.
The majority of our time is spent asking this question, 
"Why is the computer doing this?"

A front-end developer/designer's primary question is a bit more specific, "Why is the browser rendering this page like this?"
Answering that question becomes much more complex with Haml.
Why? 
Because Haml has to be turned into HTML before it can be rendered by a browser.
Does that translation go smoothly?
Sometimes...
But what happens when it doesn't?

Well this happens.
The developer looks at the page and its source in his browser, then he looks at the template in his text-editor and tries to figure out where things have gone wrong.

Ever find yourself in a doctor's waiting room and you pick up a Hi-Lites magazine?
I know they're for children I don't care.
Well they have these pages where two drawings are shown side-by-side and it's your job to figure out what's "wrong" in one of them.
You find the man with the mustache and the fish missing a fin and you feel good that you have such finely honed observational powers.

Well that's not that different than troubleshooting template bugs.
Instead of two cartoon images, you're visually comparing two texts.

## HAML is a solution looking for a problem
I want to see HAML abandoned.  It's 

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
Gather
Categorize
Analyze / Synthesize
Publish

## Publication
* Audiences:
	* Colleagues
		* Knows context, will struggle to assimilate new knowledge. 
		* Why? $$$.
	* Students
		* Doesn't know context, will struggle to assimilate new knowledge.
		* Why? Hope of $$.
	* The Public
		* Doesn't know context, will NOT struggle to assimilate new knowledge.
		* Why? No hope of $.

What audience are we trying to reach?
I don't believe that messages need to be dumbed-down to reach a general audience.
General audience's need context and guidance.
That takes an expert's time.
That takes a Ken Burns.





