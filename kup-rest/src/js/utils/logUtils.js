
function err(logger, res, string, status){
  logger.error(string);
  if(status) res.status(status);
  return res.send(string);
}

function myLog(logger, res, string, status){
  logger.log(string);
  //if(status) res.status(status);
  return res.send(string);
}

module.exports = {
  err: err,
  log: myLog,
}
