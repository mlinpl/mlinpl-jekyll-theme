#!/usr/bin/env bash

ROOT_DIR=$( realpath $( dirname "${BASH_SOURCE[0]}" ) )/..

optimize_images () {
    directory=$1
    size=$2
    format=$3
    quality=$4
    output_directory="${1}-${2}"
    
    rm -rf $output_directory
    cp -r $directory $output_directory
    cd $output_directory
    mogrify -resize ${size}^ -gravity Center -extent ${size} -format ${format} -quality ${quality} *
    rm -f *.jpg *.jpeg *.png *.gif
}

# Optimize images of organizers
optimize_images ${ROOT_DIR}/images/organizers 150x150 webp 85

# Optimize images of speakers
optimize_images ${ROOT_DIR}/images/speakers 300x300 webp 85
