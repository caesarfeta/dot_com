#buildHome.py

import buildLib
from time import gmtime, strftime

def build():
	# Get the list of published stories
	pages = buildLib.published()
	
	# Get the preview snippets
	data = {}
	data["previews"] = []
	data["year"] = strftime( "%Y", gmtime() )
	
	# Get the analytics tracking code
	data["tracking"] = buildLib.loadTemplate( "gaTrackingCode" ).encode('utf8')
	
	for page in pages:
		page = "../" + page + "/preview.html.snpt"
		f = open( page, "r" )
		data["previews"].append( f.read() )
		f.close()
	
	# Build the homepage
	buildLib.parseTemplate( "index", "../index.html", data )

build()