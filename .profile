export EDITOR="/usr/local/bin/subl -w"
export HISTCONTROL=ignoreboth:erasedups   # no duplicate entries
export PROMPT_COMMAND="history -a"        # update histfile after every command
export LC_CTYPE="utf-8"
export LANG=en_US.UTF-8
export LC_ALL="en_US.UTF-8"
export GOPATH="${HOME}/.go"
export GOROOT="$(brew --prefix golang)/libexec"
export PGDATA=/usr/local/var/postgres

[[ -s `brew --prefix`/etc/autojump.sh ]] && . `brew --prefix`/etc/autojump.sh

ssh-add &> /dev/null
