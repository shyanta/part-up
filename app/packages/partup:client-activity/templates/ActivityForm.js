var maxLength = {
    name: Partup.schemas.forms.startActivities._schema.name.max,
    description: Partup.schemas.forms.startActivities._schema.description.max
};

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.ActivityForm.onCreated(function() {
    this.showExtraFields = new ReactiveVar(!this.data.CREATE);

    this.charactersLeft = new ReactiveDict();
    this.charactersLeft.set('name', maxLength.name);
    this.charactersLeft.set('description', maxLength.description);

    if (this.data.activity) {
        var ac = this.data.activity;
        var nameLength = maxLength.name - (ac.name ? ac.name.length : 0);
        var descLength = maxLength.description - (ac.description ? ac.description.length : 0);
        this.charactersLeft.set('name', nameLength);
        this.charactersLeft.set('description', descLength);
    }
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.ActivityForm.helpers({
    schema: Partup.schemas.forms.startActivities,
    placeholders: Partup.services.placeholders.activity,
    generateFormId: function() {
        if (this.CREATE) {
            return 'activityCreateForm';
        }
        return 'activityEditForm-' + this.activity._id;
    },
    charactersLeftName: function() {
        return Template.instance().charactersLeft.get('name');
    },
    charactersLeftDescription: function() {
        return Template.instance().charactersLeft.get('description');
    },
    showExtraFields: function() {
        return Template.instance().showExtraFields.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.ActivityForm.events({
    'click [data-extra-fields-button]': function(event, template) {
        event.preventDefault();
        template.showExtraFields.set(true);
    },
    'click [data-activity-archive]': function(event, template) {
        template.data.edit.set(false);
        Meteor.call('activities.archive', template.data.activity._id, function(error) {
            if (error) {
                Partup.ui.notify.error(error.reason);
            }
        });
    },
    'click [data-activity-unarchive]': function(event, template) {
        Meteor.call('activities.unarchive', template.data.activity._id, function(error) {
            if (error) {
                Partup.ui.notify.error(error.reason);
            }
        });
    },
    'click [data-activity-remove]': function(event, template) {
        template.data.edit.set(false);
        Meteor.call('activities.remove', template.data.activity._id, function(error) {
            if (error) {
                Partup.ui.notify.error(error.reason);
            }
        });
    },
    'input [maxlength]': function(event, template) {
        var target = event.target;
        template.charactersLeft.set(target.name, maxLength[target.name] - target.value.length);
    },
    'click [data-close]': function(event, template) {
        template.data.edit.set(false);
    },
    'click [data-removedate]': function eventsClickRemoveDate (event, template) {
        event.preventDefault();
        template.find('[name=end_date]').value = '';
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc) {
        if (!/^activity(Create|Edit)Form/.test(this.formId)) return;

        var self = this;
        var template = self.template.parent();

        if (template.data && template.data.activity) {
            Meteor.call('activities.update', template.data.activity._id, doc, function(error) {
                if (error && error.message) {
                    Partup.ui.notify.error(error.reason);

                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                template.data.edit.set(false);
                AutoForm.resetForm(self.formId);
                self.done();
            });
        } else {
            var partupId = Session.get('partials.create-partup.current-partup') ||
                Router.current().params._id;

            Meteor.call('activities.insert', partupId, doc, function(error, output) {
                if (error && error.message) {
                    Partup.ui.notify.error(error.reason);

                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                template.charactersLeft.set('name', maxLength.name);
                template.charactersLeft.set('description', maxLength.description);
                template.showExtraFields.set(false);
                AutoForm.resetForm(self.formId);

                if (template.data.POPUP) {
                    Partup.ui.popup.close();
                }

                if (mout.lang.isFunction(template.data.createCallback)) {
                    template.data.createCallback(output._id);
                }

                self.done();
            });
        }

        return false;
    }
});
