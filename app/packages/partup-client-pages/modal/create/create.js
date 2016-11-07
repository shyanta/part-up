Template.modal_create.onCreated(function() {
    var template = this;
    template.networkLoaded = new ReactiveVar(false);
    var networkSlug = template.data.networkSlug;
    template.networkSubscription = template.subscribe('networks.one', networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: networkSlug});
            if (!network) Router.pageNotFound('network');
            template.networkLoaded.set(true);
        }
    });
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.modal_create.helpers({
    partupId: function() {
        return Session.get('partials.create-partup.current-partup');
    },
    partup: function() {
        return Partups.findOne({_id: this.partupId});
    },
    networkLoaded: function() {
        return Template.instance().networkLoaded.get();
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.modal_create.events({
    'click [data-skip]': function(event, template) {
        event.preventDefault();

        var partup = template.data.partup;

        switch (Router.current().route.getName()) {

            case 'create':
                Router.go('create-activities', {_id: partup._id});
                break;
            case 'create-activities':
                Router.go('create-promote', {_id: partup._id});
                break;
            case 'create-promote':
                Session.set('partials.create-partup.current-partup', undefined);
                Router.go('partup', {slug: partup.slug});
                break;
        }
    }
});
