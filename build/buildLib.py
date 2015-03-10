#buildLib.py

from jinja2 import Template
import codecs
import re
import markdown
import json
import os
import pprint

pp = pprint.PrettyPrinter(indent=4)

def published():
	f = codecs.open( "home.conf", "r", "utf-8" )
	stories = f.read().splitlines()
	f.close()
	return stories

def writeToFile( _file, _text ):
	f = codecs.open( _file, "w", "utf-8" )
	f.write( _text )
	f.close()

def loadTemplate( _temp ):
	f = codecs.open( "templates/" + _temp + ".html.tmpl", "r", "utf-8" )
	text = f.read()
	f.close()
	return text

def getFilePrefix( _path ):
    # Get the json file path
	dirs = os.path.split( _path )
	f = _path + "/" + dirs[ len( dirs ) - 1 ]
	return f

def mdFileToHtml( _file ):
    # Load markdown file and turn it into HTML
	f = codecs.open( _file, "r", "utf-8" )
	text = f.read()
	f.close()
	return markdown.markdown( text )
	
def jsonFileToPython( _file ):
    # Turn a json file into a python object
	f = codecs.open( _file, "r", "utf-8" )
	data = json.load( f )
	f.close();
	return data
	
def toJsonFile( _file, _data ):
    writeToFile( _file, json.dumps( _data ) )
	
def parseTemplate( _template, _file, _data ):
	# Load the template
	tempRaw = loadTemplate( _template )
	
	# Build a jinja template
	template = Template( tempRaw )
	
	# Double asterisk?
	# not necessary in Python 2.6.1
	text = template.render( _data )
	
	writeToFile( _file, text )

def stripHtml( _data ):
	p = re.compile( r"<.*?>" )
	return p.sub( "", _data )

def htmlToPreview( _html, _n ):
	_html = stripHtml( _html )
	words = _html.split( " " )
	return " ".join( words[:_n] ) + " ..."