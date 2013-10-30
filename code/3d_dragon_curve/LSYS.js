/**
 * @author AdamTavares / http://adamtavares.com
*/
var LSYS = LSYS || { REVISION: '1' }

// ( 10, 90, "--F", "F=F+F-F", "F=F+F+F" );
LSYS.Sys = function( _iter, _angle, _axiom ) {
    
	this.rules = [];    // {array} The rules of the L-System. An array of strings.
	this.iter = 0;      // {int} The total number of iterations.
	this.angle = 0;     // {float} The angle.
	this.axiom = '';    // {string} The starting state
	i = 0;              // {int}  The current iteration.
	
	this.iter = _iter;
	this.angle = _angle;
	this.axiom = _axiom;
	//------------------------------------------------------------
	//  Everything after the 3rd parameter is a rule
	//------------------------------------------------------------
	for ( var i=3, i<arguments.length; i++ ) {
		this.rules[i-3] = arguments[i];
	}
}

LSYS.Sys.prototype.next = function(){};
LSYS.Sys.prototype.draw = function(){};
LSYS.Sys.prototype.rotate = function(){};
LSYS.Sys.prototype.toText = function(){};



//------------------------------------------------------------
// Stuff to investigate.
//------------------------------------------------------------
// semi-Thue grammar
// Chomsky hierarchy
// L-systems are now commonly known as parametric L systems.
// G = ( V, w, P )