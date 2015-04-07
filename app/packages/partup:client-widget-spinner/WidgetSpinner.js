
Template.WidgetSpinner.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions, {

  }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};
Template.WidgetSpinnerInverted.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions,{
        color: '#fff'
    }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};

Template.WidgetSpinnerLarge.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions,{
        length: 8,
        width: 3,
        radius: 12
    }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};


Template.WidgetSpinner.destroyed = function () {
  this.spinner && this.spinner.stop();
};
Template.WidgetSpinnerInverted.destroyed = function () {
  this.spinner && this.spinner.stop();
};
Template.WidgetSpinnerLarge.destroyed = function () {
  this.spinner && this.spinner.stop();
};