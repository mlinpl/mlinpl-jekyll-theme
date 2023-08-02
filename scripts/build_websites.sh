#!/usr/bin/env bash

ROOT_DIR=$( realpath $( dirname "${BASH_SOURCE[0]}" ) )/..


copy_all () {
    website=$1
    url=$2

    mkdir -p builds/${website}
    cp _config_${website}.yml builds/${website}/_config.yml
    sed -i '' 's/\/www-dev//g' builds/${website}/_config.yml
    sed -i '' "s/https:\/\/mlinpl.github.io/https:\/\/${url}/g" builds/${website}/_config.yml
    cp ${website}.html builds/${website}/index.html
    cp -r _includes builds/${website}/_includes
    cp -r _layouts builds/${website}/_layouts
    cp -r _data builds/${website}/_data
    cp -r images builds/${website}/images
    cp -r libs builds/${website}/libs
    cp 404.html builds/${website}/
    cp bundle.js builds/${website}/
    cp style.css builds/${website}/
    cp Gemfile builds/${website}/
    cp Gemfile.lock builds/${website}/
    cp *.html builds/${website}/
    cp *.md builds/${website}/
    rm builds/${website}/README.md

    for file in ${website}-*.md ; do
        mv "$file" "${file#*-}"
    done

    for file in ${website}-*.html ; do
        mv "$file" "${file#*-}"
    done
}

# Clear old buils
rm -rf builds

# Build MLSS website
cd ${ROOT_DIR}

copy_all mlss mlss2023.mlinpl.org

cd builds/mlss
rm _layouts/conference.html
rm conference-*.md
rm -r _includes/conference

# Build Conference
cd ${ROOT_DIR}

copy_all conference conference2023.mlinpl.org

cd builds/conference
rm _layouts/mlss.html
rm -r _includes/mlss
rm mlss-*.md
rm _data/mlss-*.yml
rm -rf _images/mlss-*
