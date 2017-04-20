const   admins = require('../../../../admins'),
        jwt = require('jsonwebtoken'),
        jwtConf = require('../../../../jwtconfig'),
        ldap = require('ldapjs'),
        LdapAuth = require('ldapauth-fork'),
        ldapConf = require('../../../../ldapconfig')
;

function authenticate(req, res, logger){
  var options = {
    url: ldapConf.url,
    bindDn: ldapConf.dn,
    bindCredentials: ldapConf.pw,
    searchBase: 'ou=IT,ou=User,ou=Zentrale,dc=kiebackpeter,dc=kup',
    searchFilter: '(mail='+req.body.name+')',
    reconnect: true,
  };
  var auth = new LdapAuth(options);
  auth.on('error', function (err) {
    logger.error('LdapAuth: ', err);
  });
  auth.authenticate(req.body.name, req.body.password, function(err, user) {
    if(err){
      logger.error(err);
      res.status(401).send('unautherized: ' + err);
      return;
    }
    var isAdmin = _.contains(admins, user.employeeNumber);
    console.log(isAdmin);
    var tInfo = {
      name: user.name,
      access: true,
      admin: isAdmin,
    };
    var secret = new Buffer(jwtConf.encodeString, 'base64');
    var token = jwt.sign(tInfo, secret, { expiresIn: jwtConf.expire });
    res.status(200);
    res.json({
      success: true,
      displayName: user.name,
      message: 'hier dein token',
      token: token,
    });
  });
  auth.close(function(err) {
    if(err) logger.error('ldapAuth on close error '+err);
  });
}

function getPersonFromLdap(req, res, logger){
  var x = res;
  var client = ldap.createClient({
    url: ldapConf.url,
    reconnect: true,
  });
  client.bind(ldapConf.dn, ldapConf.pw, function(err) {
    if(err) logger.error(err);
  });
  var opts = {
    filter: '(employeeNumber='+req.params.nr+')',
    scope: 'sub',
    attributes: ['name', 'mail', 'title', 'employeeNumber', 'department', 'l'],
  };
  client.on('error', function(err) {
    logger.info('LDAP connection failed, but fear not, it will reconnect OK');
    logger.trace(err);
  });
  client.search('ou=IT,ou=User,ou=Zentrale,dc=kiebackpeter,dc=kup', opts, function(err, res) {
    if(err) logger.info(err);
    function myLdapAw(){
      return new Promise((reject, resolve) => {
        res.on('searchEntry', function(entry) {
          x.json(entry.object);
          return resolve('');
        })
        res.on('searchReference', function(referral) {
          return resolve('');
        })
        res.on('error', function(err) {
          x.status(400);
          x.json(err.message);
          return resolve('');
        });
      });
    }
    myLdapAw().then(y => {
      client.unbind(function(err) {
        if(err) logger.info(err);
      });
      client.destroy();
    });
  });
}

module.exports = {
  authenticate: authenticate,
  getPersonFromLdap: getPersonFromLdap,
}
