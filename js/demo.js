function DemoViewModel() {
  var self = this;

  self.myBirthday = ko.observable("May 17, 1990").extend({ date: "M/D/YY" });
  self.dayOfTheWeek = ko.observable("May 17, 1990").extend({ date: "dddd" });
  self.userInputDate = ko.observable();
  self.formattedInputDate = ko.observable().extend({ date: "ddd, D MMM YYYY", throttle: 500 });

  self.userInputDate.subscribe(function(newValue) {
    return self.formattedInputDate(newValue);
  });
}

ko.applyBindings(new DemoViewModel());
