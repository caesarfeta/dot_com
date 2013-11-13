/**
 * @author AdamTavares / http://adamtavares.com
*/
var LSYS = LSYS || { REVISION: '1' }
LSYS.Sys = function( _iter, _angle, _start ) {

	this.iter = _iter;      	// {int} The total number of iterations.
	this.angle = _angle;     	// {float} The angle.
	this.start = _start;    	// {string} The starting state
	this.rules = {};    		// {object} The rules of the L-System. 
	
	//------------------------------------------------------------
	//  Generated by the program
	//------------------------------------------------------------
	this.n = 0;         		// {int}  The current iteration.
	this.output = this.start;	// {string} The string which becomes a output with the help of a renderer
	
	//------------------------------------------------------------
	//  Everything after the 3rd parameter is a rule
	//------------------------------------------------------------
	for ( var i=3; i<arguments.length; i++ ) {
		var map = arguments[i].split('=');
		this.rules[map[0]] = map[1];
	}
		
	return {
		
		/**
		 *	Run the system the specified # of times i.e. this.iter
		 */
		go: function() {
			while( this.n < this.iter ) {
				this.next();
				this.n++;
			}
		},
		
		/**
		 *  Apply the next rule
		 */
		next: function() {
			//------------------------------------------------------------
			//  Apply next rule
			//------------------------------------------------------------
			var chars = this.output.split('');
			for ( var i in chars ) {
				if ( chars[i] in this.rules ) {
					chars[i] = this.rules[ chars[i] ];
				}
			}
			this.output = chars.join('');
		},
		
		draw: function( _renderer, _technique ) {
			//------------------------------------------------------------
			//  TODO: check to see if renderer is valid...
			//------------------------------------------------------------
			_renderer.draw( this.output, this.angle );
		},
		
		//------------------------------------------------------------
		//  Expose variables you'll need
		//------------------------------------------------------------
		n: this.n,
		rules: this.rules,
		iter: this.iter,
		output: this.output,
		angle: this.angle
	}
}



LSYS.Renderer = function( _canvasId ) {
	this.canvas = document.getElementById( _canvasId );
	this.constants = {
		'+': 1, // counter clockwise
		'-': 1, // clockwise
		'[': 1, // push
		']': 1, // pop
		'C': 1, // color
	};
}

//------------------------------------------------------------
//  Some handy math functions
//------------------------------------------------------------
Math.toRad = function( _degrees ) {
	return _degrees*Math.PI / 180;
}

Math.toCart = function( _radius, _angle ) {
	return [ _radius*Math.cos( _angle ), _radius * Math.sin( _angle ) ];
}



//------------------------------------------------------------
//  2D renderer class
//------------------------------------------------------------
LSYS.TwoD = function( _canvasId ){
	LSYS.Renderer.call( this, _canvasId );
	this.ctx = this.canvas.getContext('2d');
	
	return {
		draw: function( _input, _angle ) {
			
			//------------------------------------------------------------
			//  Get the coordinates with unit distance
			//------------------------------------------------------------
			var angle = _angle;
			var coords = [];
			coords.push( [0,0] );
			var chars = _input.split('');
			for ( var i in chars ) {
				if ( chars[i] in this.constants ) {
					var last = coords[ coords.length-1 ];
					var next = Math.toCart( 1, Math.toRad( angle ) );
					var x = last[0] + next[0];
					var y = last[1] + next[1];
					coords.push( [x,y] );
				}
				else {
					switch ( chars[i] ) {
						case '+':
							angle += angle;
							break;
						case '-':
							angle -= angle;
							break;
					}
				}
			}
			
			//------------------------------------------------------------
			//  Draw the thing to the canvas
			//------------------------------------------------------------
			this.ctx.moveTo( coords[0][0], coords[0][1] );
			var i = 0;
			while ( i < coords.length ) {
				this.ctx.lineTo( coords[i][0], coords[i][1] );
				i++;
			}
			this.ctx.stroke();
			
		},
		constants: this.constants,
		ctx: this.ctx
	}
}
LSYS.TwoD.prototype = Object.create( LSYS.Renderer.prototype );



//------------------------------------------------------------
//  3D renderer class
//------------------------------------------------------------
LSYS.ThreeD = function(){
	return {
		draw: function( _input, _angle ) {}
	}
}
LSYS.ThreeD.prototype = Object.create( LSYS.Renderer.prototype );

//------------------------------------------------------------
// Stuff to investigate.
//------------------------------------------------------------
// semi-Thue grammar
// Chomsky hierarchy
// L-systems are now commonly known as parametric L systems.
// G = ( V, w, P )