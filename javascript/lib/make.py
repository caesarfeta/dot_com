import subprocess
fs = [
    "inf_img/inf_img.js"
];
out = ''
for f in fs:
	code = open( f, "r")
	out = out + code.read() + "\n"
	
outFile = open( "lib.js", "w" )
outFile.write( out )