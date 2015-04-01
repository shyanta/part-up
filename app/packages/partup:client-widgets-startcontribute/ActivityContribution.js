Template.ActivityContribution.helpers({
    'formSchema': Partup.schemas.forms.contribution,
    'placeholders': Partup.services.placeholders.startcontribute,
    'activityId': function  () {
        return this._id;
    },
    'fieldsFromContribution': function () {
        var contribution = Contributions.findOne({ activity_id: this._id, upper_id: Meteor.user()._id });
        if (contribution) {
            Template.instance().contribution.set(contribution);
            var fields = Partup.transformers.contribution.toFormContribution(Template.instance().contribution.get());
            console.log('fields:');
            console.log(fields);
            return fields;
        } else {
            return undefined;
        }
    },
    'contribution': function () {
        //return Contributions.findOne({ activity_id: this._id, upper_id: Meteor.user()._id });
    }
});

Template.ActivityContribution.events({
    //
});

Template.ActivityContribution.created = function () {
    this.contribution = new ReactiveVar();
};

AutoForm.addHooks(
    null, {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            this.event.preventDefault();
            console.log(this);
            console.log(this.formId);
            var activityId = this.formId;
            var self = this;
            var contribution = Contributions.findOne({ activity_id: activityId, upper_id: Meteor.user()._id });

            if (contribution) {
                console.log('update');
                var contributionId = contribution._id;
                Meteor.call('contributions.update', contributionId, insertDoc, function (error, updatedContribution) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contribution.set(updatedContribution);
                });
            } else {
                console.log('insert');
                Meteor.call('contributions.insert', activityId, insertDoc, function (error, newContribution) {
                    if (error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    self.template.parent().contribution.set(newContribution);
                });
            }

            console.log(this.template.parent().contribution.get());

            AutoForm.resetForm(this.formId);
            this.done();

            return false;
        }
});