Template.AdminFeaturedPartups.onCreated(function() {
    this.subscribe('partups.public');
    this.partupSelection = new ReactiveVar();
    this.submitting = new ReactiveVar(false);
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.AdminFeaturedPartups.helpers({
    partups: function() {
        return Partups.find({});
    },
    featuredPartups: function() {
        return Partups.find({'featured.active': true});
    },
    isFeatured: function() {
        return !!this.featured && !!this.featured.active;
    },

    submitting: function() {
        return Template.instance().submitting.get();
    },
    schema: Partup.schemas.forms.featurePartup,

    // Autocomplete field
    partupSelectionReactiveVar: function() {
        return Template.instance().partupSelection;
    },
    partupFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-partups-form-partup-placeholder');
    },
    commentFieldPlaceholder: function() {
        return __('pages-modal-admin-featured-partups-form-comment-placeholder');
    },
    partupLabel: function() {
        return function(partup) {
            return partup.name;
        };
    },
    partupFormvalue: function() {
        return function(partup) {
            return partup._id;
        };
    },
    partupQuery: function() {
        return function(query, sync, async) {
            Meteor.call('partups.autocomplete', query, '', function(error, partups) {
                lodash.each(partups, function(p) {
                    p.value = p.name; // what to show in the autocomplete list
                });
                async(partups);
            });
        };
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.AdminFeaturedPartups.events({
    'click [data-unset-featured]': function(event, template) {
        Meteor.call('partups.feature', event.currentTarget.dataset.partupId, {active: false}, function(err) {
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
AutoForm.addHooks(null, {
    onSubmit: function(doc) {
        var self = this;
        self.event.preventDefault();
        var template = self.template.parent();
        template.submitting.set(true);
        var partupId = template.partupSelection.curValue._id;

        Meteor.call('partups.feature', partupId, doc, function(error) {
            if (error) return console.error(error);
            template.submitting.set(false);
            AutoForm.resetForm(self.formId);

            self.done();
        });

        return false;
    }
});
