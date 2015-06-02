
Template.Spinner.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions, {

  }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};
Template.SpinnerInverted.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions,{
        color: '#fff'
    }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};

Template.SpinnerLarge.rendered = function () {
  var options = _.extend(Partup.ui.spinner.defaultOptions,{
        length: 8,
        width: 3,
        radius: 12
    }, this.data);

  this.spinner = new Spinner(options);
  this.spinner.spin(this.firstNode);
};


Template.Spinner.destroyed = function () {
  this.spinner && this.spinner.stop();
};
Template.SpinnerInverted.destroyed = function () {
  this.spinner && this.spinner.stop();
};
Template.SpinnerLarge.destroyed = function () {
  this.spinner && this.spinner.stop();
};
