I don't know if you've heard of DBPedia.
Well it's Wikipedia turned into a graph database.

You may be wondering, "What's a graph database and how are they different from your typical database?"
Very briefly, your typical database is a relational database.
They are collections of tables, which are lists of similar data organized into columns and rows and connected to one another by unique numbers called keys.

A graph database forgoes using tables.
It's a big heap of data, where every individual chunk of data has a universally unique identifier, and connections are made between individual data chunks.

I'm oversimplifying... greatly... but that's the basic difference.
And it's a difference so basic that graph databases can't be queried with the same language that relational databases are.
Most graph databases use a language called SPARQL, pronounced "sparkel".

So let me show you how to explore DBPedia with SPARQL.

## Let's write some SPARQL!

You can use <a href="http://dbpedia.org/snorql">SNORQL</a>, pronounced "snorkel", to run DBPedia SPARQL queries.
It's easy.
You can do it even when high on Nyquil.

So a good way to begin your exploration of DBPedia is to find a Wikipedia page you're interested in.
I'm interested in insects, especially social insects, so I'll start with my favorite social insect of all, the honey bee.

<pre>
http://en.wikipedia.org/wiki/Honey_bee
</pre>

I'm just going to see what connections with Honey_bee exist.
So I'll just run this query in SNORQL.

	SELECT ?p ?o 
	WHERE {
	  :Honey_bee ?p ?o
	}

The query returns quite a bit of data.
Now I have my foot in DBPedia's door...

While browsing the data a line in the output catches my eye.

	dbpedia2:genus [http]	"Apis"@en

So I'm guessing that plant and animal Wikipedia pages are going to include data about their genus.
I can play with that...
So let's find all the species that have Wikipedia pages that share the honey bee's genus, Apis.


	SELECT ?s
	WHERE {
		?s dbpedia2:genus "Apis"@en
	}

Here they are...

	:Apis_nigrocincta [http]
	:Carniolan_honey_bee [http]
	:European_dark_bee [http]
	:Apis_cerana_nuluensis [http]
	:Apis_mellifera_capensis [http]
	:Buckfast_bee [http]
	:Caucasian_honey_bee [http]
	:African_bee [http]
	:Apis_florea [http]
	:Italian_bee [http]
	:Maltese_honey_bee [http]
	:Honey_bee [http]
	:Apis_cerana [http]
	:Apis_cerana_indica [http]
	:Apis_koschevnikovi [http]
	:Apis_nearctica [http]
	:Western_honey_bee [http]
	:Apis_cerana_japonica [http]
	:Apis_mellifera_iberiensis [http]
	:Apis_mellifera_intermissa [http]
	:Apis_mellifera_lamarckii [http]
	:Apis_mellifera_macedonica [http]
	:Africanized_bee [http]
	:Apis_andreniformis [http]
	:Apis_dorsata [http]
	:Apis_dorsata_laboriosa [http]
	:Apis_mellifera_cecropia [http]

Returning to my original Honey_bee query results I find this interesting item.

	foaf:depiction [http]	<http://upload.wikimedia.org/wikipedia/commons/9/99/Apis_mellifera_flying.jpg>

That my friends is a link to an image.
I love images!
I want more of them!

I'm thinking it would be really cool if I could query DBPedia and get URLs to images of all the species in the Apis genus, which I can do with this query.

	SELECT ?s ?o
	WHERE {
		?s dbpedia2:genus "Apis"@en;
			foaf:depiction ?o
	}

