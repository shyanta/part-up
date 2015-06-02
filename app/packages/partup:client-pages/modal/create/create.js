/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_create.helpers({
    partupId: function() {
        return Session.get('partials.create-partup.current-partup');
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_create.events({
    'click [data-skip]': function(evt) {
        evt.preventDefault();
        var currentPartup = Session.get('partials.create-partup.current-partup');

        switch (Router.current().route.getName()) {

            case 'create':
                Router.go('create-activities', {_id:currentPartup});
                break;
            case 'create-activities':
                Router.go('create-promote', {_id:currentPartup});
                break;
            case 'create-promote':
                Session.set('partials.create-partup.current-partup', undefined);
                Router.go('partup', {_id:currentPartup});
                break;
        }
    }
});
