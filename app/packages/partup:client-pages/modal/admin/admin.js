Template.modal_admin.onCreated(function() {
    this.subscribe('users.admin_all');
});

Template.modal_admin.helpers({
    //
});

Template.modal_admin.events({
    'click [data-closepage]': function(event, template) {
        event.preventDefault();

        Intent.return('discover', {
            fallback_route: {
                name: 'discover'
            }
        });
    }
});

