# dot_com

### Requirements
* Python 2.6+
* Jinja2-2.7.1 ( included )
* Markdown-2.3.1 ( included )
* Foundation 3.2.5 ( included )

### Installation
	./install.sh

### Git Submodules
* To see Submodules
	* cat .gitmodules
* To update Submodules
	* git submodule update --init
* To add a Submodule
	* git submodule add git@host:project /path/you/choose

### What it does.
This project is my personal website.
Also, it's a database free blogging system.
I got sick of using HTML forms hooked up to a relational database to publish my work.
Most of those systems are big, sloppy, insecure and cumbersome.
If you know Unix and aren't afraid of using the command line a system like this one is much more elegant and flexible than other "Content Management Systems" a lot of people use for one-to-many day-to-day publishing aka "blogging".

It uses JSON and Markdown files to store content and configuration.
A couple of Python scripts and Jinja2 templates take the JSON and Markdown and build the HTML files that are "the site."

The site's visual aesthetic is simple and book-like.
Maximum accessibility and readability were design goals.
It's not a great layout for generating ad revenue but it makes most content beautiful to look at on most devices.

Speaking of content. I've defined 3 general types, which each get their own directory.

* cartoon -- Images with captions
* code -- Fullscreen Javascript demoes
* story -- "Stories" which is text interspersed with static images and Javascript drawings and demoes.

Content is categorized by keyword and the home page previews can be filtered using these keywords.

If you're like me and want a simple web publishing system you don't really have to grapple with and you don't want to forfeit control over layout and how your content will be used by say Google, Wordpress or [ insert Web behemoth here ] then "dot_com" might work for you.  All you have to do is delete my content in ./cartoon, ./story, and ./code, make your own, and run the build script in ./build.

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
* json/ - Holds static JSON files used by AJAX calls.
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