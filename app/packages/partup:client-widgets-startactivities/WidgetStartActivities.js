Template.WidgetStartActivities.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startactivities,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({partup_id: partupId});
    },
    'showDateButton': function () {
        return Session.get('showDateButton');
    }
});

Template.WidgetStartActivities.events({
    'click #nextPage': function () {
        Router.go('start-contribute', {_id: Session.get('partials.start-partup.current-partup')});
    },
    'click .end-date-button': function(event) {
        event.preventDefault();
        Session.set('showDateButton', false);
    }
});

Template.WidgetStartActivities.rendered = function () {
    Session.set('showDateButton', true);
};

AutoForm.hooks({
    activityForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();
            var partupId = Session.get('partials.start-partup.current-partup');
            var self = this;

            Meteor.call('partups.activities.insert', partupId, insertDoc, function (error, result) {
                if (error) {
                    console.log('something went wrong', error);
                    return false;
                }

                Session.set('showDateButton', true);
                AutoForm.resetForm('activityForm');
                self.done();
            });

            return false;
        }
    }
});