# store and share command history
HISTFILE=$HOME/.zhistory
HISTSIZE=1200
SAVEHIST=1000
setopt append_history
setopt share_history
setopt hist_ignore_all_dups
setopt extended_history

# complete current command with UP and DOWN
autoload -U history-search-end

zle -N history-beginning-search-backward-end history-search-end
zle -N history-beginning-search-forward-end history-search-end

bindkey "\e[A" history-beginning-search-backward-end
bindkey "\e[B" history-beginning-search-forward-end
