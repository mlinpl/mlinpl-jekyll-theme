#!/usr/bin/bash

rm -rf builds
cp _config.yml _config.yml.bak
cp _config_conference.yml _config.yml
cp conference.html index.html
bundle exec jekyll serve --livereload