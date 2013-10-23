#buildPages.py

import buildLib
import buildPage
		
# Get the list of published stories
def build():
	pages = buildLib.published()
	i = 0
	for page in pages:
		page = "../" + page
		buildPage.build( page, i )
		i += 1

build()