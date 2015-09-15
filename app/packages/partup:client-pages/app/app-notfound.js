Template.app_notfound.helpers({
    type: function() {
        return Iron.controller().state.get('type');
    },
    data: function() {
        return Iron.controller().state.get('data');
    }
});
