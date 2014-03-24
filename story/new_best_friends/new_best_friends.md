The following document is an overview of technologies which are becoming popular in Humanities research.
It talks about version control systems and graph databases primarily, and how they are used in Perseids, software currently being developed by programmers employed by the Perseus Project.

# Trees and Graphs, Trees and Graphs, Graphs and Trees, Graphs and Trees...
Two Technologies
	version control systems >> Trees
	graph databases			>> Graphs

# Version Control Systems
version control systems ~ source control systems ~ source control

code ~ source ~ source code >> Whatever you call it it's still text

They've been used by software developers for decades.
They track changes made to a collection of documents.
So we can answer questions like...

* Which document changed?
* Where was it changed?
* Who changed it?
* When did it change?
* Why did it change?

Version Control Systems don't just server this reporting functionality.
They allow us also to restore the state of documents to particular points in time.
And they also allow two or more people to independently work on the same document separately with no knowledge of what each is doing and then to later merge them into a single document.

# Born from necessity.
Writing complex software requires the collective efforts of lots of people over long periods of time.
Programmers aren't the most social of humans.
We have a derogatory term for non-computer mediated social reality, "meatspace".
That says a lot.
But paradoxically we have to closely coordinate our activity with one another.
If we don't, we won't successfully complete our projects... further our careers... fulfill our destinies... etc.

So, yes, we need other people.
We can't survive on coffee and computers alone.

# Big Dreams = Big Problems
If we have grand plans and adequate funding we can recruit lots of people to help our cause.
Lots of people mean lots of problems, people problems ( aka most problems ), which I'll sum up as follows...

* "Why doesn't this code compile anymore?  What did you morons do?"
* "Dave took credit for my idea!"
* "You saved over my work!"
* "What are you talking about?  I've been working like a dog!" * Goes back to reading reddit filth *
* "You're all dead weight.  I'm going to write my own version of this software and it's going to be amazing.  Who's coming with me?"

So a version control system properly implemented into your workflow can help alleviate interpersonal conflict.
It helps to track who contributes what.
It helps to reduce the consequences of making mistakes giving people the ability to take chances, follow instincts, and try new things.
It helps people take ideas into new directions.
It aids cooperation, because cooperation that requires less physical and emotional energy is good cooperation.
To use the most abused words of the last five years... it helps us innovate.

# Popularity Contest
The most popular version control system is Git, and it's also the best.
It has, in a very short period of time, less than ten years, been adopted by developers and now plays a central part of their development workflow.

Programmers almost universally love Git.
So now they're sharing that love by writing interfaces around Git, interfaces that make Git easier to use for people who do things besides build software.
One such interface is Perseids, which you can think of as a web interface for Git, with tools designed to make the jobs of philologists, linguists, and historians easier, orbiting around it.

# From Git to Perseids
Perseids is built on top of Sosol and Sosol is built on top of Git.
Sosol ( an acronym for Son of Suda OnLine ) is being developed by Ryan Bauman and Hugh Cayliss at Duke University for papyri.info.
The Perseids team collaborates with them.

Sosol Git with a web interface ( Ruby on Rails ) along with some code for interacting with common document formats used by Humanities researchers.

Perseids takes the core Sosol functionality and adds some extra tools to aid with Treebanking, image and text annotation, translation alignments, and image transcription.

# Strengths
Core functionality.
User management and document versioning is strong.

# Weaknesses
The interface is ugly.

Let's talk about another piece of technology.
# The "Semantic Web", "Web 3.0"
You've probably heard this phrase before.
Let me start by explaining how the World Wide Web works.
The Web is simply a massive collection of linked documents on Earth's largest computer network, the Internet.
Most of these documents are created "hot to order" by computer programs that look up information in a database and then spit out that information wrapped up in a language that explains to a web-browser how to display it in a way that is easy for human sensory systems, usually our visual system, to process.*
That language is actually three languages typically, HTML/XML, CSS, and Javascript/JSON.

The important thing to realize is the documents are linked and the databases that create them aren't.
Presentation is linked... content is not.
Why is this the case?
Well you can thank Larry Ellison, CEO of Oracle.
It's not entirely his fault really it's the fault of relational databases, the source of Larry's personal fortune, as a technology.

# Relational Databases
So the most common type of database out there in the wild is the relational database.
Relational databases store data in tables which are lists of columnar data.
If you've used a spreadsheet you've basically seen a relational database table... named columns and data in rows.
Each row in the table has a whole number identifying it.
That number is just the order in which a row is added to the table.
This number is the core technological problem, it is a pretty poor method of inventorying data.
And it makes it VERY hard to connect data between independent relational database systems.

# Graph Databases

	"Open Linked Data" = public graph database

Graph databases don't use tables with numbered rows.
Instead, every chunk of data gets a URL, essentially.
Smart folks realized that URLs work great at identifying individual files on a global computer network comprised of billions of devices, why not use them to inventory research data?

Now if all we did was assign URLs to data chunks we'd have data soup, right?
All the data would be floating around but we wouldn't know how our data is connected.
Documents on the Web get connected through links inside the document body.
Graph databases don't use links, they connect data using "triples".
Triples are simple.

They're simple declarative sentences.

	[subject] [predicate] [object]

Children create them when they're first learning to write or speak for that matter.

	[baby] [wants] [daddy]
	[dog] [licks] [baby]

Then children grow up, become more sophisticated, and learn more complex triples.

	[energy] [is equivalent to] [mass times the speed of light squared]

So it's important to realize that subject, predicate, and object all have URLs, so when they're reused in other triples they connect like data.
And that's the beauty of graph databases.
Connections between data aren't just decided by how data is arranged into preexisting tables and columns.
Connections are established by adding data.

# What can you do with a graph database?
So once you know one bit of data in a graph database you can explore the connections made to it.
Data is akin to eating a bowl of nachos. You pull out a piece or two and everything immediately connected comes with them, and you just select the particular connected bits you want and leave what you don't in the pile.

# Images
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

# Research
Gather
Categorize
Analyze / Synthesize
Publish

# Publication
Audiences:
	Colleagues
		- Knows context, will struggle to assimilate new knowledge. Why? $$$.
	Students
		- Doesn't know context, will struggle to assimilate new knowledge. Hope of $$.
	The Public
		- Doesn't know context, will NOT struggle to assimilate new knowledge. No hope of $.

What audience should we try to reach?

I don't believe that messages need to be dumbed-down to reach a general audience.
General audience's need context and guidance.
That takes an expert's time.
That takes a Ken Burns.