Template.WidgetStartActivities.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startactivities,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
    'showDateButton': function () {
        return Session.get('showDateButton');
    }
});

Template.WidgetStartActivities.events({
    'click #nextPage': function () {
        Router.go('start-contribute', {_id: Session.get('partials.start-partup.current-partup')});
    },
    'click [data-end-date-button]': function(event, template) {
        event.preventDefault();
        Session.set('showDateButton', false);

        // defer is nessesary to wait for template re rendering
        lodash.defer(function(){

            // init datepicker
            template.$('.pu-datepicker').datepicker({
                language: moment.locale(),
                format: "yyyy-mm-dd",
            });
        })
        
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

            Meteor.call('activities.insert', partupId, insertDoc, function (error, result) {
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