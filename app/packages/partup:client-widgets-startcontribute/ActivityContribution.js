Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribution,
    'placeholders': Partup.services.placeholders.startcontribute,
    'activityId': function () {
        return this._id + ' ' + Meteor.user()._id;
    },
    'formId': function () {
        return Template.instance().contributionId.get();
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
    var activityId = this.data._id;

    var contribution = Contributions.findOne({ activity_id: "qeGoZ5b6XSYqpEWer", upper_id: "iJ9gKXtagn6GC7qnK" });
    console.log(contribution);
    // Set form ID to the contribution for update operations, or default to activity ID for an insert
    if (contribution) {
        this.contributionId = new ReactiveVar(contribution._id);
    } else {
        this.contributionId = new ReactiveVar(activityId);
    }
};

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            var activityId = this.template.parent().data._id;
            var self = this;
            var contribution = Contributions.findOne({ activity_id: activityId, upper_id: Meteor.user()._id });
            console.log(contribution);

            if (contribution) {
                console.log('update');
                var contributionId = this.formId;
                Meteor.call('contributions.update', contributionId, insertDoc, function (error, result) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    console.log(result);
                });
            } else {
                console.log('insert');
                Meteor.call('contributions.insert', activityId, insertDoc, function (error, result) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contributionId.set(result._id);
                    console.log(self.template.parent().contributionId.get());
                });
            }

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
});