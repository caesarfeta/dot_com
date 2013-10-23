#!/bin/bash
rsync -avz \
	--exclude 'build' \
	--exclude '*.sh' \
	--exclude '.git*' \
	--exclude '*.conf' \
	--exclude '*.py' \
	--exclude 'javascript/lib/closure-compiler-cli' \
	--exclude 'third_party/three.js/docs' \
	--exclude 'third_party/three.js/examples' \
	. $1