const childProcess = require('child_process'),
      features = require('../../../../features.js');

function getSendMailCommand(adress, subject, body){
  return "echo \""+body+"\" | mail -aFrom:epm@kieback-peter.de -s \""+subject+"\" "+adress;
}

function sendDataToAe(req, res, logger){

  var command = 'curl -v --cert /srv/samba/share/epm.pem --noproxy "*" -d "'
		+'{'
		+'\'person_name\':\''+req.body.person_name
		+'\', \'person_nr\':\''+req.body.person_nr
		+'\', \'short\':\''+req.body.short
		+'\', \'job\':\''+req.body.job
		+'\', \'department\':\''+req.body.department
		+'\', \'place\':\''+req.body.place
		+'\', \'adito\':\''+req.body.addAccounts
		+'\', \'baumanager\':\''+req.body.baumanager
		+'\'}'
		+'" https://gwr.itanw.kiebackpeter.kup/queue/entw/it-anw/epm/neuer_account.json';
	childProcess.exec(command);
	res.send('OK');
}
function sendMail(adress, subject, body, logger){
  const command = getSendMailCommand(adress, subject, body);
  logger.trace('Mail to: '+adress);
  childProcess.exec(command);
}


module.exports = {
  sendMail: sendMail,
	sendDataToAe: sendDataToAe,
}
