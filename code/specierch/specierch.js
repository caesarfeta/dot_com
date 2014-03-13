//------------------------------------------------------------
//	SETUP
//------------------------------------------------------------
//------------------------------------------------------------
//	Build the search box
//------------------------------------------------------------
var html = '\
<div id="specierch">\
	<div id="search">\
		<input id="input" type="text" placeholder="Organism Name">\
	</div>\
	<div id="imgShell"><div id="imgBox"></div></div>\
	<div id="options">\
		<a id="aboutClick" class="bigger" href="about">?</a>\
	</div>\
	<div class="popup" id="about">\
		<p><a href="../../story/dbpedia">&lt; Learn more about how Specierch works. &gt;</a></p>\
	</div>\
	<div class="popup" id="error">\
		<p>Sorry... DbPedia must be down.</p>\
		<p>Please check back later!</p>\
	</div>\
	<div class="popup" id="hint">\
		<h2>Welcome to Specierch.</h2>\
		<p>Specierch is an image search tool designed specifically for finding photographs of living organisms catalogued in <a href="http://dbpedia.org/About">DbPedia</a>.</p>\
		<p>\
			Type a search word into the input field at the bottom of the screen, press Enter,\
			and wait for the images and text info to come streaming in.\
		</p>\
		<p>\
			Specierch will return a maximum of 25 photographs per search,\
			so if you can\'t find what you\'re looking for the first time, try again with a more specific search word.\
		</p>\
		<p>\
			Here\'s some example search words to get you started:</br>\
			<span class="bigger">beest, bee, shroom, cactus, lemon, pine</span>\
		</p>\
	</div>\
	<div class="popup" id="wait">\
		<p><img src="../../img/loader.gif" /></p>\
		<p>I am searching.</p>\
		<p>DbPedia can be slow sometimes.</p>\
		<p>Thank you for waiting.</p>\
	</div>\
</div>';
$( 'body' ).append( html );
//------------------------------------------------------------
//	search
//------------------------------------------------------------
$( '#search' ).css({
	'margin-left': $( '#search' ).outerWidth()/2 * -1
});
centerId( 'wait' );
centerId( 'hint' );
centerId( 'about' );
centerId( 'error' );
hideError();
hideWait();
hideAbout();
$( '#aboutClick' ).on( 'touchstart click', function( _e ) {
	_e.preventDefault();
	hideWait();
	hideHint();
	( $('#about').is(':visible') ) ? hideAbout() : showAbout();
})
//------------------------------------------------------------
//	imgBox
//------------------------------------------------------------
$('#input').bind( "enter", function( _e ){
   nameSearch( $('#input').val() );
   hideHint();
   showWait();
});
$( '#input' ).keyup( function( _e ){
	if ( _e.keyCode == 13 ) {
		$( this ).trigger( "enter" );
	}
});
$( window ).resize( function( _e ) {
	imgShellSize();
});
//------------------------------------------------------------
//	ACTION
//------------------------------------------------------------
function centerId( _id ) {
	$( '#'+_id ).css({
		'margin-left': $( '#'+_id ).outerWidth()/2 * -1,
		'margin-top': $( '#'+_id ).outerHeight()/2 * -1,
	});
}
function nameSearch( _input ) {
	specierch( _input, '#imgBox' );
}
//------------------------------------------------------------
//  Show and hides... this is kind of stupid but ehhhh.
//------------------------------------------------------------
function hideWait() {
	$( '#wait' ).hide();
}
function showWait() {
	$('#wait').show();
}
function hideHint() {
	$( '#hint' ).hide();
}
function showHint() {
	$('#hint').show();
}
function hideAbout() {
	$( '#about' ).hide();
}
function showAbout() {
	$('#about').show();
}
function hideError() {
	$( '#error' ).hide();
}
function showError() {
	$('#error').show();
}
//------------------------------------------------------------
//  Resize the img container to fit the window
//------------------------------------------------------------
function imgShellSize() {
	$('#imgShell').width( $(window).width() );
	$('#imgShell').height( $(window).height() );
}
//------------------------------------------------------------
//  Mark the search
//------------------------------------------------------------
function markSearch( _name ) {
	$( '#imgBox' ).append( '<div class="search_mark"><span class="faded">\'</span>' + _name + '<span class="faded">\'</span></div>' );
}
//------------------------------------------------------------
//  The heart of the search... query dbpedia...
//------------------------------------------------------------
function specierch( _search, _output ) {
	var url = "http://dbpedia.org/sparql";
	var query = '\
		PREFIX dbpedia2: <http://dbpedia.org/property/>\
		PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
		SELECT	?name, ?kingdom, ?phylum, ?class, ?order, ?family, ?genus, ?species, ?subspecies, ?img, ?abstract\
		WHERE {\
			?s	dbpedia2:regnum ?hasValue;\
				rdfs:label ?name\
				FILTER regex( ?name, "' + _search + '", "i" )\
				FILTER ( langMatches( lang( ?name ), "EN" ))\
			?animal dbpedia2:name ?name;\
				foaf:depiction ?img\
			OPTIONAL { ?animal dbpedia2:regnum ?kingdom . }\
			OPTIONAL { ?animal dbpedia2:ordo ?order . }\
			OPTIONAL { ?animal dbpedia2:phylum ?phylum . }\
			OPTIONAL { ?animal dbpedia2:classis ?class . }\
			OPTIONAL { ?animal dbpedia2:familia ?family . }\
			OPTIONAL { ?animal dbpedia2:genus ?genus . }\
			OPTIONAL { ?animal dbpedia2:species ?species . }\
			OPTIONAL { ?animal dbpedia2:subspecies ?subspecies . }\
			OPTIONAL {\
				?animal <http://dbpedia.org/ontology/abstract> ?abstract\
				FILTER ( langMatches( lang( ?abstract ), "EN" ))\
			}\
		}\
		LIMIT 50\
	';
	var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
	$.ajax({
		dataType: "jsonp",	
		url: queryUrl,
		timeout: 10*1000,
		success: function( _data ) {
			//------------------------------------------------------------
			//  Grab some info to scroll properly
			//------------------------------------------------------------
			var end = $( _output ).height();
			imgShellSize();
			//------------------------------------------------------------
			//  Hide and show what you need
			//------------------------------------------------------------
			hideWait();
			markSearch( _search );
			//------------------------------------------------------------
			//  Sort by relevanve and clip to 25 records
			//------------------------------------------------------------
			_data = resultSort( _data );
			//------------------------------------------------------------
			//  Display the results
			//------------------------------------------------------------
			displayResults( _data, _output, _search );
			$( '#imgShell' ).animate({ scrollTop: end }, 2000 );
		},
		error: function( _e ) {
			hideWait();
			showError();
		}
	});
}
//------------------------------------------------------------
//  I have to write this...  Sort results by relevancy...
//  Not sure how I'll do this exactly...
//------------------------------------------------------------
function resultSort( _data ) {
	return _data;
}
//------------------------------------------------------------
//  Clean up names
//------------------------------------------------------------
function cleanTaxon( _result, _taxon, _replacement ) {
	var out = _replacement;
	if ( _result[ _taxon ] != undefined ) {
		out = _result[ _taxon ].value.toString().replace( /^.*(\\|\/|\:)/, '' );
	}
	return out
}
//------------------------------------------------------------
//  Display the results... 25 at a time.
//------------------------------------------------------------
function displayResults( _data, _output, _search ) {
	var results = _data.results.bindings;
	//------------------------------------------------------------
	//  Loop through the results
	//------------------------------------------------------------
	for ( var i=0; i<25; i++ ) {
		//------------------------------------------------------------
		//  Get the image source
		//------------------------------------------------------------
		if ( results[i] == undefined ) {
			continue;
		}
		var src = results[i].img.value;
		//------------------------------------------------------------
		//  Get the name
		//------------------------------------------------------------
		var name = cleanTaxon( results[i], 'name', '???');
		//------------------------------------------------------------
		//  Highlight the part of the name that matches the search
		//------------------------------------------------------------
		name = name.split( _search ).join( '<span class="color">'+_search+'</span>')
		//------------------------------------------------------------
		//  Taxonomic info, baby!!
		//------------------------------------------------------------
		var kingdom = cleanTaxon( results[i], 'kingdom', '???');
		var order = cleanTaxon( results[i], 'order', '???');
		var phylum = cleanTaxon( results[i], 'phylum', '???');
		var clss = cleanTaxon( results[i], 'class', '???');
		var family = cleanTaxon( results[i], 'family', '???');
		var genus = cleanTaxon( results[i], 'genus', '???');
		var species = cleanTaxon( results[i], 'species', '???');
		var subspecies = cleanTaxon( results[i], 'subspecies', '');
		//------------------------------------------------------------
		//  Grab a quick little summary.
		//------------------------------------------------------------
		var abstract = cleanTaxon( results[i], 'abstract', '' );
		//------------------------------------------------------------
		//	Only display jpegs
		//------------------------------------------------------------
		var ext = src.split( '.' ).pop().toUpperCase();
		switch ( ext ) {
			case 'JPG':
			case 'JPEG':
				var result = '\
					<div class="result">\
						<img src="'+src+'"/>\
						<div class="text">\
							<h3 class="name">'+ name +'</h3>\
							<div class="kingdom">'+ kingdom +'</div>\
							<div class="order">'+ order +'</div>\
							<div class="phylum">'+ phylum +'</div>\
							<div class="clss">'+ clss +'</div>\
							<div class="family">'+ family +'</div>\
							<div class="genus">'+ genus +'</div>\
							<div class="species">'+ species +'</div>\
							<div class="subspecies">'+ subspecies +'</div>\
							<div class="abstract">'+ abstract + '</div>\
						</div>\
						<div style="clear:both"></div>\
					</div>\
				';
				$( _output ).append( result );
				break;
		}
	}
}
/*
//------------------------------------------------------------
//  NOTES
//------------------------------------------------------------
//------------------------------------------------------------
//	Retrieve images belonging to a particular genus
//------------------------------------------------------------
function genusImgs( _genus, _output ) {
	_genus = _genus.toLowerCase().capitalize();
	var url = "http://dbpedia.org/sparql";
	var query = "\
	PREFIX dbpedia2: <http://dbpedia.org/property/>\
	PREFIX foaf: <http://xmlns.com/foaf/0.1/>\
	SELECT ?o\
	WHERE {\
		?s dbpedia2:genus \"" + _genus + "\"@en;\
			foaf:depiction ?o\
	}";
	var queryUrl = encodeURI( url+"?query="+query+"&format=json" );
	$.ajax({
		dataType: "jsonp",	
		url: queryUrl,
		success: function( _data ) {
			hideWait();
			var end = $( _output ).height();
			imgShellSize();
			markSearch( _genus );
			var results = _data.results.bindings;
			for ( var i in results ) {
				var src = results[i].o.value;
				var ext = src.split( '.' ).pop().toUpperCase();
				//------------------------------------------------------------
				//	Only display jpegs
				//------------------------------------------------------------
				switch ( ext ) {
					case 'JPG':
					case 'JPEG':
						$( _output ).append( '<img src="'+src+'"/>' );
						break;
				}
				
			}
			$( '#imgShell' ).animate({ scrollTop: end }, 2000 );
		}
	});
}

//------------------------------------------------------------
//	Grab images belonging to genus
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s	dbpedia2:genus	'Apis'@en;
		foaf:depiction	?o
}

//------------------------------------------------------------
//	Common name to genus
//------------------------------------------------------------
SELECT ?genus
WHERE {
	?s	rdfs:label		"Honey bee"@en;
		dbpedia2:genus	?genus
}

//------------------------------------------------------------
//	'Like' type search... this can be very slow
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s rdfs:label ?o
	FILTER regex( ?o, "bee", "i" )
}

//------------------------------------------------------------
//	'Like' type search... for only organisms
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s	dbpedia2:regnum ?kingdom;
		rdfs:label ?o
		FILTER regex( ?o, "bee", "i" )
}

//------------------------------------------------------------
//	'Like' type search... only for	organisms get ontology
//------------------------------------------------------------
SELECT ?name, ?o
WHERE {
	?s	dbpedia2:regnum ?any;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
	?name ?p ?o
}

//------------------------------------------------------------
//	Official species only english?
//------------------------------------------------------------
SELECT ?name, ?animal
WHERE {
	?s	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal ?p ?name
}

//------------------------------------------------------------
//	Where to go from here?
//------------------------------------------------------------
SELECT ?name, ?animal, ?p
WHERE {
	?s	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal ?p ?name
}

//------------------------------------------------------------
//	Okay let's make sure what gets returned is the same property
//------------------------------------------------------------
SELECT ?animal, ?kingdom, ?phylum, ?order, ?img
WHERE {
	?s	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal dbpedia2:name ?name;
		dbpedia2:regnum ?kingdom;
		foaf:depiction ?img
}

//------------------------------------------------------------
//	HAHAHAHAAHAH I've done it!
//------------------------------------------------------------
//------------------------------------------------------------
//	I'm going to build the search around this query now.
//------------------------------------------------------------
SELECT	?name, ?kingdom, ?phylum, ?class, ?order, ?family, ?genus, ?species, ?subspecies, ?img, ?abstract
WHERE {
	?s	dbpedia2:regnum ?hasValue;
		rdfs:label ?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal dbpedia2:name ?name
	?animal foaf:depiction ?img .
	OPTIONAL { ?animal dbpedia2:regnum ?kingdom . }
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

dbpedia:ontology/class [http]	:Insect [http]
dbpedia:ontology/family [http]	:Apidae [http]
dbpedia:ontology/family [http]	:Apinae [http]
dbpedia:ontology/kingdom [http] :Animal [http]
dbpedia:ontology/order [http]	:Hymenoptera [http]
dbpedia:ontology/phylum [http]	:Arthropod [http]

*/