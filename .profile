export EDITOR="/usr/local/bin/subl -w"
export HISTCONTROL=ignoreboth:erasedups   # no duplicate entries
export PROMPT_COMMAND="history -a"        # update histfile after every command
export LC_CTYPE="utf-8"
export LANG="de_DE.UTF-8"
export PGDATA=/usr/local/var/postgres

[[ -s `brew --prefix`/etc/autojump.sh ]] && . `brew --prefix`/etc/autojump.sh

ssh-add &> /dev/null

source /Users/enrico.genauck/.rvm/scripts/rvm
