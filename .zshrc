# setup git completion amongst other stuff
autoload -U compinit && compinit

source ~/.profile

for config_file (~/.dotfiles/zsh/*.zsh) source $config_file
