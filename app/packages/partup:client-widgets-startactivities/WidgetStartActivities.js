var showDatePicker = new ReactiveVar(false);

Template.WidgetStartActivities.helpers({
    'formSchema': Partup.schemas.forms.startActivities,
    'placeholders': Partup.services.placeholders.startactivities,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
    'currentPartupId': function() {
        return Session.get('partials.start-partup.current-partup');
    },
    'showDatePicker': function() {
        return showDatePicker.get();
    }
});

Template.WidgetStartActivities.events({
    'click [data-end-date-button]': function(event, template) {
        event.preventDefault();
        showDatePicker.set(true);

        // defer is nessesary to wait for template re rendering
        Meteor.defer(function(){

            // init datepicker
            template.$('.pu-datepicker').datepicker({
                language: moment.locale(),
                format: "yyyy-mm-dd"
            });
        })
        
    }
});

Template.WidgetStartActivities.onCreated(function () {

});

AutoForm.hooks({
    activityForm: {
        onSubmit: function (insertDoc) {
            var self = this;
            self.event.preventDefault();
            var partupId = Session.get('partials.start-partup.current-partup');

            Meteor.call('activities.insert', partupId, insertDoc, function (error) {
                if (error) {
                    Partup.ui.notify.error(error.reason);
                    self.done(error);
                } else {
                    showDatePicker.set(false);
                    AutoForm.resetForm('activityForm');
                    self.done();
                }
            });

            return false;
        }
    }
});