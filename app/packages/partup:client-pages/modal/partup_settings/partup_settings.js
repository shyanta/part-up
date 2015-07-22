Template.modal_partup_settings.onCreated(function() {
    this.subscribe('partups.one', this.data.partupId);
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
        Intent.return('partup-settings', {
            fallback_route: {
                name: 'partup',
                params: {
                    _id: template.data.partupId
                }
            }
        });
    },
    'click [data-remove]': function(event, template) {
        Partup.client.prompt.confirm({
            title: __('pages-modal-partup_settings-confirmation-title'),
            message: __('pages-modal-partup_settings-confirmation-message'),
            confirmButton: __('pages-modal-partup_settings-confirmation-confirm-button'),
            cancelButton: __('pages-modal-partup_settings-confirmation-cancel-button'),
            onConfirm: function() {
                Meteor.call('partups.remove', template.data.partupId, function(error) {
                    if (error) {
                        Partup.client.notify.error(error.reason);
                    } else {
                        Router.go('discover');
                    }
                });
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

            self.event.preventDefault();
            var template = self.template.parent().parent();

            if (template.submitting.get()) return;

            var partup = this.template.parent().data.currentPartup;
            var submitBtn = template.find('[type=submit]');
            template.submitting.set(true);

            Meteor.call('partups.update', partup._id, insertDoc, function(error, res) {
                if (error && error.reason) {
                    Partup.client.notify.error(error.reason);
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                template.submitting.set(false);
                Intent.return('partup-settings', {
                    fallback_route: {
                        name: 'partup',
                        params: {
                            _id: template.data.partupId
                        }
                    }
                });
            });

            return false;
        }
    }
});
