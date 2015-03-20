Template.WidgetStartActivities.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startactivities
});

Template.WidgetStartActivities.events({
    //
});

Template.WidgetStartActivities.render = function() {
};

AutoForm.hooks({
    activitySubmitForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            Meteor.call('collections.activities.insert', insertDoc, function(err, res){
                if(err) {
                    console.log('something went wrong', error);
                    return false;
                }
                Router.go('start-contribute', {_id:res._id});
            });
        }
    }
});