/*
 * Date: formats date strings using Moment.js.
 * Could be easily adapted to other date-parsing libs.
 * 
 * Usage: 
 *  var self.dateGiven = ko.observable().extend({ date: "M/D/YY" });
 * 
 * If no format is provided, it defaults to calendar style, or "MM/DD/YY"
 * See valid formats here: http://momentjs.com/docs/#/parsing/string-format/ 
 */

ko.extenders.date = function(target, format) {

  var formattedDate = ko.computed({
    read: target,
    write: function(newValue) {
      if (newValue) {
        if (!format) {
          format = "L";
        }

        var current = target(),
          valueToWrite = moment(newValue).format(format);
        
        // If value to write is an invalid date or nonexistant, restore previous value
        if((valueToWrite.indexOf("NaN") !== -1) || !valueToWrite) {
          target.notifySubscribers(current);
        } else {
          // Only write the new value if it's different than the previous
          if(valueToWrite !== current) {
            target(valueToWrite);
          } else {
            if (newValue !== current) {
              // Force a notification if the converted date is the same, but the input value was different
              target.notifySubscribers(valueToWrite);
            }
          }
        }
      }
    }
  });

  formattedDate(target());

  return formattedDate;

};