Which gives me this list.

	:Apis_nigrocincta [http]	<http://upload.wikimedia.org/wikipedia/commons/f/f0/Apis_nigrocincta_distribution_map.svg> [http]
	:Carniolan_honey_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/a/a1/Apis_mellifera_carnica_worker_hive_entrance_3.jpg> [http]
	:European_dark_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/0/0d/Bee_October_2007-1.jpg> [http]
	:Apis_cerana_nuluensis [http]	<http://upload.wikimedia.org/wikipedia/commons/9/99/Borneo_blank_map.PNG> [http]
	:Apis_mellifera_capensis [http]	<http://upload.wikimedia.org/wikipedia/commons/0/0a/Cape_Honeybee_gorging.jpg> [http]
	:Buckfast_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/1/1e/Buckfast_bee.jpg> [http]
	:African_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/d/d0/Apis_mellifera_scutellata.jpg> [http]
	:Apis_florea [http]	<http://upload.wikimedia.org/wikipedia/commons/7/73/Apis_florea_worker_1.jpg> [http]
	:Italian_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/c/cd/Honeybee-27527-1.jpg> [http]
	:Maltese_honey_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/9/99/Maltese_honey_bee.JPG> [http]
	:Honey_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/9/99/Apis_mellifera_flying.jpg> [http]
	:Apis_cerana [http]	<http://upload.wikimedia.org/wikipedia/commons/e/ec/Cerana.jpg> [http]
	:Apis_cerana_indica [http]	<http://upload.wikimedia.org/wikipedia/commons/b/b6/Apiscerana.jpg> [http]
	:Apis_koschevnikovi [http]	<http://upload.wikimedia.org/wikipedia/commons/0/0f/Apis_koschevnikovi_distribution_map.svg> [http]
	:Western_honey_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/d/d9/Apis_mellifera_Tanzania.jpg> [http]
	:Apis_cerana_japonica [http]	<http://upload.wikimedia.org/wikipedia/commons/3/31/Vespa_simillima_xanthoptera01.jpg> [http]
	:Africanized_bee [http]	<http://upload.wikimedia.org/wikipedia/commons/a/a1/Africanizedbee.jpg> [http]
	:Apis_andreniformis [http]	<http://upload.wikimedia.org/wikipedia/commons/a/ae/Apis_andreniformis_distribution_map.svg> [http]
	:Apis_dorsata [http]	<http://upload.wikimedia.org/wikipedia/commons/4/4d/ApisDorsataHive.jpg> [http]
	:Apis_dorsata_laboriosa [http]	<http://upload.wikimedia.org/wikipedia/commons/7/76/ApisLaboriosa1.jpg>

I bet there are a few beautiful photographs on the other end of those links.  Let's have a look at them, eh?  To do that we have to...

## Write some Javascript!

Well it doesn't really have to be Javascript it could be almost any language.
We'll just use Javascript because the barrier of entry is so low.
Anybody who's reading this page has a Javascript interpreter, their web-browser.

Now there's nothing special about SNORQL.
It's just a textarea that takes your SPARQL query, connects to what's called a SPARQL endpoint, runs the query, and spits out the results.

Here's a fun fact:  you can connect to a SPARQL endpoint and issue SPARQL queries through any HTTP client.
So what I'd like to do now is issue a query with Javascript and do something fun with the results.
I'll use jQuery to make things a bit simpler.

Copy the code below into an HTML file and run it and see what happens!
Or you could just click <a href="example.html">this</a>...

<pre class="javascript">
&lt;html&gt;
&lt;head&gt;
&lt;script src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js&quot;&gt;&lt;/script&gt;
&lt;style type=&quot;text/css&quot;&gt;
img { 
	width: 100%;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;&lt;/body&gt;
&lt;script type=&quot;text/javascript&quot;&gt;
	var url = &quot;http://dbpedia.org/sparql&quot;;
	var query = &quot;\
	PREFIX dbpedia2: &lt;http://dbpedia.org/property/&gt;\
	PREFIX foaf: &lt;http://xmlns.com/foaf/0.1/&gt;\
	SELECT ?o\
	WHERE {\
		?s dbpedia2:genus \&quot;Apis\&quot;@en;\
			foaf:depiction ?o\
	}&quot;;
	var queryUrl = encodeURI( url+&quot;?query=&quot;+query+&quot;&amp;format=json&quot; );
	$.ajax({
		dataType: &quot;jsonp&quot;,  
		url: queryUrl,
		success: function( _data ) {
			var results = _data.results.bindings;
			for ( var i in results ) {
				var src = results[i].o.value;
				$( &#x27;body&#x27; ).append( &#x27;&lt;img src=&quot;&#x27;+src+&#x27;&quot;/&gt;&#x27; );
			}
		}
	});
&lt;/script&gt;
&lt;/html&gt;
</pre>

That's a lot of bees! And a couple of maps too! And a broken link!
If you want to see a lot of images of skulls replace "Apis" with "Homo".

## Next Steps...
With a little bit of work I could flesh this out and build a general purpose genus image search web app.
I'm thinking it'll have an input box to accept a species name.
In the output I can display some relevant textual data so users know a bit more about what they're looking at.

Yes I decided I'm going to build it!
Check back soon and see it.
Hope you had fun and you learned something.

PS. I'm fairly confident that graph databases will be replacing relational ones for many applications.
Get on the bandwagon or become irrelevant.
You gotta keep up!

SPARQL on, you crazy diamonds.