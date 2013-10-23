/*!
 * inf_img
 * Copyright (C) 2013 Adam Tavares
 * http://adamtavares.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
;(function($) {
	
	function inf_img( elem, options, id ) {
		var self = this;
		self.elem = elem;
		self.id = id;
		self.init( elem, options );
	}
	
	inf_img.prototype.init = function( elem, options ) {
		var self = this;
		
		//------------------------------------------------------------
		//	User options 
		//------------------------------------------------------------
		self.options = $.extend({
			frequency: 1,	// How often to check?
			fade_time: null,
			wait_image: false,
			waiting_image: 'img/loading.gif',
			minimum_wait: 1
		}, options);
		self.options['fade_time'] *= 1000;
		self.options['frequency'] *= 1000;
		self.options['minimum_wait'] *= 1000;

		//------------------------------------------------------------
		//	Shared instance method variables
		//------------------------------------------------------------
		self.obj = {
			timer_id: null
		};
		
		self.create();
	}
	
	inf_img.prototype.create = function() {
		var self = this;
		self.obj['timer_id'] = setInterval( 
			function() {
				var winY = $(window).scrollTop() + $(window).height();
				var myY = $( self.elem ).position().top + parseInt( $( self.elem ).height() );
				
				if ( myY < winY ) {
					//--------------------------------------------------------
					//	If you're in the window turn that anchor to an image  
					//--------------------------------------------------------
					var img = $(document.createElement('img'));
					
					//---------------------
					//	Load a wait image  
					//---------------------
					if ( self.options['wait_image'] ) {
						self.addToDom( img );
						img.attr( 'src', self.options['waiting_image'] );
						var time = setInterval( function(){
							self.loadImage( img );
							clearInterval( time );
						}, self.options['minimum_wait'] );
					}
					else {
						self.loadImage( img );
						self.addToDom( img );
					}
					
					//----------------------
					//	Clear the timer id	
					//----------------------
					clearInterval( self.obj['timer_id'] );
				}
			}, self.options['frequency']
		);
	}
	
	inf_img.prototype.loadImage = function( img ) {
		var self = this;
		
		//------------------------------------------------------------
		//	If fade_time is null don't fade in image  
		//------------------------------------------------------------
		if ( self.options['fade_time'] != null ) {
			img.hide();
			img.load( function(){
				$(this).fadeIn( self.options['fade_time'] );
			})
		}
		
		//------------------------------------------------------------
		//	Copy attributes
		//------------------------------------------------------------
		var href = $( self.elem ).attr('href');
		var id = $( self.elem ).attr( 'id' );
		var alt = $( self.elem ).attr( 'rel')
		img.attr( 'src', href );
		img.attr( 'id',	 id );
		img.attr( 'alt',  alt );
	}
	
	inf_img.prototype.addToDom = function( img ) {
		var self = this;
		$( self.elem ).after( img );
		$( self.elem ).remove();
	}

	//----------------
	//	Extend JQuery 
	//----------------
	jQuery(document).ready( function($) {
		jQuery.fn.inf_img = function( options ) {
			var id = jQuery(this).selector;
			return this.each( function() {
				jQuery.data( this, id, new inf_img( this, options, id ) );
			});
		};
	})
})(jQuery);
