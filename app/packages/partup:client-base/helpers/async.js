Template.async.onCreated(function() {
    var tpl = this;

    tpl.rendering = new ReactiveVar(false);

    Meteor.setTimeout(function() {
        tpl.rendering.set(true);
        if (tpl.data && tpl.data.callback) tpl.data.callback();
    }, 1000);

});

Template.async.helpers({
    async: function() {
        return Template.instance().rendering.get();
    }
});
