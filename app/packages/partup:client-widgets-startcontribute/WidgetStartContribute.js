Template.WidgetStartContribute.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startcontribute,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
});

Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'showContributeButton': function () {
        return Template.instance().showContributeButton.get();
    },
    'activityId': function() {
        return this._id;
    }
});

Template.WidgetStartContribute.events({
    'click #nextPage': function () {
        Router.go('start-promote', {_id: Session.get('partials.start-partup.current-partup')});
    }
});

Template.ActivityContribution.events({
    'click .pu-button-contribute': function(event, template) {
        event.preventDefault();
        template.showContributeButton.set(false);
    },
    'click .pu-button-save': function(event, template) {
        event.preventDefault();
        template.showContributeButton.set(true);
    }
});

Template.WidgetStartContribute.rendered = function () {
    //
};

Template.ActivityContribution.created = function () {
    this.showContributeButton = new ReactiveVar(true);
    //var activityId = this.activityId;
    //console.log(activityId);
};

AutoForm.hooks({
    contributeForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            console.log(this.formId);
            console.log(this.template.activityId);
            var activityId = Session.get('partials.start-partup.current-partup');
            var self = this;

            Meteor.call('activities.contribute.insert', partupId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }

                self.done();
            });

            return false;
        }
    }
});