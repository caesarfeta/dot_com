# Install python dependencies
sudo python build/src/Jinja2-2.7.1/setup.py install
sudo python build/src/Markdown-2.3.1/setup.py install

# Grab submodules
git submodule init
git submodule update