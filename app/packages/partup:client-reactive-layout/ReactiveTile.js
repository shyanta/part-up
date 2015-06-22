/**
 * Run onRendered callback when the template is rendered
 */
Template.ReactiveTile.onRendered(function() {
    var template = this;
    if (mout.lang.isFunction(this.data.onRendered)) {
        this.data.onRendered();
    }
});
