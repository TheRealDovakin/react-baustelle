alias run-all='run-mongo & run-production'
alias cd-kup-app='cd /srv/samba/share/kup-app'
alias cd-react='cd /srv/samba/share/kup-app/kup-client'
alias run-dev='cd /srv/samba/share/kup-app/kup-client/ && sudo npm run dev'
alias run-production='cd /srv/samba/share/kup-app/kup-client && sudo npm run production-build && sudo npm run production-server'
alias run-webpack='cd /srv/samba/share/kup-app/kup-client/src/ && webpack --w'
alias run-mongo='stop-mongo && start-mongo && cd /srv/samba/share/kup-app/kup-rest/src/db && node app.js'
alias ll='l -l'
alias backup-react='rsync -bru --exclude=node_modules /srv/samba/share/kup-app ~/.backups/$(date "+react-app-backup-%d-%m-%y")'
alias start-mongo='sudo service mongod start'
alias stop-mongo='sudo service mongod stop'
alias restart-mongo='sudo service mongod restart'
alias help-kasper='
echo "-------------------------------------------------------";
echo;
echo "          Kaspers list of aliases";
echo;
echo "cd-js             ->      cd to repo folder";
echo "run-react ->      run dev server";
echo "run-webpack       ->      run webpack --w in src folder of react app";
echo "run-mongo         ->      run mongo-rest-api";
echo "backup-react      ->      backup react-app with timestamp in ~/.backups";
echo "start-mongo       ->      start mongoDB service";
echo "stop-mongo        ->      stop mongoDB service";
echo "restart-mongo     ->      restart mongoDB service";
echo;
echo "-------------------------------------------------------";
echo
'
