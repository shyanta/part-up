Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'formCollection': Activities.contributions,
    'placeholders': Partup.services.placeholders.startcontribute,
    'activityId': function () {
        return this._id;
    },
    'newContribution': function () {
        return Template.instance().newContribution.get();
    },
    'fieldsFromContributionActivity': function () {
        var contributionId = Template.instance().contributionId.get();
        if (contributionId) {
            var activity = Activities.findOne({_id: this._id}, {
                contributions: {
                    $elemMatch: {
                        _id: contributionId
                    }
                }
            });
            return Partup.transformers.activity.contribution.toFormActivityContribution(activity);
        }
        return null;
    }
});

Template.ActivityContribution.events({
    //
});

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            var self = this;

            var activityId = self.formId;
            Meteor.call('activities.contributions.insert', activityId, insertDoc, function (error, contributionId) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }
            });

            AutoForm.resetForm(self.formId);
            this.done();

            return false;
        }
    });