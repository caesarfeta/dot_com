You're a researcher.
You have gathered lots of data. 
You want to store that data in a convenient place so it can be easily searched, analyzed, and repurposed by yourself, collaborators, and anonymous people the world over.
In other words you want to turn "data" into open-linked data.
The quicker you can start playing with this technology the quicker you'll learn its peculiarities.
So let's get started.

# Start Playing
There are many different graph database packages out there in the wild.
The one we'll be playing with is the Apache foundation's, Jena.
Jena is the database itself.
You interact with Jena through another bit of software, a server called Fuseki.
The two come packaged together.
The names sometimes get used interchangeably.

# Install Jena-Fuseki
I'm assuming you're using some flavor of Unix ( Linux or Mac OSX usually ) as your OS.

* <a href="http://jena.apache.org/download/index.cgi">Go to the downloads page</a>
* Click the binary distribution link "jena-fuseki-[version]-distribution.zip"
* If you know Unix the commands below should make some sense.  If it looks like gibberish find a friend to help.
 
		mkdir -p /usr/local/fuseki
		cp jena-fuseki-[version]-distribution.zip /usr/local/fuseki/
		unzip jena-fuseki-[version]-distribution.zip
		ln -s jena-fuseki-[version] fuseki
		cd fuseki
		chmod +x fuseki-server s-**
		fuseki-server --update --mem /ds &

You now have a fuseki-server running on port 3030.

Fuseki uses the HTTP protocol to communicate with the outside world just like a webserver,
which means you can connect to it through your webbrowser.

* <a href="http://localhost:3030/">http://localhost:3030/</a>

# Your playground
* Click 'Control Panel' link
* Click 'Select' button

So this page is where you can query the database and add new data.
This is your playground.

# Adding data
Right now your database is empty.
Let's add some data using SPARQL-Update syntax.
Copy the text below into the SPARQL Update field and click 'Perform update'

	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	INSERT DATA {
		<http://example/book1> dc:title    "A new book" ;
							   dc:creator  "A.N.Other" .
	}

So what's going on here?
Well we've added a unique identifier of a book **&lt;http://example/book1&gt;**.
This unique identifier is a URI, a Universal Resource Identifier.

We attached two bits of data to the book URI, title and creator.
The concept of "a title" and "a creator" have already been defined in another popular open-linked database 
so we can reuse them, **&lt;http://purl.org/dc/elements/1.1/title&gt;** **&lt;http://purl.org/dc/elements/1.1/creator&gt;**
Typing **&lt;http://purl.org/dc/elements/1.1/title&gt;** is cumbersome so we shortened it to dc:title.
We can only use these kinds of abbreviations if we explicitly declare what they are.
We do that at the very beginning with **PREFIX dc: &lt;http://purl.org/dc/elements/1.1/&gt;**

Tthe specific title and creator attached to this book are just text not URIs, "A new book" and "A.N.Other".
Because they are just text they can't be attached to anything else.
Sometimes that's okay.
Sometimes it isn't.
With experience you'll learn when using text or URIs is appropriate.

There are other nuances to SPARQL-Update syntax displayed here... like, 
"What is up with the semi-colon and period?",
I'll explain them later.
If you're a brave soul and like reading very dry documentation 
you can <a href="http://www.w3.org/Submission/SPARQL-Update/">read the document defining the syntax</a>.  
Note that this document is still in "Submission" phase. 
Graph databases are still a relatively new technology.

Let's add another book for fun before we move on.

	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	INSERT DATA {
		<http://example/book2> dc:title    "An old book" ;
							   dc:creator  "S.K.Eleton" .
	}

# Querying data
So now you have some data in your database!
Now let's get it out of there.
We do that with the SPARQL Query Language.
Copy the text below into the SPARQL Query field and click 'Get Results'

	SELECT ?s ?p ?o 
	WHERE {
		?s ?p ?o
	}

This query will return all data in your database.
Luckily our total dataset is very small, so it runs quickly.
You should get output that looks like this...

	--------------------------------------------------------------------------------------
	| s                      | p                                         | o             |
	======================================================================================
	| <http://example/book2> | <http://purl.org/dc/elements/1.1/creator> | "S.K.Eleton"  |
	| <http://example/book2> | <http://purl.org/dc/elements/1.1/title>   | "An old book" |
	| <http://example/book1> | <http://purl.org/dc/elements/1.1/creator> | "A.N.Other"   |
	| <http://example/book1> | <http://purl.org/dc/elements/1.1/title>   | "A new book"  |
	--------------------------------------------------------------------------------------

