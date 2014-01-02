#!/bin/bash
STAGE_DIR="/var/www/stage/dot_com"
PUB_DIR="/var/www/pub/dot_com"
FTP_URL=""
FTP_USER=""
FTP_PASS=""
FTP_DIR=""

# Build Staging Directory
mkdir -p $STAGE_DIR
rsync -avz \
	--exclude 'build' \
	--exclude '*.sh' \
	--exclude '.git*' \
	--exclude '*.conf' \
	--exclude '*.py' \
	--exclude '*.md' \
	--exclude 'javascript/lib/closure-compiler-cli' \
	--exclude 'third_party/three.js/docs' \
	--exclude 'third_party/three.js/examples' \
	. $STAGE_DIR

# Check Pub Directory
if [ ! -d "$PUB_DIR" ]; then
	mkdir -p $PUB_DIR
fi

# Compare the Contents