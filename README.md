# dot com

### Requirements
* Python 2.6+
* Jinja2-2.7.1 ( included )
* Markdown-2.3.1 ( included )
* Foundation 3.2.5 ( included )

### Installation
	./install.sh

### GIT Submodules
* To see Submodules
	* cat .gitmodules
* To update Submodules
	* git submodule init
	* git submodule update
* To add a Submodule
	* git submodule add git@host:project /path/to/project

### What it does.
This project is my personal website.
It's a database free blogging system.
It uses JSON and Markdown files to store content.
A couple of Python scripts and Jinja2 templates take the JSON and Markdown and builds the HTML files that are "the site."
The site's visual aesthetic is simple and book-like.
There are three types of content.

* Images with captions
* Fullscreen Javascript demoes
* And "Stories" which is text interspersed with static images and Javascript drawings and demoes.

Content is categorized by keyword.
Home page previews can be filtered using these keywords.

### Important Files and Directories
* build/ - Holds the Python build scripts.
		   They take project content files, process them through templates, and "build" the site.
	* build/templates - The templates files used by the Python build scripts.
	* build/home.conf - Stores the list of projects that will be "built" and listed on the homepage.
	* build/src - Third party libraries used by the build scripts.
* cartoon/ - Cartoon project content directory.
* story/ - Story project content directory.
* code/ - Code project content directory.
* img/ - Commonly used images.
* css/site.css - Site wide CSS.
* javascript/ - All my custom javascript.
	* javascript/site.js - Site wide Javascript.
	* javascript/lib - Custom Javascript libraries that are not project specific.
	* javascript/lib/make.py - Holds the list of Javascript files that will be concatenated and minified to create javascript/lib/lib.js and javascript/lib/lib.min.js
	* javascript/lib/lib.min.js - All my custom Javascript that every page loads.  
								  It supplies easy access to frequently used Javascript libraries and plug-ins.
* third\_party/ - All third party Javascript libraries.

### Building
#### Explanation of the build scripts
* build/build.sh - Builds all projects listed in build/home.conf.
* build/buildPage.py ../type/project - Build a specific project's HTML.