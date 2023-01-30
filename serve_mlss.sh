#!/usr/bin/bash
cp _config.yml _config.yml.bak
cp _config_mlss.yml _config.yml
cp mlss.html index.html
bundle exec jekyll serve --livereload