#!/bin/bash
STAGE_DIR="/var/www/stage/dot_com"
PUB_DIR="/var/www/pub/dot_com"
DIFF_DIR="/var/www/diff/dot_com"

function pause() {
	read -p "$*"
}

echo "--Building Stage Directory--"
mkdir -p $STAGE_DIR
rsync -avz \
	--exclude '.DS_Store' \
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

pause "Check http://127.0.0.1/stage/dot_com and if you like what you see press [Enter] to publish"

echo "--Checking Publish Directory--"
if [ ! -d "$PUB_DIR" ]; then
	mkdir -p $PUB_DIR
fi

echo "--Checking Diff Directory--"
if [ ! -d "$DIFF_DIR" ]; then
	mkdir -p $DIFF_DIR
fi

echo "--Comparing Stage and Publish Directory--"
rsync -rvcm --compare-dest=$PUB_DIR/ $STAGE_DIR/ $DIFF_DIR/

pause "Check ${DIFF_DIR} to see files that need to be copied over FTP.  After copying press [ENTER] to clean-up and update your publish directory"

echo "--Updating Publish Directory--"
rsync -avz $STAGE_DIR $PUBDIR

echo "--Cleaning Diff Directory--"
rm -rf $DIFF_DIR

echo "--DONE--"