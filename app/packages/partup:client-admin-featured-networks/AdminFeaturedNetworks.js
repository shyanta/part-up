Template.AdminFeaturedNetworks.onCreated(function() {
    this.subscribe('networks.featured_all');
    this.networkSelection = new ReactiveVar();
    this.submitting = new ReactiveVar(false);
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.AdminFeaturedNetworks.helpers({
    featuredNetworks: function() {
        return Networks.findFeatured();
    },
    submitting: function() {
        return Template.instance().submitting.get();
    },
    schema: Partup.schemas.forms.featureNetwork,

    // Autocomplete field
    networkSelectionReactiveVar: function() {
        return Template.instance().networkSelection;
    },
    networkFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-networks-form-network-placeholder');
    },
    authorFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-networks-form-author-placeholder');
    },
    commentFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-networks-form-comment-placeholder');
    },
    jobTitleFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-networks-form-job-title-placeholder');
    },
    networkLabel: function() {
        return function(network) {
            return network.name;
        };
    },
    networkFormvalue: function() {
        return function(network) {
            return network._id;
        };
    },
    networkQuery: function() {
        return function(query, sync, async) {
            Meteor.call('networks.autocomplete', query, function(error, networks) {
                lodash.each(networks, function(p) {
                    p.value = p.name; // what to show in the autocomplete list
                });
                async(networks);
            });
        };
    },
    getQuoteAuthor: function() {
        return Meteor.users.findOne(this.featured.by_upper._id);
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.AdminFeaturedNetworks.events({
    'click [data-unset-featured]': function(event, template) {
        Meteor.call('networks.unfeature', event.currentTarget.dataset.networkId, function(err) {
            if (err) {
                Partup.client.notify.error(err.reason);
                return;
            }
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks('featureNetworkForm', {
    onSubmit: function(doc) {
        var self = this;
        self.event.preventDefault();

        var template = self.template.parent();
        template.submitting.set(true);
        var networkId = template.networkSelection.curValue._id;

        Meteor.call('networks.feature', networkId, doc, function(error) {
            if (error) return console.error(error);
            template.submitting.set(false);
            AutoForm.resetForm(self.formId);

            self.done();
        });

        return false;
    }
});
