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
    GLOBIGNORE="*.svg"
    #mogrify -resize ${size}^ -gravity Center -extent ${size} -format ${format} -quality ${quality} *
    mogrify -adaptive-resize ${size}\> -format ${format} -quality ${quality} *
    rm -f *.jpg *.jpeg *.png *.gif
    unset GLOBIGNORE
}

# Optimize images of organizers and scientific board
optimize_images ${ROOT_DIR}/images/organizers 300x300 webp 90
optimize_images ${ROOT_DIR}/images/scientific-board 300x300 webp 90

# Optimize images of speakers
optimize_images ${ROOT_DIR}/images/speakers-2023 600x600 webp 90
optimize_images ${ROOT_DIR}/images/previous-speakers 600x600 webp 90
optimize_images ${ROOT_DIR}/images/speakers-mlss-2023 600x600 webp 90
optimize_images ${ROOT_DIR}/images/speakers-mlss-2022 600x600 webp 90

# Optimize sponsors and partners logos
optimize_images ${ROOT_DIR}/images/partners-logos 600x600 webp 90
optimize_images ${ROOT_DIR}/images/previous-sponsors 300x300 webp 90

# Optimize AI-generated images
optimize_images ${ROOT_DIR}/images/ai-generated 800x800 webp 90
