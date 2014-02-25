# How to play with DBPedia
You can use SNORQL, pronounced "snorkel", to run SPARQL, pronounced "sparkel", queries against DBPedia.
It's easy.  You can do it even when high on Nyquil or when you're annoyed by Steve Urkel.
http://dbpedia.org/snorql

So a good way to begin your exploration of DBPedia is to find a Wikipedia page you're interested in.
I'm interested in insects especially social insects, so I'll start with my favorite social insect of all, the honey bee.

	http://en.wikipedia.org/wiki/Honey_bee

I'm just going to see what connections with Honey_bee exist.

	SELECT ?p ?o 
	WHERE {
	  :Honey_bee ?p ?o
	}

Now I have my foot in the door.  A line in the output catches my eye.

	dbpedia2:genus [http]	"Apis"@en

Let's find all the species that share the honey bees genus, Apis.

	SELECT ?s
	WHERE {
		?s dbpedia2:genus "Apis"@en
	}

-- You can't just search for "Apis".  Here's why... [ TODO ]

Here they are.

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

I'm thinking it would be really cool if I could query DBPedia and get URLs to images of all the species in the Apis genus.

I can do that with this query.

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

Now there's nothing special about SNORQL really.
You can issue SPARQL queries through any HTTP client.
So what I'd like to do now is issue these queries through Javascript.
I'll use jQuery to make things a bit simpler.

	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript">
		var url = http://dbpedia.org/sparql/query
		var query = "
		SELECT ?s ?o\
		WHERE {\
			?s dbpedia2:genus "Apis"@en;\
				foaf:depiction ?o\
		}";
		var queryUrl = url + "/query=" + encodeUri(query);
		
		$.ajax({
			dataType: "jsonp",  
			url: queryUrl,
			success: function( _data ) {
				console.log( _data )
			}
		});
	</script>
	
