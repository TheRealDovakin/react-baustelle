/**
 * @author Kasper Nadrajkowski
 * this class contains utility functions for code duplication
 */
export default{

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
  }
}
