const moment = require('moment'),
      logUtils = require('../utils/logUtils');

function checkIfItemsSeen(res, logger, ItemModel){
  ItemModel.find(function(error, items){
    if (error) return logUtils.err(logger, res, error, 404);
    _.each(items, function(item){
      var createdAt = moment(item.createdAt);
      var now = moment();
      var diff = now.diff(createdAt);
      var time =  100 //m-sesonds
                  *60 //seconds
                  *60 //minutes
                  *24 //hours
                  *4; //days
      if(item.seen||diff<=time) return;
      ItemModel.findOneAndUpdate({ _id: item._id }, { spare: true },
      function(error){
        if(error) return logUtils.err(logger, res, error, 404);
        //HACK: can't set header here
        //(error: Can't set headers after they are sent)
        //executing just res.send() works
        else res.send();
      });
    });
  });
}

module.exports = {
  checkIfItemsSeen: checkIfItemsSeen,
}
