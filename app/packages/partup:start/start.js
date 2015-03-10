Template.start.events({
	'submit form': function(event, template) {
		event.preventDefault();
		var name = template.find('input').value;
		Partups.insert({
			name: name,
			createdAt: new Date,
			userId: Meteor.userId()
		});
		Router.go('/');
	}
})