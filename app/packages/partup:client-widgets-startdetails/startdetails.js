Template.WidgetsStartdetails.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startdetails
});

Template.WidgetsStartdetails.events({
    //
});

Template.WidgetsStartdetails.render = function() {
}

AutoForm.hooks({
    partupForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            event.preventDefault();

            Meteor.call('partups.insert', insertDoc, function(err, res){
                if(err) {
                    console.log('something went wrong', error);
                    return false;
                }
                Session.set('partials.start-partup.current-partup', res._id);
                Router.go('start-activities', {_id:res._id});
            });
        }
    }
});
