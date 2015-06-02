/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_create.helpers({
    partupId: function() {
        return Session.get('partials.start-partup.current-partup');
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_create.events({
    'click [data-skip]': function(evt) {
        evt.preventDefault();
        var currentPartup = Session.get('partials.start-partup.current-partup');

        switch (Router.current().route.getName()) {

            case 'start':
                Router.go('start-activities', {_id:currentPartup});
                break;
            case 'start-activities':
                Router.go('start-promote', {_id:currentPartup});
                break;
            case 'start-promote':
                Session.set('partials.start-partup.current-partup', undefined);
                Router.go('partup-detail', {_id:currentPartup});
                break;
        }
    }
});
