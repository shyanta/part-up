Template.Activity.onCreated(function(){
    this.editMode = new ReactiveVar(false);
})

Template.Activity.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startactivities,
    editMode: function(){
        return Template.instance().editMode.get();
    }
})

Template.Activity.events({
    'click [data-enable-edit-mode]': function editMode(event, template){
        template.editMode.set(true);
        // defer is nessesary to wait for template re rendering
        lodash.defer(function(){

            // init datepicker
            template.$('.pu-datepicker').datepicker({
                language: moment.locale(),
                format: "yyyy-mm-dd",
            });
        })
    },
    'click [data-save-and-disable-edit-mode]': function saveActivity(event, template){

        template.editMode.set(false);
    },
    'click [data-remove-activity]': function saveActivity(event, template){
        alert('Why not Zoidberg?\n(V)_|•,,,•|_(V)');
    }
})

AutoForm.hooks({
    activityEditForm: {
        onSubmit: function (insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            // update activity


            // var partupId = Session.get('partials.start-partup.current-partup');
            // var self = this;

            // Meteor.call('activities.update', partupId, insertDoc, function (error, result) {
            //     if (error) {
            //         console.log('something went wrong', error);
            //         return false;
            //     }

            //     // Session.set('showDateButton', true);
            //     AutoForm.resetForm('activityEditForm');
            //     self.done();
            // });

            return false;
        }
    }
});