Queries can use PREFIX just like update statements so you could issue a query like this one:

	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	SELECT ?s ?p ?o 
	WHERE {
		?s ?p ?o
	}

The output changes as you'd expect.

	-------------------------------------------------------
	| s                      | p          | o             |
	=======================================================
	| <http://example/book2> | dc:creator | "S.K.Eleton"  |
	| <http://example/book2> | dc:title   | "An old book" |
	| <http://example/book1> | dc:creator | "A.N.Other"   |
	| <http://example/book1> | dc:title   | "A new book"  |
	-------------------------------------------------------


So how does the query work?
Data relationships in graph databases are defined by triples.
Triples are basically declarative sentences with one subject, one predicate, and one object.

You specify what bits of data you want to extract with this line.

	SELECT ?s ?p ?o 

If you only wanted the predicate and the object of a triple, because say you know exactly which book you want.
You could run a query without **?s** like this one.

	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	SELECT ?p ?o 
	WHERE {
		<http://example/book1> ?p ?o
	}

Here's the output of that query

	-----------------------------
	| p          | o            |
	=============================
	| dc:creator | "A.N.Other"  |
	| dc:title   | "A new book" |
	-----------------------------

Now what if you only wanted the title of all books?
You could run this query...

	PREFIX dc: <http://purl.org/dc/elements/1.1/>
	SELECT ?s ?o 
	WHERE {
		?s dc:title ?o
	}

...and get these results.

	------------------------------------------
	| s                      | o             |
	==========================================
	| <http://example/book2> | "An old book" |
	| <http://example/book1> | "A new book"  |
	------------------------------------------

If you're a legendary hero amongst mediocrities or a masochist ( depends on how you look at it ) you can <a href="http://www.w3.org/TR/sparql11-query/">read the document defining the query syntax</a>.

# If you want to delete ALL your test data
Copy the text below into the SPARQL Update field and click 'Perform update'

	DELETE WHERE { ?s ?p ?o }

# 'Conceptual map' aka 'categorical structure' aka 'ontology'
Now begins the fun part.
Modelling YOUR data.

Maybe you have a lot of data already,
maybe you have a small sample of representative data, 
maybe you just have an idea of the kinds of data you'll be gathering.
In any case, building a conceptual map of your data will help you turn your data into the form required by graph databases.
It is through this process that we define the databases categorical structure, aka its ontology.

Developing an ontology is as much art as it is science.
So I'm going to develop an ontology and document the most important parts of my process to guide you along.

I'm interested in building a system for inventorying images and their metadata 
so that's the kind of database ontology I'll be developing.

# List
What sorts of data am I going to store?
I'll list them to start.

* URL to the image
* photograph or graphic?
* name
* caption
* width
* height
* dpi
* mime-type ( file type: jpeg, png, gif, etc... )
* date created
* time of day
* latitude
* longitude
* size
* model of camera used
* shutter speed
* aperture size
* digital or film?
* collections of images it belongs to
* person who made image
* what's depicted in the image?

I now have something to work with.
My next step is to start grouping like elements together and notating the type of data of each element.
I'll add items along the way if I realize I forgot something.

int = integer
float = floating point number = real number

* image
	* ids
		* URL to the image ( text )
		* name ( text )
	* storage
		* mime-type ( text )
		* size in megabytes ( float )
	* interpretation
		* photograph or graphic? ( text )
		* what's depicted in the image? ( text )
		* caption ( text )
	* resolution
		* width in pixels ( int )
		* height in pixel ( int )
		* dpi ( dots per inch ) ( int )
	* time
		* date created ( date )
		* time of day taken ( time )
	* location
		* latitude ( float )
		* longitude ( float )
	* technology
		* model of camera used ( text )
		* shutter speed ( float )
		* aperture size ( float )
		* exposure time ( float )
		* digital or film? ( text )
	* user
		* username ( text )
	* permssions
		* copyright ( text )
	* grouping
		* collections of images it belongs to ( text )


# Notation
The best notation system I know of for mapping relationships in an ontology is the good ol' ball and stick system.
Think of your data as a one massive molecule with the ball 