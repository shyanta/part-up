var maxLength = {
    name: Partup.schemas.forms.startActivities._schema.name.max,
    description: Partup.schemas.forms.startActivities._schema.description.max
};

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetActivity.onCreated(function(){
    this.edit = new ReactiveVar(false);
    this.showExtraFields = new ReactiveVar(this.data.CREATE ? false : true);
    this.showContributions = new ReactiveVar(false);
    this.charactersLeft = new ReactiveDict();
    this.charactersLeft.set('name', maxLength.name);
    this.charactersLeft.set('description', maxLength.description);

    var self = this;
    this.autorun(function () {
        if(!Partup.ui.focuslayer.state.get()) {
            self.edit.set(false);
        }
    });

    this.autorun(function () {
        if(self.edit.get()) {
            Partup.ui.focuslayer.enable();

            // scroll
            var DELAY = 250;
            var DURATION = 750;
            setTimeout(function () {
                var elm = $(self.find('[data-activity-id]'));
                if(!elm) return;

                var offset = elm.offset().top;
                var max = $(document).height() - window.innerHeight;
                var pos = Math.min(offset - 50, max);

                $('html, body').animate({
                    scrollTop: pos
                }, DURATION);
            }, DELAY);

        } else {
            Partup.ui.focuslayer.disable();
        }
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetActivity.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.activity,
    generateFormId: function(){
        if (this.CREATE){
            return 'activityCreateForm';
        }
        return 'activityEditForm-' + this.activity._id;
    },
    charactersLeftName: function(){
        return Template.instance().charactersLeft.get('name');
    },
    charactersLeftDescription: function(){
        return Template.instance().charactersLeft.get('description');
    },
    showForm: function(){
        return !!this.CREATE || Template.instance().edit.get();
    },
    editMode: function(){
        return Template.instance().edit.get();
    },
    fieldsFromActivity: function(){
        return this.activity;
    },
    showExtraFields: function(){
        return Template.instance().showExtraFields.get();
    },
    contributionsActive: function(){
        return !!this.CONTRIBUTIONS;
    },
    showContributions: function(){
        return this.EXPANDED || (Template.instance().showContributions.get() && !!this.CONTRIBUTIONS);
    },
    contributions: function(){
        var contributions = this.activity.contributions;
        if (!contributions || !contributions.length) return [];

        return Contributions.find({ _id: { $in: contributions }}).fetch();
    },
    showPlaceholderContribution: function(){
        var user = Meteor.user();
        if (!user) return false;

        var contributions = this.activity.contributions;
        if (!contributions || !contributions.length) return true;

        contributions = Contributions.find({ _id: { $in: contributions }}).fetch();

        for (var i = 0; i < contributions.length; i++){
            if (contributions[i].upper_id === user._id) return false;
        }

        return true;
    },
    updateContribution: function(){
        var activityId = this.activity ? this.activity._id : this.activity_id;
        return function(contribution, cb){
            Meteor.call('activity.contribution.update', activityId, contribution, cb);
        };
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetActivity.events({
    'click [data-activity-edit]': function(event, template){
        template.charactersLeft.set('name', maxLength.name - template.data.activity.name.length);
        template.charactersLeft.set('description', maxLength.description - (mout.object.get(template.data, 'activity.description.length') || 0));
        template.edit.set(true);
    },
    'click [data-extra-fields-button]': function(event, template){
        event.preventDefault();
        template.showExtraFields.set(true);
    },
    'click [data-activity-remove]': function(event, template){
        var activityId = template.data.activity._id;
        template.edit.set(false);
        Meteor.call('activities.archive', activityId, function(error){
            if (error){
                Partup.ui.notify.error(error.reason);
            }
        });
    },
    'input [maxlength]': function(event, template){
        var target = event.target;
        template.charactersLeft.set(target.name, maxLength[target.name] - target.value.length);
    },
    'click [data-close]': function(event, template){
        template.edit.set(false);
    },
    'click [data-expander]': function(event, template){
        var opened = template.showContributions.get();
        template.showContributions.set(!opened);
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        if(this.formId.indexOf('activityCreateForm') < 0 && this.formId.indexOf('activityEditForm-') < 0) return;

        var self = this;
        var template = self.template.parentTemplate();

        if (template.data && template.data.activity){
            var activityId = template.data.activity._id;

            Meteor.call('activities.update', activityId, doc, function(error){
                if (error && error.message){
                    switch (error.message){
                        // case 'User not found [403]':
                        //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                        //     break;
                        default:
                            Partup.ui.notify.error(error.reason);
                    }

                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                template.edit.set(false);
                AutoForm.resetForm(self.formId);
                self.done();
            });
        } else {
            var partupId = Session.get('partials.start-partup.current-partup') || Router.current().params._id;

            Meteor.call('activities.insert', partupId, doc, function(error, output) {
                if (error && error.message){
                    switch (error.message){
                        // case 'User not found [403]':
                        //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                        //     break;
                        default:
                            Partup.ui.notify.error(error.reason);
                    }
                    AutoForm.validateForm(self.formId);
                    self.done(new Error(error.message));
                    return;
                }

                template.charactersLeft.set('name', maxLength.name);
                template.charactersLeft.set('description', maxLength.description);
                template.showExtraFields.set(false);
                AutoForm.resetForm(self.formId);
                self.done();

                if(template.data.POPUP) {
                    Partup.ui.popup.close();
                }

                if(mout.lang.isFunction(template.data.createCallback)) {
                    template.data.createCallback(output._id);
                }
            });
        }

        return false;
    }
});
