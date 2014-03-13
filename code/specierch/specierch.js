//------------------------------------------------------------
//  SETUP
//------------------------------------------------------------
//------------------------------------------------------------
//  Build the search box
//------------------------------------------------------------
var html = '\
	<div id="search">\
		<input id="input" type="text" placeholder="Genus Name">\
	</div>\
	<div id="imgShell"><div id="imgBox"></div></div>\
	<div id="hint">\
		<p>Welcome to specierch.</p>\
		<p>It\'s fun to look at similar species.</p>\
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
';
$( 'body' ).append( html );

//------------------------------------------------------------
//  search
//------------------------------------------------------------
$( '#search' ).css({
	'margin-left': $( '#search' ).outerWidth()/2 * -1
});

//------------------------------------------------------------
//  Wait
//------------------------------------------------------------
centerId( 'wait' );

//------------------------------------------------------------
//  Hint
//------------------------------------------------------------
centerId( 'hint' );
hideWait();

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
function imgShellSize() {
	$('#imgShell').width( $(window).width() );
	$('#imgShell').height( $(window).height() );
}
function markSearch( _name ) {
	$( '#imgBox' ).append( '<div class="search_mark">' + _name + '</div>' );
}
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
			console.log( end );
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
			$( '#imgShell' ).scrollTop( end );
		}
	});
}