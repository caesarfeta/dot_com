#!/bin/bash
python make.py
closure-compiler-cli/closure_compiler_cli.py --level=simple --file=lib.js > lib.min.js