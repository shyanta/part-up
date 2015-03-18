Template.WidgetsStartdetails.helpers({
    'placeholderHelper': function() {
        console.log('placeholderhelper', this);
    }
})

Template.WidgetsStartdetails.events({
    //
});

Template.registerHelper('Partup', Partup);

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
                Router.go('/');
            });
        }
    }
});