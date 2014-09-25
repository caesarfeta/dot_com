#buildHome.py

import buildLib
from time import gmtime, strftime
import os

def build():
	# Get the list of published stories
	pages = buildLib.published()
	
	# Get the preview snippets
	data = {}
	data["previews"] = []
	data["year"] = strftime( "%Y", gmtime() )
	
	# Get the analytics tracking code
	data["tracking"] = buildLib.loadTemplate( "gaTrackingCode" ).encode('utf8')
	
	ind = 1
	pn = 0;
	file = "../index.html";
	
	# More button
	data["more"] = '<a class="more" href="index1.html">++</a>'
	data["less"] = ""
	for page in pages:
		page = "../" + page + "/preview.html.snpt"
		f = open( page, "r" )
		data["previews"].append( f.read() )
		f.close()
		if ind%5==0:
			# Build the homepages
			if pn > 0:
				file="../index"+str(pn)+".html"
				if pn == 1:
					data["less"] = '<a class="less" href="index.html">--</a>'
				else:
					data["less"] = '<a class="less" href="index'+str(pn-1)+'.html">--</a>'
				data["more"] = '<a class="more" href="index'+str(pn+1)+'.html">++</a>'
			buildLib.parseTemplate( "index", file, data )
			data["previews"] = []
			pn += 1
		ind += 1
		if ind == len(pages)+1:
			file="../index"+str(pn)+".html"
			data["less"] = '<a class="less" href="index'+str(pn-1)+'.html">--</a>'
			data["more"] = ''
			buildLib.parseTemplate( "index", file, data )
build()