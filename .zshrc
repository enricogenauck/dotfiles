# setup git completion amongst other stuff
autoload -U compinit && compinit

source ~/.profile

for config_file (~/.dotfiles/zsh/*.zsh) source $config_file

test -e "${HOME}/.iterm2_shell_integration.zsh" && source "${HOME}/.iterm2_shell_integration.zsh"
