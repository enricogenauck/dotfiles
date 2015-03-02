#!/bin/zsh

IMAGE="$HOME/.dotfiles/themes/wallpaper.jpg"
COMMAND="tell application \"Finder\" to set desktop picture to POSIX file \"$IMAGE\""

osascript -e $COMMAND
