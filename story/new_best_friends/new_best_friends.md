The following document is an overview of technologies which are becoming popular as research tools in fields who's research focus in analyzing large amounts of text like what is done in many fields in the Humanities.

# The story of two data structures.
Trees & graphs.  Your research friends for life.

* version control systems -- Trees
* graph databases -- Graphs

# Quick definition of terms
version control systems = source control systems = source control
code = source = source code 
"Source code by another name will still smell like text."

# Version Control Systems
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

Programmers coined a term for non-computer mediated social reality, "meatspace".
That says a lot.
But paradoxically we have to closely coordinate our activity with one another.
If we don't, we won't successfully complete our projects... further our careers... fulfill our destinies... etc.

# Big Dreams = Big Problems
If we have grand plans and adequate funding we can recruit lots of people to help fulfill our software dreams.
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
It helps us... to use the most abused words of the last five years...  innovate.

# Popularity Contest
The most popular version control system is Git, and it's also the best.
It has, in a very short period of time, less than ten years, been adopted by developers and now plays a central part of their development workflow.

Programmers almost universally love Git.
So now they're sharing that love by writing interfaces around Git, interfaces that make Git easier to use for people who do things besides build software.

# The "Semantic-Web"
You've probably heard this buzzword before.
It's actual meaning has been buried under a bunch of techno-babble-edge-u-industry-marketing hype.
I'll unravel this one.

Let me start by explaining how the World Wide Web works.
The Web is simply a massive collection of linked documents on Earth's largest computer network, the Internet.
Most of these documents are created "hot to order" by computer programs that look up information in a database and then spit out that information wrapped up in a language that explains to a web-browser how to display it in a way that is easy for human sensory systems, usually our visual system, to process.*
That language is actually three languages typically, HTML/XML, CSS, and Javascript/JSON.

The important thing to realize is on the Web documents are linked and the databases that create them aren't.
Presentation is linked... content is not.
Why is this the case?
Well you can thank Larry Ellison, CEO of Oracle.
It's not entirely his fault.
Really it's the fault of relational databases as a technology.

# Relational Databases
So the most common type of database out there in the wild is the relational database.
Relational databases store data in tables, which are lists of columnar data.
If you've used a spreadsheet you've basically seen a relational database table... named columns and data in rows.
Each row in the table has a whole number identifying it.
That number is just the order in which a row is added to the table.
This number is the core technological problem.
Turns out this row-number-id system causes all kinds of problems.  Things like...

* Data integrity -- How accurately rows in tables are linked up.
* Scalability -- How well the database grows to accomodate new kinds of data
* Interoperability -- How well the database connects to other systems outside itself.

# Graph Databases.
"Open Linked Data" = public graph database
"Triplestore" = graph database
"RDF Database" = graph database
"Semantic Web" = all the public graph databases

Graph databases don't use tables with numbered rows.
Instead it treats data as if every chunk of data inside it was a document on the Web.
Smart folks realized that URLs work great at identifying trillions of individual files on a global computer network comprised of billions of devices, why not use them to inventory research data?

Now if all we did was assign URLs to data chunks we'd have data soup, right?
All the data would be floating around but we wouldn't know how our data is connected.
Documents on the Web get connected through links inside the document body.
Graph databases don't use hyperlinks.
Different graph database have different implementations of how connections between data are defined, the most common way is by using "triples".

# Triples are simple.
They're basically simple declarative sentences.

	[subject] [predicate] [object]

Below is an example SPARQL query.  Sparql is the language used to extract data from a graph database.  This particular query searches dbPedia, which is parts of Wikipedia turned into a public graph database, for images and taxonomic information of living organisms which contain a search string.

	PREFIX dbpedia2: <http://dbpedia.org/property/>
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>
	SELECT	?name, ?kingdom, ?phylum, 
			?class, ?order, ?family, 
			?genus, ?species, ?subspecies, 
			?img, ?abstract
	WHERE {
		?s	dbpedia2:regnum ?hasValue;
			rdfs:label ?name
			FILTER regex( ?name, "eagle", "i" )
			FILTER ( langMatches( lang( ?name ), "EN" ))
		?animal dbpedia2:name ?name;
			foaf:depiction ?img;
			dbpedia2:regnum ?kingdom
			OPTIONAL { ?animal dbpedia2:ordo ?order . }
			OPTIONAL { ?animal dbpedia2:phylum ?phylum . }
			OPTIONAL { ?animal dbpedia2:classis ?class . }
			OPTIONAL { ?animal dbpedia2:familia ?family . }
			OPTIONAL { ?animal dbpedia2:genus ?genus . }
			OPTIONAL { ?animal dbpedia2:species ?species . }
			OPTIONAL { ?animal dbpedia2:subspecies ?subspecies . }
			OPTIONAL {
				?animal <http://dbpedia.org/ontology/abstract> ?abstract
				FILTER ( langMatches( lang( ?abstract ), "EN" ))
			}
	}
	GROUP BY ?name
	LIMIT 500

# Structure
So it's important to realize that subject, predicate, and object all have URLs, so when they're reused in other triples they connect like data.
And that's the beauty of graph databases.
Connections between data aren't just decided by how data is arranged into preexisting tables and columns.
Connections are established simply by adding more data.

# What can you do with a graph database?
So once you know one bit of data in a graph database you can explore the connections made to it.
Data in a graph database are like a bowl of nachos. You pull out a chip or two and everything immediately connected comes with them, and you just select the particular connected bits you want and leave what you don't in the pile.

# See graph database in action.
dbPedia doesn't have the best uptime, but when it is up and running it works beautifully.
I'm not complaining.  I love me some dbPedia.

<a href="../code/specierch">Specierch</a>

On the other side of this link is an image search tool which is basically the SPARQL query you just saw with some code to display returned data in a visually pleasing form.

# Links
* Specierch Demo
	* <a href="../code/specierch">adamtavares.com/code/specierch</a>