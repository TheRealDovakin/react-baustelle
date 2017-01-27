/**
 * @author Kasper Nadrajkowski
 * this class contains utility functions for code duplication
 */
module.exports = {

  /**
  * this class contains utility functions for code duplication
   * @param {Date} date     date to be formatted
   * @return {String}      formatted date
   */
  getDateAsString: function(date){
    var date = new Date(date);
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return day+"."+month+"."+year;
  },

  getDateAndTimeAsString: function(date){
    var date = new Date(date);
    var minute = date.getMinutes();
    var hour = date. getHours();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return hour+":"+minute+" "+day+"."+month+"."+year;
  },

  getExactDateAndTimeAsString: function(date){
    var date = new Date(date);
    var second = date.getSeconds();
    var minute = date.getMinutes();
    var hour = date. getHours();
    var day = date.getDate();
    var month = date.getMonth()+1;
    var year = date.getFullYear();
    return hour+":"+minute+":"+second+" "+day+"."+month+"."+year;
  },
}
