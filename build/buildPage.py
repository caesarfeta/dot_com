#buildPage.py

import buildLib
import os
import fnmatch
import re
import sys
#import pprint

#pp = pprint.PrettyPrinter(indent=4)

# Infer certain pieces of data
def inferData( _data, _file, _root ):
	# Infer the markdown file name
	mdFile = _file.replace( "json", "md" )
	_data["story"] = mdFile
	
	# Grab the year from the publish date
	m = re.search( r"\d+$", _data["publish_date"] )
	_data["year"] = m.group(0)
	
	# Path
	_data["path"] = _root.replace( "../", "" )
	return _data

def build( _path, _id=-1 ):
	# Get the json file path
	root = _path
	f = buildLib.getFilePrefix( _path )
	
	# Get the json metadata file
	json = f + ".json"
	data = buildLib.jsonFileToPython( json )
	
	# Infer certain pieces of data
	data = inferData( data, json, root )
	
	# Get the id to build the preview
	data["id"] = _id
	
	# Get the analytics tracking code
	data["tracking"] = buildLib.loadTemplate( "gaTrackingCode" ).encode('utf8')
	
	#pp.pprint( data )
	
	# Load the appropriate template
	if data["type"] == "cartoon":
		# Build the cartoon file
		outputFile = root + "/index.html"
		buildLib.parseTemplate( "cartoon", outputFile, data )
		
		# Build the preview for the hompage
		outputFile = root + "/preview.html.snpt"
		buildLib.parseTemplate( "cartoonPreview", outputFile, data )
		
	elif data["type"] == "story":
		# Get the markdown file
		mdFile = data["story"]
		data["html"] = buildLib.mdFileToHtml( mdFile )
		
		# Build the story file
		outputFile = root + "/index.html"
		buildLib.parseTemplate( "story", outputFile, data )
		
		# Build the preview for the homepage
		outputFile = root + "/preview.html.snpt"
		data["preview"] = buildLib.htmlToPreview( data["html"], 45 )
		buildLib.parseTemplate( "storyPreview", outputFile, data )
		
	elif data["type"] == "code":
		# Build the code file
		outputFile = root + "/index.html"
		buildLib.parseTemplate( "code", outputFile, data )
		
		# Build the preview for the homepage
		outputFile = root + "/preview.html.snpt"
		buildLib.parseTemplate( "codePreview", outputFile, data )

# If a command line argument is passed
if len( sys.argv ) > 1:
	build( sys.argv[1] )