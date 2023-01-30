#!/usr/bin/bash
cp _config.yml _config.yml.bak
cp _config_conference.yml _config.yml
bundle exec jekyll serve --livereload