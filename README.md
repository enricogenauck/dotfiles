# enricogenauck/dotfiles
Setup my personal dotfiles and development environment for MacOS

## First steps
1. Install [XCode](https://itunes.apple.com/de/app/xcode/id497799835?mt=12&uo=4)
1. Run XCode and accept the license
1. Run ```git clone https://github.com/enricogenauck/dotfiles.git ~/.dotfiles```
1. Run ```script/bootstrap``` from ```~/.dotfiles``
1. Install from the App Store:
    - [MockSMTP](https://itunes.apple.com/de/app/mocksmtp/id423535515?mt=12&uo=4)
    - [Clarify 2](https://itunes.apple.com/de/app/clarify-2/id867687197?mt=12&uo=4)
    - [Classic Color Meter](https://itunes.apple.com/de/app/classic-color-meter/id451640037?mt=12&uo=4)
    - [Live Reload](https://itunes.apple.com/de/app/livereload/id482898991?mt=12&uo=4)
    - [Live Reload Extensions](http://help.livereload.com/kb/general-use/browser-extensions)
    - [Soulver](https://itunes.apple.com/de/app/soulver/id413965349?mt=12&uo=4)
    - [Dash (Docs & Snippets)](https://itunes.apple.com/de/app/dash-docs-snippets/id458034879?mt=12&uo=4)
    - Marked (only available for redownload)
    - [Forklift](https://itunes.apple.com/de/app/forklift-file-manager-ftp/id412448059?mt=12&uo=4)
    - [Pixelstick](https://itunes.apple.com/de/app/pixelstick/id415158530?mt=12&uo=4)
    - [The Unarchiver](https://itunes.apple.com/de/app/the-unarchiver/id425424353?mt=12&uo=4)

## iTerm Color Theme
Open iTerm 2, open Preferences, click on the "Profiles" (formerly Addresses, formerly Bookmarks) icon in the preferences toolbar, then select the "colors" tab. Click on the "load presets" and select "import...". Select the Solaris Light or Dark theme file.

You have now loaded the Solarized color presets into iTerm 2, but haven't yet applied them. To apply them, simply select an existing profile from the profile list window on the left, or create a new profile. Then select the Solarized Dark or Solarized Light preset from the "Load Presets" drop down.

## ZSH and Textmate Setup
    $ cd ~
    $ ln -s $DOTFILES/.zsh .
    $ ln -s $DOTFILES/.zsh_rc .
    $ ln -s $DOTFILES/.tm_properties .
