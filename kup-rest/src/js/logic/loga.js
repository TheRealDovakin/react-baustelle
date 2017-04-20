const oracledb = require('oracledb'),
      oracleDbConfig = require('../../../../dbconfig.js');

function doRelease(connection){
  connection.close(
    function(err) {
      if (err) {
        return logger.error(err.message);
      }
    }
  );
}

function getDataFromLoga(){
  return new Promise((resolve, reject) => {
    oracledb.getConnection(
      {
        user          : oracleDbConfig.name,
        password      : oracleDbConfig.pw,
        connectString : oracleDbConfig.qstring,
      },
      function(err, connection)  {
        if (err) {
          logger.error(err.message);
          return reject(err);
        }
        connection.execute(
          "select * from kp_einstellung_workflow",
          function(err, result)  {
            if (err) {
              logger.error(err.message);
              doRelease(connection);
              return reject(err);
            }
            doRelease(connection);
            return resolve(result.rows);
          }
        );
      }
    );
  });
}

module.exports = {
  getDataFromLoga: getDataFromLoga,
}
