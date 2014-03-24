var html = [];
var current = 0;
window.onkeyup = function( _e ) {
	var key = _e.keyCode ? _e.keyCode : _e.which;
	switch ( key ) {
		case 83: // "s" is for "slideshow"
			start();
			break;
	}
}

function listen() {
	window.onkeyup = function( _e ) {
		var key = _e.keyCode ? _e.keyCode : _e.which;
		switch ( key ) {
			case 37: // left arrow
				current = ( current < 0 ) ? html.length-1 : current-1;
				break;
			case 39: // right arrow
				current = ( current > html.length-1 ) ? 0 : current+1;
				break;
			case 27: // escape
				remove();
				break
		}
		update();
	}
}

function update() {
	$( '#slideshow' ).empty();
	$( '#slideshow' ).html( html[ current ] );
}

function remove() {
	$( '#extra-info' ).show();
	$( '#header' ).show();
	$( '#slideshow' ).hide();
}

function start() {
	// Break-up the body text
	html = $( '#text' ).html().split('<h1');
	for ( var i=1, ii=html.length; i<ii; i++ ) {
		html[i] = '<h1' + html[i];
	}
	// Append intro bit
	html.unshift( $('#meta').html() );
	build();
	listen();
}

function build() {
	$( '#extra-info' ).hide();
	$( '#header' ).hide();
	$( 'body' ).append( '<div id="slideshow"></div>' )
	$( '#slideshow' ).html( html[ current ] );
}