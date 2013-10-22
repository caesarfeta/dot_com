#buildNav.py

import buildLib

def build():
	# Get the list of published stories
	pages = buildLib.published()
	
	output = {}
	output[ "order" ] = []
	for page in pages:
		relPage = "../" + page
		f = buildLib.getFilePrefix( relPage )
		
		# Get the json metadata file
		json = f + ".json"
		data = buildLib.jsonFileToPython( json )
		 
		# Get the data you need
		output[ page ] = {}
		output[ page ][ "title" ] = data[ "title" ]
		output[ page ][ "type" ] = data[ "type" ]
		output[ page ][ "keywords" ] = data[ "keywords" ]
		
		# Keep track of the sequence
		output[ "order" ].append( page )
	
	buildLib.toJsonFile( "../json/nav.json", output )

build()

