Template.WidgetsStartdetails.events({
	'submit form': function(event, template) {
		event.preventDefault();

        var fields = {
            name: template.find('input').value
        };

        Meteor.call('collections.partups.insert', fields, function(err, res){
            if(err) {
                if(err.error == 400) {
                    //TODO: error handling
                    console.log('validation failed: ' + error.message);

                }
                console.log('something went wrong', error);
                return false;
            }
            Router.go('/');
        });

	}
});