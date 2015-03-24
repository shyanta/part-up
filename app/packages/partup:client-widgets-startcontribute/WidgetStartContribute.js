Template.WidgetStartContribute.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startcontribute,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
    'showDateButton': function () {
        return Session.get('showDateButton');
    }
});

Template.WidgetStartContribute.events({
    'click #nextPage': function () {
        Router.go('start-contribute', {_id: Session.get('partials.start-partup.current-partup')});
    },
    'click .end-date-button': function(event) {
        event.preventDefault();
        Session.set('showDateButton', false);
    }
});

Template.WidgetStartContribute.rendered = function () {
    Session.set('showDateButton', true);
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