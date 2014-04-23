//------------------------------------------------------------
//	SETUP
//------------------------------------------------------------
//------------------------------------------------------------
//	Build the search box
//------------------------------------------------------------
var html = '\
<div id="specierch">\
	<div id="search">\
		<input id="input" type="text" placeholder="search words">\
		<a href="" id="searchClick">Go!</a>\
	</div>\
	<div id="imgShell"><div id="imgBox"></div></div>\
	<div id="options">\
		<a id="aboutClick" class="bigger" href="about">?</a>\
	</div>\
	<div class="popup" id="about">\
		<p>Specierch was created by <a href="../../about.html">Adam Tavares</a></p>\
		<p><a href="../../story/dbpedia">Learn more about how Specierch works.</a></p>\
	</div>\
	<div class="popup" id="error">\
		<p>Sorry... DbPedia must be down.</p>\
		<p>Please check back later!</p>\
	</div>\
	<div class="popup" id="hint">\
		<h2>Welcome to Specierch.</h2>\
		<p>\
			Specierch ( pronounced spee-sea-urch ) is an image search tool designed specifically for finding photographs of living organisms catalogued in <a href="http://dbpedia.org/About">DbPedia</a>.\
		</p>\
		<p>\
			Type search words into the input field at the bottom of the screen, press Enter,\
			and wait for the images and info to come streaming in.\
		</p>\
		<p>\
			Specierch will return a maximum of 25 organisms per search,\
			so if you don\'t find what you\'re looking for the first time, try again with more specific search words.\
		</p>\
		<p>\
			It\'s fun to search for mundane words to see Nature\'s variations of a particular theme.</br>\
			Here\'s some example search words to get you started:\
		</p>\
		<p>\
			<span class="bigger">\
				sun, cloud, gold, glass, silver, death, devil, angel, grass, weed, tree, \
				honey, lemon, dark, light, clown, desert, mountain, barn, horn \
			</span>\
		</p>\
		<p>\
			I hope this tool will help you better enjoy Nature\'s structures, patterns, and colors!</br>\
			Thanks for visiting!\
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
//centerId( 'wait' );
//centerId( 'hint' );
//centerId( 'about' );
//centerId( 'error' );
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
$('#input').bind( 'enter', function( _e ){
	startSearch();
});
$('#searchClick').on( 'touchstart click', function( _e ) {
	_e.preventDefault();
	startSearch();
});
$( '#input' ).keyup( function( _e ){
	if ( _e.keyCode == 13 ) {
		$( this ).trigger( "enter" );
	}
});
$( window ).resize( function( _e ) {
	imgShellSize();
});
var resultNum = 0;
//------------------------------------------------------------
//	ACTION
//------------------------------------------------------------
function startSearch() {
	var search = $('#input').val();
	if ( search == '' ) {
		return;
	}
	nameSearch( search );
	$('#input').addClass( 'faded' );
	$('#input').blur();
	hideError();
	hideHint();
	showWait();
}
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
				foaf:depiction ?img;\
				dbpedia2:regnum ?kingdom\
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
		GROUP BY ?name\
		LIMIT 500\
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
			_data = _data.results.bindings;
			_data = resultSort( _data, _search );
			//------------------------------------------------------------
			//  Display the results
			//------------------------------------------------------------
			displayResults( _data, _output, _search );
			$( '#imgShell' ).animate({ scrollTop: end }, 500 );
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
function resultSort( _data, _search ) {
	//return _data;
	//------------------------------------------------------------
	//  Search string 100% match:
	//  tiger - Tiger
	//------------------------------------------------------------
	var perfect = [];
	//------------------------------------------------------------
	//  Search string bounded by space and end: 
	//  whale - Right Whale
	//------------------------------------------------------------
	var spaceAndEnd = [];
	//------------------------------------------------------------
	//  Search string at beginning followed by chars:
	//  blue - Blue Whale
	//------------------------------------------------------------
	var begAndSpace = [];
	//------------------------------------------------------------
	//  Search string bounded by space
	//  tailed - Ring Tailed Lemur
	//------------------------------------------------------------
	var spaceAndSpace = [];
	//------------------------------------------------------------
	//  Search string found anywhere
	//  ail - Ring Tailed Lemur
	//------------------------------------------------------------
	var anywhere = [];
	//------------------------------------------------------------
	//  Okay so we have our tiers defined.  Now let's sort!
	//------------------------------------------------------------
	var search = _search.alphaSpaceOnly().toUpperCase();
	for ( var i=0, ii=_data.length; i<ii; i++ ) {
		var name = _data[i].name.value.toString().alphaSpaceOnly().toUpperCase();
		//------------------------------------------------------------
		//  Perfect
		//------------------------------------------------------------
		if ( name == search ) {
			perfect.push( _data[i] );
			continue;
		}
		//------------------------------------------------------------
		//  Space and End
		//------------------------------------------------------------
		var check = name.indexOf( ' '+search ) + search.length + 1;
		if ( check == name.length ) {
			spaceAndEnd.push( _data[i] );
			continue;
		}
		//------------------------------------------------------------
		//  Beginning and Space
		//------------------------------------------------------------
		if ( name.indexOf( search+' ' ) == 0 ) {
			begAndSpace.push( _data[i] );
			continue;
		}
		//------------------------------------------------------------
		//  Space And Space
		//------------------------------------------------------------
		check = name.indexOf( ' '+search+' ' );
		if ( check != -1 ) {
			spaceAndSpace.push( _data[i] );
			continue;
		}
		//------------------------------------------------------------
		//  Anywhere
		//------------------------------------------------------------
		anywhere.push( _data[i] );
	}
	//------------------------------------------------------------
	//  Concatenate them all together.
	//------------------------------------------------------------
	perfect = perfect.concat( spaceAndEnd );
	perfect = perfect.concat( begAndSpace );
	perfect = perfect.concat( spaceAndSpace );
	perfect = perfect.concat( anywhere );
	return perfect;
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
	var results = _data;
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
		var name = cleanTaxon( results[i], 'name', '...');
		//------------------------------------------------------------
		//  Highlight the part of the name that matches the search
		//------------------------------------------------------------
		name = name.split( _search ).join( '<span class="color">'+_search+'</span>')
		var caps = _search.capitalize();
		name = name.split( caps ).join( '<span class="color">'+caps+'</span>')
		//------------------------------------------------------------
		//  Taxonomic info, baby!!
		//------------------------------------------------------------
		var kingdom = cleanTaxon( results[i], 'kingdom', '...');
		var order = cleanTaxon( results[i], 'order', '...');
		var phylum = cleanTaxon( results[i], 'phylum', '...');
		var clss = cleanTaxon( results[i], 'class', '...');
		var family = cleanTaxon( results[i], 'family', '...');
		var genus = cleanTaxon( results[i], 'genus', '...');
		var species = cleanTaxon( results[i], 'species', '...');
		var subspecies = cleanTaxon( results[i], 'subspecies', '...');
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
					<div id="result'+resultNum+'" class="result">\
						<img src="'+src+'"/>\
						<div class="text">\
							<a href=""><h3 class="name">'+ name +'</h3><span class="switch">&#9660;</span></a>\
							<div class="extra">\
								<table>\
									<tr>\
										<td>kingdom</td><td>'+ kingdom +'</td>\
									</tr>\
									<tr>\
										<td>phylum</td><td>'+ phylum +'</td>\
									</tr>\
									<tr>\
										<td>class</td><td>'+ clss +'</td>\
									</tr>\
									<tr>\
										<td>order</td><td>'+ order +'</td>\
									</tr>\
									<tr>\
										<td>family</td><td>'+ family +'</td>\
									</tr>\
									<tr>\
										<td>genus</td><td>'+ genus +'</td>\
									</tr>\
									<tr>\
										<td>species</td><td>'+ species +'</td>\
									</tr>\
									<tr>\
										<td>subspecies</td><td>'+ subspecies +'</td>\
									</tr>\
								</table>\
								<div class="abstract">'+ abstract + '</div>\
							</div>\
						</div>\
						<div style="clear:both"></div>\
					</div>\
				';
				$( _output ).append( result );
				//------------------------------------------------------------
				//  Text drop down.
				//------------------------------------------------------------
				$( '#result'+resultNum+' a' ).on( 'touchstart click', function(_e) {
					_e.preventDefault();
					var parent = $( this ).parent();
					if ( $( '.extra', parent ).is(':visible') ) {
						$( '.switch', parent ).html( '&#9660;' );
						$( '.extra', parent ).hide();
						$( parent ).removeClass( 'open' );
					}
					else {
						$( '.switch', parent ).html( '&#9650;' );
						$( '.extra', parent ).show();
						$( parent ).addClass( 'open' );
					}
				});
				resultNum++;
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