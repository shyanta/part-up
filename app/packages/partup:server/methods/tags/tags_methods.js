Meteor.methods({
    /**
     * Return a list of tags based on search query
     *
     * @param {string} searchString
     */
    'tags.autocomplete': function(searchString) {
        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'Unauthorized.');

        if (!searchString) throw new Meteor.Error(400, 'searchString parameter is required');

        try {
            return Tags.find({_id: new RegExp('.*' + searchString + '.*', 'i')}).fetch();
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Error while autocompleting tag string: ' + searchString);
        }
    }
});
