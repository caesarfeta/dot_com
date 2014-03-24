var SLDS = SLDS || { REVISION: '1' }
SLDS.show = function() {
	var self = this;
	this.html = [];
	this.current = 0;
	this.on = false;
	window.onkeyup = function( _e ) {
		var key = _e.keyCode ? _e.keyCode : _e.which;
		switch ( key ) {
			case 83: // "s" is for "slideshow"
				self.go();
				break;
		}
	}
}
SLDS.show.prototype.go = function() {
	var self = this;
	if ( self.on == false) {
		self.start();
		return;
	}
	self.switch();
}
SLDS.show.prototype.listen = function() {
	var self = this;
	window.onkeyup = function( _e ) {
		var key = _e.keyCode ? _e.keyCode : _e.which;
		switch ( key ) {
			case 37: // left arrow
				self.current = ( self.current < 0 ) ? self.html.length-1 : self.current-1;
				break;
			case 39: // right arrow
				self.current = ( self.current > self.html.length-1 ) ? 0 : self.current+1;
				break;
			case 27: // escape
				self.hide();
				break
			case 83: // "s" is for "slideshow"
				self.go();
				break;
		}
		self.update();
	}
}
SLDS.show.prototype.update = function() {
	$( '#slideshow' ).empty();
	$( '#slideshow' ).html( this.html[ this.current ] );
}

SLDS.show.prototype.switch = function() {
	if ( $('#slideshow').is( ':visible' ) ) {
		this.hide();
	}
	else {
		this.show();
	}
}
SLDS.show.prototype.show = function() {
	$( '#extra-info' ).hide();
	$( '#header' ).hide();
	$( '#slideshow' ).show();
}
SLDS.show.prototype.hide = function() {
	$( '#extra-info' ).show();
	$( '#header' ).show();
	$( '#slideshow' ).hide();
}
SLDS.show.prototype.start = function() {
	//------------------------------------------------------------
	//  Break-up the body text
	//------------------------------------------------------------
	this.html = $( '#text' ).html().split('<h1');
	for ( var i=1, ii=this.html.length; i<ii; i++ ) {
		this.html[i] = '<h1' + this.html[i];
	}
	//------------------------------------------------------------
	//  Append intro bit
	//------------------------------------------------------------
	this.html.unshift( $('#meta').html() );
	this.build();
	this.listen();
	this.on = true;
}
SLDS.show.prototype.build = function() {
	$( 'body' ).append( '<div id="slideshow"></div>' )
	$( '#slideshow' ).html( this.html[ this.current ] );
	this.show();
}