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
/*!
 * barfly - barfly
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
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element which will hold 
	 *		the chart barfly draws.
	 *
	 * @param { obj } _options Key value pairs that hold 
	 *		barfly's configuration
	 *
	 * @param { string } _id The id of the DOM element 
	 *		which will hold the chart barfly draws.
	 */
	function barfly( _elem, _options, _id ) {
		var self = this;
		self.elem = _elem;
		self.id = _id;
		self.init( _elem, _options );
	}
	
	/**
	 * Holds default options, adds user defined options, and initializes the plugin
	 *
	 * @param { obj } _elem The DOM element which will hold 
	 *		the chart barfly draws.
	 *
	 * @param { obj } _options Key value pairs that hold 
	 *		barfly's configuration
	 */
	barfly.prototype.init = function( _elem, _options ) {
		var self = this;
		
		//---------------
		//	User options 
		//---------------
		self.options = $.extend({
			//------------------------------------------------------------
			//	Supplied by user
			//------------------------------------------------------------
			src: null,
			theme: null,
			
			//------------------------------------------------------------
			//	Dimensions
			//------------------------------------------------------------
			width: 250,
			height: 250,
			
			//------------------------------------------------------------
			//	Animation speed in seconds
			//------------------------------------------------------------
			speed: .001,
			scroll_animate: false,
			
			//------------------------------------------------------------
			//	Background color
			//------------------------------------------------------------
			bg_color: null,
			
			//------------------------------------------------------------
			//	Padding used most often when "bg_color" options is set.
			//------------------------------------------------------------
			padding: 0,
			
			//------------------------------------------------------------
			//	Do you want pop-ups?
			//------------------------------------------------------------
			pop_ups: false,
			
			//------------------------------------------------------------
			//	Bars
			//------------------------------------------------------------
			stroke: 'none',
			bar_palette: [ '#222', '#444', '#666', '#888', '#AAA' ],
			alpha: .9,
			
			//------------------------------------------------------------
			//	Labels
			//------------------------------------------------------------
			label_lines: true,
			label_lines_font_size: 10,
			label_lines_font_color: '#333',
			
			label_bars: true,
			label_bars_font_size: 10,
			label_bars_color: '#333',
			
			//------------------------------------------------------------
			//	Lines
			//------------------------------------------------------------
			draw_lines: true,
			line_color: '#333'
			
		}, _options);
		
		//------------------------------------------------------------
		//	If a theme was set
		//------------------------------------------------------------
		if ( self.options['theme'] != null ) {
			var theme = self.theme( self.options['theme'] );
			self.options = $.extend( self.options, theme );
		}
		
		//------------------------------------------------------------
		//	Change seconds to milliseconds for internal use
		//------------------------------------------------------------
		self.options['speed'] *= 1000;
		
		//------------------------------------------------------------
		//	Instance variables
		//------------------------------------------------------------
		self.width = self.options['width'] - self.options['padding']*2;
		self.height = self.options['height'] - self.options['padding']*2;
		
		self.dataset = {};
		self.largest = 0;
		self.max = 0;
		self.inc = 0;
		self.total = 0;
		self.heightCoeff = 0;
		self.barWidth = 0;
		self.bardata = {};
		self.totalColors = self.options['bar_palette'].length;
		self.totalLines = 0;
		
		//------------------------------------------------------------
		//	The background color
		//------------------------------------------------------------
		self.bg = null;
		
		//------------------------------------------------------------
		//	Where pop-ups are stored.
		//------------------------------------------------------------
		self.popUps = {};
		
		//------------------------------------------------------------
		//	Grab the chart's id to pass along to Raphael
		//------------------------------------------------------------
		self.chartId = $( self.elem ).attr('id');
		
		//------------------------------------------------------------
		//	Timer id... used by scroll animation subsystem
		//------------------------------------------------------------
		self.timerId = null;
		
		//------------------------------------------------------------
		//	This is used to map Raphael rectangle ids to the dataset
		//------------------------------------------------------------
		self.barIdMap = null;
		
		//------------------------------------------------------------
		//	Start this party
		//------------------------------------------------------------
		self.create();
	}
	
	/**
	 * Create the barchart the first time.
	 */
	barfly.prototype.create = function() {
		var self = this;
		
		//------------------------------------------------------------
		//	Initialize Raphael
		//------------------------------------------------------------
		self.paper = Raphael( self.chartId, self.options['width'], self.options['height'] );
		
		//------------------------------------------------------------
		//	Draw the thing
		//------------------------------------------------------------
		self.redraw();
		
		//------------------------------------------------------------
		//	Ready scroll animation
		//------------------------------------------------------------
		if ( self.options['scroll_animate'] == true ) {
			self.scrollAnimationSetup();
		}
		
		//------------------------------------------------------------
		//	Clear click handler
		//------------------------------------------------------------
		if ( self.options['pop_ups'] == true ) {
			self.clickBgPopupClear();
		}
	}
	
	/**
	 * Declares the pop-up clearing click handler.
	 */
	barfly.prototype.clickBgPopupClear = function() {
		var self = this;
		
		//------------------------------------------------------------
		//	*NOTE: this works find in Chrome and Safari fine.  It
		//	works in Firefox but I don't know why... The values
		//	I'm getting are not what I suspect.
		//------------------------------------------------------------
		$( self.elem ).click( function( _e ) {
			//------------------------------------------------------------
			//	Get offsets
			//------------------------------------------------------------
			var offsetX	 = ( _e.offsetX || _e.clientX - $( _e.target ).offset().left );
			var offsetY	 = ( _e.offsetY || _e.clientY - $( _e.target ).offset().top );
			
			/*
			console.log( '-------------------' );
			console.log( _e.clientY );
			console.log( $( _e.target).offset().top )
			console.log( offsetY );
			*/
			
			//------------------------------------------------------------
			//	Find the closest bar horizontally.
			//------------------------------------------------------------
			var last = null;
			for ( var key in self.bardata ) {
				var x = self.bardata[ key ][ 'x' ];
				if ( offsetX > x ) {
					last = self.bardata[ key ];
				}
			}
			
			//------------------------------------------------------------
			//	Over the bar?  If not clear all popups because you ain't
			//	clicking a bar.
			//------------------------------------------------------------
			if ( last != null && offsetY < last[ 'y' ] ) {
				self.clearPopUps();
			}
		});
	}
	
	/**
	 * Change the barchart's source.
	 *
	 * @param {string} _src The source table's id attribute value prefixed with #
	 *		i.e. <table id="table01"> -> "#table01"
	 */
	barfly.prototype.src = function( _src ) {
		var self = this;
		self.options['src'] = _src;
		self.redraw();
	}
	
	/**
	 * Setup so the barchart animates when it first enters the viewport.
	 */
	barfly.prototype.scrollAnimationSetup = function() {
		var self = this;
		self.timerId = setInterval(
			function() {
				var winY = $(window).scrollTop() + $(window).height();
				var myY = $( self.elem ).position().top + parseInt( $( self.elem ).height() );
				
				if ( myY < winY ) {
					self.drawBars();
					clearInterval( self.timerId );
				}
			}, 250 // check 1/4 every second
		);
	}
	
	/**
	 * Recalculates the source table data and draws the barchart.
	 */
	barfly.prototype.redraw = function() {
		var self = this;
		
		//------------------------------------------------------------
		//	Build the data object
		//------------------------------------------------------------
		self.grabData();
		
		//------------------------------------------------------------
		//	Draw the bars
		//------------------------------------------------------------
		self.calculate();
		
		//------------------------------------------------------------
		//	Draw the chart
		//------------------------------------------------------------
		self.draw();
	}
	
	/**
	 * Draws the barchart.
	 */
	barfly.prototype.draw = function() {
		var self = this;
		
		self.paper.clear();
		if ( self.options['bg_color'] != null ) {
			self.drawBg();
		}
		if ( self.options['draw_lines'] ) {
			self.drawLines();
		}
		if ( self.options['label_lines'] ) {
			self.drawLineLabels();
		}
		if ( self.options['scroll_animate'] == false ) {
			self.drawBars();
		}
		if ( self.options['label_bars'] ) {
			self.drawBarLabels();
		}
	}
	
	
	/**
	 * If a background color is set this function draws it.
	 */
	barfly.prototype.drawBg = function() {
		var self = this;
		self.bg = self.paper.rect( 0, 0, self.options['width'], self.options['height'] );
		self.bg.attr({ fill: self.options['bg_color'], stroke: "none" });
	}
	
	/**
	 * Change the barPalette
	 *
	 * @param { array } _colors An array of string representations 
	 *		of a hex color value '#45EF22'.
	 */
	barfly.prototype.barPalette = function( _colors ) {
		var self = this;
		
		//------------------------------------------------------------
		//	Set the background color.
		//------------------------------------------------------------
		self.options['bar_palette'] = _colors;
		self.totalColors = _colors.length;
		
		//------------------------------------------------------------
		//	Redraw the chart.
		//------------------------------------------------------------
		var speed = self.options['speed'];
		self.options['speed'] = .001;
		self.redraw();
		self.options['speed'] = speed;
	}
	
	/**
	 * Change the bgColor
	 *
	 * @param { string } _color String representation of a 
	 *		hex color value '#45EF22'.
	 */
	barfly.prototype.bgColor = function( _color ) {
		var self = this;
		
		//------------------------------------------------------------
		//	Set the background color.
		//------------------------------------------------------------
		self.options['bg_color'] = _color;
		var speed = self.options['speed'];
		self.options['speed'] = .001;
		self.draw();
		self.options['speed'] = speed;
	}
	
	/**
	 * Grabs the source table data and puts it in a simple to use data structure.
	 */
	barfly.prototype.grabData = function() {
		var self = this;
		self.largest = 0;
		self.dataset = {};
		self.total = 0;
		$( 'th', self.options['src'] ).each( function() {
			var key = $( this ).text();
			var value = parseInt( $( 'td', self.options['src'] ).eq( self.total ).text() );
			self.largest = ( value > self.largest ) ? value : self.largest;
			self.dataset[ key ] = value;
			self.total++;
		});
	}
	
	/**
	 * Takes the constructor options and calculates lengths needed for proper layout.
	 */
	barfly.prototype.calculate = function() {
		var self = this;
		
		self.barHeightMax = self.height;
		if ( self.options['label_bars'] ) {
			self.barHeightMax = self.height - self.options['label_bars_font_size']*1.5;
		}
		
		//------------------------------------------------------------
		//	Lines
		//------------------------------------------------------------
		self.max = self.closestZeroes( self.largest );
		self.totalLines = parseInt( self.max.toString().slice( 0, 1 ) );
		self.inc = Math.pow( 10, self.max.toString().length-1 );
		
		//------------------------------------------------------------
		//	Make sure the total number of lines is visually useful.
		//------------------------------------------------------------
		if ( self.totalLines < 3 ) {
			self.totalLines *= 4;
			self.inc = self.inc/4;
		}
		else if ( self.totalLines < 5 ) {
			self.totalLines *= 2;
			self.inc = self.inc/2;
		}
		self.lineSpacer = self.barHeightMax / self.totalLines;
		
		//------------------------------------------------------------
		//	Bars
		//------------------------------------------------------------
		self.heightCoeff = self.barHeightMax / self.max;
		self.startX = 0 + self.options['padding'];
		self.barWidth = self.width / self.total;
		
		//------------------------------------------------------------
		//	Do you want to number the lines?
		//------------------------------------------------------------
		if ( self.options['label_lines'] ) {
			self.barWidth = self.width / ( self.total + 1 );
			self.startX += self.barWidth;
		}
		
	}
	
	/**
	 * Draw the bars to size.
	 */
	barfly.prototype.drawBars = function() {
		var self = this;
		
		//------------------------------------------------------------
		//	Draw the bars
		//------------------------------------------------------------
		var i = 0;
		var rectangles = [];
		self.barIdMap = {};
		for ( var key in self.dataset ) {
			
			//------------------------------------------------------------
			//	Find the bar's color, height, and position
			//------------------------------------------------------------
			var barHeight = self.dataset[ key ] * self.heightCoeff;
			var x = self.barWidth * i + self.startX;
			var y = self.barHeightMax - barHeight + self.options['padding'];
			var colorIndex = ( i > self.totalColors-1 ) ? i % self.totalColors : i;
			var color = self.options['bar_palette'][ colorIndex ];
			
			//------------------------------------------------------------
			//	Store this data for later
			//------------------------------------------------------------
			self.bardata[ key ] = {};
			self.bardata[ key ][ 'height' ] = barHeight;
			self.bardata[ key ][ 'x' ] = x;
			self.bardata[ key ][ 'y' ] = y;
			self.bardata[ key ][ 'color' ] = color;
			
			//------------------------------------------------------------
			//	DRAW!!!
			//------------------------------------------------------------
			//------------------------------------------------------------
			//	Build the bars with Raphael
			//------------------------------------------------------------
			rectangles[i] = self.paper.rect( x, self.barHeightMax, self.barWidth, 0 );
			self.barIdMap[ rectangles[i].id ] = key;
			rectangles[i].attr({ 
				fill: color, 
				stroke: self.options['stroke'],
				"fill-opacity": self.options['alpha'] 
			});
			
			//------------------------------------------------------------
			//	Animate the height
			//------------------------------------------------------------
			rectangles[i].animate({ 
				height: barHeight, 
				y: y 
			}, self.options['speed'] );
			
			//------------------------------------------------------------
			//	Click events
			//------------------------------------------------------------
			if ( self.options['pop_ups'] == true ) {
				rectangles[i].click( function( _e ) {
					var key = self.barIdMap[ this.id ];
					self.drawPopUp( key );
				});
			}
			
			i++;
		}
	}
	
	/**
	 * Clear the value pop-ups.
	 */
	barfly.prototype.clearPopUps = function() {
		var self = this;
		for ( var key in self.popUps ) {
			self.popUps[ key ]['text'].remove();
			self.popUps[ key ]['bg'].remove();
			self.popUps[ key ]['tri'].remove();
		}
	}
	
	/**
	 * Draw a bar's value pop-up.
	 *
	 * @param {string} _id The bar's id
	 */
	barfly.prototype.drawPopUp = function( _id ) {
		var self = this;
		
		//------------------------------------------------------------
		//	Hide all preexisting pop-ups
		//------------------------------------------------------------
		self.clearPopUps();
	
		var x = self.bardata[ _id ]['x'];
		var y = self.bardata[ _id ]['y'];
		var length = self.dataset[ _id ].toString().length * 10;
		self.popUps[ _id ] = {};
		self.popUps[ _id ]['bg'] = self.paper.rect( x+5, y+12, length, 20 );
		self.popUps[ _id ]['text'] = self.paper.text( x+10, y+22, self.dataset[ _id ] );
		self.popUps[ _id ]['tri']	= self.paper.path([ 
			"M", x+15, y, 
			"L", x+20, y+13,
			"L", x+10, y+13
		]);
		self.popUps[ _id ]['length'] = length;
	
		self.popUps[ _id ]['tri'].attr({
			stroke: "none",
			fill: "#fff",
			opacity: 1
		});
		self.popUps[ _id ]['bg'].attr({
			stroke: "none",
			fill: "#fff",
			opacity: 1,
			width: self.popUps[ _id ]['length'],
			height: 20
		});		
		self.popUps[ _id ]['text'].attr({
			fill: "#000",
			opacity: 1,
			'text-anchor': "start"
		});
	}
	
	/**
	 * Draw barfly's value reference lines.
	 */
	barfly.prototype.drawLines = function() {
		var self = this;
		var i = 1;
		while ( i < self.totalLines ) {
			var y = i*self.lineSpacer + self.options['padding'];
			
			//------------------------------------------------------------
			//	Draw that line!
			//------------------------------------------------------------
			var path = self.paper.path([ "M", self.options['padding'], y, "L", self.width + self.options['padding'], y ]);
			path.attr({ 
				stroke: self.options['line_color'],
				"stroke-width": .5 
			});
			
			i++;
		}
	}
	
	/**
	 * Label barfly's value reference lines.
	 */
	barfly.prototype.drawLineLabels = function() {
		var self = this;
		
		//------------------------------------------------------------
		//	Label that line
		//------------------------------------------------------------
		var i = 1;
		var height = self.barHeightMax;
		var offset = self.options['label_lines_font_size']/2;
		while ( i < self.totalLines ) {
			var label = i*self.inc;
			var y =	 height - i*self.lineSpacer - offset + self.options['padding'];
			var text = self.paper.text( self.options['padding'], y, label );
			text.attr({ 
				'text-anchor': 'start',
				'font-size': self.options['label_lines_font_size'],
				'fill': self.options['line_color']
			});
			
			i++;
		}
	}
	
	/**
	 * Label the bars.
	 */
	barfly.prototype.drawBarLabels = function() {
		var self = this;
		
		var i = 0;
		for ( var label in self.dataset ) {
			var x = i*self.barWidth + ( self.barWidth/2 ) + self.startX;
			var offset = self.options['label_bars_font_size']/2 - self.options['padding'];
			var y = self.height - offset;
			var text = self.paper.text( x, y, label );
			text.attr({
				'font-size': self.options['label_bars_font_size'],
				'fill': self.options['label_bars_color']
			});
			i++;
		}
	}
	
	/**
	 * Return theme options during initialization.
	 *
	 * @param {string} _name The name of the theme.
	 */
	barfly.prototype.theme = function( _name ) {
		var self = this;
		
		//------------------------------------------------------------
		//	Check if -min is passed.  If so no labelling
		//------------------------------------------------------------
		var theme = {};
		var minCheck = _name.substr( _name.length-4 );
		if ( minCheck == '-min' ) {
			theme = {
				label_bars: false,
				label_lines: false
			};
			_name = _name.replace( '-min', '' );
		}
		
		//------------------------------------------------------------
		//	Pick a theme.
		//------------------------------------------------------------
		switch ( _name ) {
			
			//------------------------------------------------------------
			// fruit-stripe
			//------------------------------------------------------------
			case 'fruit-stripe':
				var add = {
					bar_palette: [ '#197F21', '#E2DF24', '#FC9D0F', '#E31038' ]
				};
				return $.extend( add, theme );
			
			//------------------------------------------------------------
			// high-contrast
			//------------------------------------------------------------
			case 'high-contrast':
				var add = {
					bar_palette: [ '#FF095F', '#0B95F0', '#0DFA21', '#F8EF07', '#F89407' ],
					bg_color: [ '#000' ],
					label_lines_font_size: 14,
					label_lines_font_color: '#DDD',
					label_bars_font_size: 12,
					label_bars_color: '#DDD',
					line_color: '#DDD',
					padding: 10
				};
				return $.extend( add, theme );
			
			//------------------------------------------------------------
			// spring-afternoon
			//------------------------------------------------------------
			case 'spring-afternoon':
				var add = {
					bar_palette: [ '#E0508E', '#ECF3E1', '#A5EFDE', '#507E73', '#533E79' ]
				};
				return $.extend( add, theme );
			
			//------------------------------------------------------------
			// outdoorsman
			//------------------------------------------------------------
			case 'outdoorsman':
				var add = {
					bar_palette: [ '#133423', '#B4A750', '#3D825F', '#998E44', '#63A985' ]
				};
				return $.extend( add, theme );
			
			//------------------------------------------------------------
			// kindergarten
			//------------------------------------------------------------
			case 'kindergarten':
				var add = {
					bar_palette: [ '#8C3F8C', '#F2D826', '#F29926', '#3F9926', '#3F99BF' ]
				};
				return $.extend( add, theme );
			
			//------------------------------------------------------------
			// grayscale
			//------------------------------------------------------------
			default:
				return theme;
		}
	}
	
	/**
	 * Round up to the closest whole number that has an single integer 
	 * leading digit followed by zeros.	 
	 * Ex. 889 -> 900, 21 -> 30, 13445 -> 20000
	 *
	 * @param {int} _n An integer
	 */
	barfly.prototype.closestZeroes = function( _n ) {
		//------------------------------------------------------------
		//	Count the number of digits.
		//------------------------------------------------------------
		var countA = _n.toString().length;
		var sub = Math.pow( 10, countA );
		var close = sub - _n;
		var countB = close.toString().length;
		_n = parseInt( _n );
		if ( countA == countB ) {
			return _n + parseInt( close.toString().slice( 1, countA ) );
		}
		return _n + close;
	}

	//----------------
	//	Extend JQuery 
	//----------------
	jQuery(document).ready( function($) {
		jQuery.fn.barfly = function( options ) {
			var id = jQuery(this).selector;
			return this.each( function() {
				jQuery.data( this, id, new barfly( this, options, id ) );
			});
		};
	})
})(jQuery);
