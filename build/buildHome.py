#buildHome.py

import buildLib

def build():
	# Get the list of published stories
	pages = buildLib.published()
	
	# Get the preview snippets
	data = {}
	data["previews"] = []
	for page in pages:
		page = "../" + page + "/preview.html.snpt"
		f = open( page, "r" )
		data["previews"].append( f.read() )
		f.close()
	
	# Build the homepage
	buildLib.parseTemplate( "index", "../index.html", data )

build()