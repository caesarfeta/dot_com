//------------------------------------------------------------
//  SETUP
//------------------------------------------------------------
//------------------------------------------------------------
//  Build the search box
//------------------------------------------------------------
var html = '\
	<div id="search">\
		<input id="input" type="text" placeholder="Species Name">\
	</div>\
	<div id="imgBox"></div>\
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
$( '#wait' ).css({
	'margin-left': $( '#wait' ).outerWidth()/2 * -1,
	'margin-top': $( '#wait' ).outerHeight()/2 * -1,
});
hideWait();

//------------------------------------------------------------
//  imgBox
//------------------------------------------------------------
$('#input').bind( "enter", function( _e ){
   nameSearch( $('#input').val() );
   showWait();
});
$( '#input' ).keyup( function( _e ){
    if ( _e.keyCode == 13 ) {
        $( this ).trigger( "enter" );
    }
});
$( window ).resize( function( _e ) {
	imgBoxSize();
})

//------------------------------------------------------------
//  ACTION
//------------------------------------------------------------
function nameSearch( _input ) {
	genusImgs( _input, '#imgBox' );
}
function hideWait() {
	$( '#wait' ).hide();
}
function showWait() {
	$('#wait').show();
}
function imgBoxSize() {
	$('#imgBox').width( $(window).width() );
	$('#imgBox').height( $(window).height() );
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
			imgBoxSize();
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
		}
	});
}