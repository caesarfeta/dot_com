//------------------------------------------------------------
// Stuff to investigate.
//------------------------------------------------------------
// semi-Thue grammar
// Chomsky hierarchy
// L-systems are now commonly known as parametric L systems.
// G = ( V, w, P )

/*
 * {array} The rules of the L-System.
 * An array of strings.
 */
rules = [];

/*
 * {int} The total number of iterations the system will undergo.
 */
iter = 0;

/*
 * {float} The angle.
 */
angle = 0;

/*
 * {string} The starting state of the L-System
 */
axiom = ''

/*
 * {int}  The current iteration.
 */
i = 0;

construct( _iter, _angle, _axiom ) {
	this.iter = _iter;
	this.angle = _angle;
	this.axiom = _axiom;
	for ( var i=3, i<arguments.length; i++ ) {
		this.rules[i-3] = arguments[i];
	}
}
// construct( 10, 90, "--F", "F=F+F-F", "F=F+F+F" );

next();
draw();
rotate();
toText();
test();

