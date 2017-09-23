#!/bin/bash -v

brew cask install sublime-text

DOTFILES=~/.dotfiles/Sublime\ Text\ 3
CONFIG=~/Library/Application\ Support/Sublime\ Text\ 3/Packages

mkdir -p "$CONFIG"

ln -s "$DOTFILES/Packages/User" "$CONFIG"

sudo gem install fastri
sudo gem install rcodetools
