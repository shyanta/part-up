Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribute,
    'placeholders': Partup.services.placeholders.startcontribute,
    'formId': function () {
        return Template.instance().contributionId.get() ? Template.instance().contributionId.get() : this._id;
    },
    'contributionId': function () {
        return Template.instance().contributionId.get() ? Template.instance().contributionId.get() : null;
    },
    'fieldsFromContributionActivity': function () {
        //var contributionId = Template.instance().contributionId.get();
        //if (contributionId) {
        //    console.log(contributionId);
            //var contribution = Activities.findOne({"contribution._id": contributionId});
            //return Template.instance().contributionId.get() ? Partup.transformers.activity.contribution.toFormActivityContribution(contribution) : null;
        //} else {
        //    return null;
        //}
    },
    'checkContributionUser': function(upper_id) {
        return upper_id == Meteor.user()._id;
    }
});

Template.ActivityContribution.events({
    //
});

Template.ActivityContribution.created = function () {
    var contribution = Activities.findOne({
            contributions: {
                $elemMatch: {
                    upper_id: Meteor.user()._id
                }
            }
        }, {
            "contributions.$": 1
        }
    );

    if (contribution) {
        this.contributionId = new ReactiveVar(contribution._id);
    } else {
        this.contributionId = new ReactiveVar(null);
    }
};

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            var self = this;

            if (self.template.parent().contributionId.get()) {
                console.log('update');
                var contributionId = self.formId;
                Meteor.call('activities.contributions.update', contributionId, insertDoc, function (error, result) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    console.log(result);
                });
            } else {
                console.log('insert');
                var activityId = self.formId;
                Meteor.call('activities.contributions.insert', activityId, insertDoc, function (error, contributionId) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contributionId.set(contributionId);
                });
            }

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
    });