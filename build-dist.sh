#!/bin/zsh
# Builds the upload-ready site into dist/site and dist/vexel-landing-dist.zip (from the committed master branch).
set -e
cd "$(dirname "$0")"
rm -rf dist/site dist/vexel-landing-dist.zip
mkdir -p dist/site
git archive master index.html assets site.webmanifest robots.txt | tar -x -C dist/site
(cd dist && zip -qr vexel-landing-dist.zip site)
echo "Built dist/site ($(find dist/site -type f | wc -l | tr -d ' ') files) and dist/vexel-landing-dist.zip"
