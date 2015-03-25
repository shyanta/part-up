Template.WidgetStartContribute.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startcontribute,
    'formSchema': Partup.schemas.forms.contribute,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
    'showContributeButton': function () {
        return Template.instance().showContributeButton.get();
    }
});

Template.WidgetStartContribute.events({
    'click #nextPage': function () {
        Router.go('start-promote', {_id: Session.get('partials.start-partup.current-partup')});
    },
    'click .pu-button-contribute': function(event, template) {
        event.preventDefault();
        template.showContributeButton.set(false);
    }
});

Template.WidgetStartContribute.created = function () {
    this.showContributeButton = new ReactiveVar(true);
};

AutoForm.hooks({
    contributeForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var partupId = Session.get('partials.start-partup.current-partup');
            var self = this;

            Meteor.call('partups.contribute.insert', partupId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }

                Session.set('showDateButton', true);
                AutoForm.resetForm('contributeForm');
                self.done();
            });

            return false;
        }
    }
});