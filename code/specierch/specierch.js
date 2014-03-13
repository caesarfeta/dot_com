//------------------------------------------------------------
//  SETUP
//------------------------------------------------------------
//------------------------------------------------------------
//  Build the search box
//------------------------------------------------------------
var html = '\
<div id="specierch">\
	<div id="search">\
		<input id="input" type="text" placeholder="Genus Name">\
	</div>\
	<div id="imgShell"><div id="imgBox"></div></div>\
	<div id="options">\
		<a id="aboutClick" class="bigger" href="about">?</a>\
	</div>\
	<div id="about">\
		<p><a href="../../story/dbpedia">Learn more about how specierch works.</a></p>\
	</div>\
	<div id="hint">\
		<p>Welcome to specierch.</p>\
		<p>It\'s fun to look at images of living organisms.  Especially when they\'re closely related.</p>\
		<p>Type a genus name into the input field, press Enter,\
		and wait for the images of species belonging to the genus to come streaming in.</p>\
		<p>Here\'s some sample genus names:\
			<span class="bigger">Apis, Hyla, Homo</span>\
		</p>\
	</div>\
	<div id="wait">\
		<p>I am searching. DbPedia can be really slow sometimes.</p>\
		<p>Thank you for waiting.</p>\
	</div>\
</div>';
$( 'body' ).append( html );

//------------------------------------------------------------
//  search
//------------------------------------------------------------
$( '#search' ).css({
	'margin-left': $( '#search' ).outerWidth()/2 * -1
});

centerId( 'wait' );
centerId( 'hint' );
centerId( 'about' );
hideWait();
hideAbout();
$( '#aboutClick' ).on( 'touchstart click', function( _e ) {
	_e.preventDefault();
	hideWait();
	hideHint();
	( $('#about').is(':visible') ) ? hideAbout() : showAbout();
})

//------------------------------------------------------------
//  imgBox
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
//  ACTION
//------------------------------------------------------------
function centerId( _id ) {
	$( '#'+_id ).css({
		'margin-left': $( '#'+_id ).outerWidth()/2 * -1,
		'margin-top': $( '#'+_id ).outerHeight()/2 * -1,
	});
}
function nameSearch( _input ) {
	genusImgs( _input, '#imgBox' );
}
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
function imgShellSize() {
	$('#imgShell').width( $(window).width() );
	$('#imgShell').height( $(window).height() );
}
function markSearch( _name ) {
	$( '#imgBox' ).append( '<div class="search_mark">' + _name + '</div>' );
}

//------------------------------------------------------------
//  Retrieve images belonging to a particular genus
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
			var end = $( '#imgBox' ).height();
			imgShellSize();
			markSearch( _genus );
			var results = _data.results.bindings;
			for ( var i in results ) {
				var src = results[i].o.value;
				var ext = src.split( '.' ).pop().toUpperCase();
				//------------------------------------------------------------
				//  Only display jpegs
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
/*

//------------------------------------------------------------
//  Grab images belonging to genus
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s 	dbpedia2:genus 	'Apis'@en;
		foaf:depiction 	?o
}

//------------------------------------------------------------
//  Common name to genus
//------------------------------------------------------------
SELECT ?genus
WHERE {
	?s 	rdfs:label 		"Honey bee"@en;
		dbpedia2:genus 	?genus
}

//------------------------------------------------------------
//  'Like' type search... this can be very slow
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s rdfs:label ?o
	FILTER regex( ?o, "bee", "i" )
}

//------------------------------------------------------------
//  'Like' type search... for only organisms
//------------------------------------------------------------
SELECT ?o
WHERE {
	?s 	dbpedia2:regnum ?kingdom;
		rdfs:label ?o
		FILTER regex( ?o, "bee", "i" )
}

//------------------------------------------------------------
//  'Like' type search... only for  organisms get ontology
//------------------------------------------------------------
SELECT ?name, ?o
WHERE {
	?s 	dbpedia2:regnum ?any;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
    ?name ?p ?o
}

//------------------------------------------------------------
//  Official species only english?
//------------------------------------------------------------
SELECT ?name, ?animal
WHERE {
	?s 	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal ?p ?name
}

//------------------------------------------------------------
//  Where to go from here?
//------------------------------------------------------------
SELECT ?name, ?animal, ?p
WHERE {
	?s 	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal ?p ?name
}

//------------------------------------------------------------
//  Okay let's make sure what gets returned is the same property
//------------------------------------------------------------
SELECT ?animal, ?kingdom, ?phylum, ?order, ?img
WHERE {
	?s 	dbpedia2:regnum ?hasValue;
		rdfs:label?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal dbpedia2:name ?name;
		dbpedia2:regnum ?kingdom;
		foaf:depiction ?img
}

//------------------------------------------------------------
//  HAHAHAHAAHAH I've done it!
//------------------------------------------------------------
//------------------------------------------------------------
//  I'm going to build the search around this query now.
//------------------------------------------------------------
SELECT  ?animal, ?name, ?kingdom, ?order, ?phylum, ?class, ?family, ?genus, ?species, ?subspecies, ?img, ?abstract
WHERE {
	?s 	dbpedia2:regnum ?hasValue;
		rdfs:label ?name
		FILTER regex( ?name, "bee", "i" )
		FILTER ( langMatches( lang( ?name ), "EN" ))
	?animal dbpedia2:name ?name
	OPTIONAL { ?animal dbpedia2:regnum ?kingdom . }
	OPTIONAL { ?animal dbpedia2:ordo ?order . }
	OPTIONAL { ?animal dbpedia2:phylum ?phylum . }
	OPTIONAL { ?animal dbpedia2:classis ?class . }
	OPTIONAL { ?animal dbpedia2:familia ?family . }
	OPTIONAL { ?animal dbpedia2:genus ?genus . }
	OPTIONAL { ?animal dbpedia2:species ?species . }
	OPTIONAL { ?animal dbpedia2:subspecies ?subspecies . }
	OPTIONAL { ?animal foaf:depiction ?img . }
	OPTIONAL { 
		?animal <http://dbpedia.org/ontology/abstract> ?abstract
		FILTER ( langMatches( lang( ?abstract ), "EN" ))
	}
}

dbpedia:ontology/class [http]	:Insect [http]
dbpedia:ontology/family [http]	:Apidae [http]
dbpedia:ontology/family [http]	:Apinae [http]
dbpedia:ontology/kingdom [http]	:Animal [http]
dbpedia:ontology/order [http]	:Hymenoptera [http]
dbpedia:ontology/phylum [http]	:Arthropod [http]

*/
