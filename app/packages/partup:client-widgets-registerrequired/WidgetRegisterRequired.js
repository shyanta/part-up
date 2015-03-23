Template.WidgetRegisteRequired.helpers({
    //placeholders: Partup.services.placeholders.registerrequired,
    numberOfUppers: function() {
        return 42;
    }
});

AutoForm.hooks({
    registerRequiredForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            var partupId = Session.get('partials.start-partup.current-partup');

            if(partupId) {
                Meteor.call('partups.update', partupId, insertDoc, function(error, res){
                    if(error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    Router.go('start-activities', {_id:partupId});
                });
            } else {
                Meteor.call('partups.insert', insertDoc, function(error, res){
                    if(error) {
                        console.log('something went wrong', error);
                        return false;
                    }
                    Session.set('partials.start-partup.current-partup', res._id);
                    Router.go('start-activities', {_id:res._id});
                })
            }
        }
    }
});
