#!/bin/bash

# Get the current directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Grab submodules
function gitSubmodules() {
	echo '# Installing GIT submodules'
	git submodule init
	git submodule update
}

# Install python dependencies
function pythonLibs() {
	echo '# Installing Python libraries'
	
	echo '# Installing Jinja2'
	cd $DIR/build/src/Jinja2-2.7.1
	python setup.py install
	cd $DIR
	rm -rf Jinja2.egg-info
	
	echo '# Installing Markdown'
	cd $DIR/build/src/Markdown-2.3.1
	python setup.py install
}

# Build Javascript libraries
function javascriptLibs() {
	echo '# Building Javascript libraries'
	cd $DIR/javascript/lib
	./build.sh
}

# Build pages
function buildSite() {
	echo 'Building site'
	cd $DIR/build
	./build.sh
}

# Build the application.
gitSubmodules
pythonLibs
javascriptLibs
buildSite