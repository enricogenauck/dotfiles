#!/bin/bash -v

brew cask install sublime-text3

DOTFILES=~/.dotfiles/Sublime\ Text\ 3
CONFIG=~/Library/Application\ Support/Sublime\ Text\ 3

mkdir -p "$CONFIG"

ln -s "$DOTFILES/Installed Packages" "$CONFIG/Installed Packages"
ln -s "$DOTFILES/Packages" "$CONFIG/Packages"
ln -s "$DOTFILES/Pristine Packages" "$CONFIG/Pristine Packages"

gem install rcodetools
