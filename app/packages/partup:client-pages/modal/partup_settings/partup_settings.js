Template.modal_partup_settings.onCreated(function() {
    this.subscribe('partups.metadata', this.data.partupId);
    this.submitting = new ReactiveVar(false);
});

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
    },
    submitting: function() {
        return Template.instance().submitting.get();
    }
});

Template.modal_partup_settings.events({
    'click [data-closepage]': function eventClickClosePage (event, template) {
        event.preventDefault();
        Partup.client.intent.return('partup-settings');
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

            var template = self.template.parent().parent();
            var submitBtn = template.find('[type=submit]');
            template.submitting.set(true);

            updatePartup(partup._id, insertDoc, function(partupId) {
                template.submitting.set(false);
                Partup.client.intent.return('partup-settings', {}, function() {
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
