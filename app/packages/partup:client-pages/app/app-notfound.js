Template.app_notfound.onCreated(function() {
});

Template.app_notfound.helpers({
    type: function() {
        var controller = Iron.controller();
        return controller.state.get('type');
    }
});
