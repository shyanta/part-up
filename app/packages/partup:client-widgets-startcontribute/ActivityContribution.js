Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'showContributeButton': function () {
        return Template.instance().showContributeButton.get();
    },
    'activityId': function() {
        return this._id;
    }
});

Template.ActivityContribution.events({
    'click .pu-button-contribute': function(event, template) {
        event.preventDefault();
        template.showContributeButton.set(false);
    }
    //'click .pu-button-save': function(event, template) {
        //event.preventDefault();
        //template.showContributeButton.set(true);
    //}
});

Template.ActivityContribution.created = function () {
    this.showContributeButton = new ReactiveVar(true);
    //var activityId = this.activityId;
    //console.log(activityId);
};

AutoForm.hooks({
    null: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            console.log(this.formId);
            console.log(this.template.activityId);
            var activityId = Session.get('partials.start-partup.current-partup');
            var self = this;

            Meteor.call('activities.contribution.insert', partupId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }
                self.template.showContributeButton.set(true);
                self.done();
            });

            return false;
        }
    }
});