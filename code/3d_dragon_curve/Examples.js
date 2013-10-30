LSYS.Examples = function() {
	this.examples = {
		"Heighway Dragon": [ 12, 90, "", "FX", "X=X+YF+", "Y=-FX-Y" ],
		"Koch Curve": [ 4, 90, "", "-F", "F=F+F-F-F+F" ],
		"Sierpinski Triangle - Curves": [ 7, 60, "", "A", "A=B-A-B", "B=A+B+A" ],
		"Sierpinski Triangle - Triangles": [ 6, 120, "", "F-G-G", "F=F-G+F+G-F", "G=GG" ],
		"Dragon Curve": [ 10, 90, "F", "FX", "X=X+YF", "Y=FX-Y" ],
		"Penrose Tiling": [ 5, 36, "6 7 8 9", "[7]++[7]++[7]++[7]++[7]", "6=81++91----71[-81----61]++", "7=+81--91[---61--71]+", "8=-61++71[+++81++91]-", "9=--81++++61[+91++++71]--71", "1=" ]
	}
}
LSYS.Examples.prototype.get = function( _name ) {
	return this.examples[ _name ];
}
LSYS.Examples.prototype.list = function() {
	var list = [];
	for ( shape in this.examples ) {
		list[] = shape;
	}
	return list;
}
LSYS.Example.prototype.log = function() {
	for ( shape in this.examples ) {
		console.log( shape + "\n" );
	}
}
