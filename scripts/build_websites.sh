#!/usr/bin/env bash

ROOT_DIR=$( realpath $( dirname "${BASH_SOURCE[0]}" ) )/..


# Build MLSS website
cd ${ROOT_DIR}
rm -rf builds
mkdir -p builds/mlss
cp _config_mlss.yml builds/mlss/_config.yml
sed -i '' 's/\/www-dev//g' builds/mlss/_config.yml
sed -i '' 's/https:\/\/mlinpl.github.io/https:\/\/mlss2023.mlinpl.org/g' builds/mlss/_config.yml
cp mlss.html builds/mlss/index.html
cp -r _includes builds/mlss/_includes
cp -r _layouts builds/mlss/_layouts
cp -r _data builds/mlss/_data
cp -r images builds/mlss/images
cp -r libs builds/mlss/libs
cp *.md builds/mlss/

cd builds/mlss
rm _layouts/conference.html
rm conference-*.md
rm -r _includes/conference


# Build Conference
cd ${ROOT_DIR}
mkdir -p builds/conference
cp _config_conference.yml builds/conference/_config.yml
sed -i '' 's/\/www-dev//g' builds/conference/_config.yml
sed -i '' 's/https:\/\/mlinpl.github.io/https:\/\/conference2023.mlinpl.org/g' builds/conference/_config.yml
cp mlss.html builds/conference/index.html
cp -r _includes builds/conference/_includes
cp -r _layouts builds/conference/_layouts
cp -r _data builds/conference/_data
cp -r images builds/conference/images
cp -r libs builds/conference/libs
cp *.md builds/conference/

cd builds/conference
rm _layouts/mlss.html
rm -r _includes/mlss
rm mlss-*.md
rm _data/mlss-*.yml
