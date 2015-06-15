Template.modal_partup_settings.helpers({
    currentPartup: function() {
        return Partups.findOne({_id: this.partupId});
    },
    isRemovableByUser: function() {
        var partup = Partups.findOne({_id: this.partupId});
        if (!partup) return false;

        var user = Meteor.user();
        if (!user) return false;

        return partup.isRemovableBy(user);
    }
});

Template.modal_partup_settings.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Partup.client.intent.executeIntentCallback('partup-settings');
    },
    'click [data-remove]': function(event, template) {
        Meteor.call('partups.remove', template.data.partupId, function(error) {
            if (error) {
                Partup.client.notify.error(error.reason);
            } else {
                Router.go('discover');
            }
        });
    },
});

var updatePartup = function(partupId, insertDoc, callback) {
    Meteor.call('partups.update', partupId, insertDoc, function(error, res) {
        if (error && error.reason) {
            Partup.client.notify.error(error.reason);
            AutoForm.validateForm(self.formId);
            self.done(new Error(error.message));
            return;
        }

        callback(partupId);
    });
};

AutoForm.hooks({
    editPartupForm: {
        onSubmit: function(insertDoc) {
            var self = this;
            var partup = this.template.parent().data.currentPartup;

            updatePartup(partup._id, insertDoc, function(partupId) {
                Partup.client.intent.executeIntentCallback('partup-settings', {}, function() {
                    Router.go('partup', {
                        _id: partupId
                    });
                });
            });

            this.event.preventDefault();
            return false;
        }
    }
});
