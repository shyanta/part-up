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

            Meteor.call('collections.partups.insert', insertDoc, function(err, res){
                if(err) {
                    console.log('something went wrong', error);
                    return false;
                }
                Router.go('home');
            });
        }
    }
});