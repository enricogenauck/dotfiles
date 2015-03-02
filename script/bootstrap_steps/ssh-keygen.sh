set -x

mkdir -p ~/.ssh
ssh-keygen -N "" -t rsa -f ~/.ssh/id_rsa -C "kontakt+$(hostname)@enricogenauck.de"
open -a TextEdit ~/.ssh/id_rsa.pub
