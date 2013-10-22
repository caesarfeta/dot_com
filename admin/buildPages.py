#buildPages.py

import buildLib
import buildPage
		
# Get the list of published stories
def build():
	pages = buildLib.published()
	for page in pages:
		page = "../" + page
		buildPage.build( page )

build()