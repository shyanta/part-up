Meteor.methods({

    /**
     * Get an autocompletion of cities
     *
     * @param {String} term
     */
    'google.cities.autocomplete': function(term) {
        this.unblock();
        console.log(term)
        var results = Partup.server.services.google.searchCities(term);
        console.log(results)
        return results.map(function(result) {
            return {
                id: result.place_id,
                city: result.description
            };
        });
    },

});
