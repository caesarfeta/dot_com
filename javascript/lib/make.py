import subprocess
fs = [];
out = ''
for f in fs:
	code = open( f, "r")
	out = out + code.read() + "\n"
	
outFile = open( "ajt_plugins.js", "w" )