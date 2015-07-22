module.exports = function () {
  this.Before(function (done) {

    var client = this.client;
    var server = this.server;

    this.TestHelper = {
      navigateTo : function(url) {
        //
      }

    };

    done();

  });
};
