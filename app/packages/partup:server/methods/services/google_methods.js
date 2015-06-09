Meteor.methods({

    /**
     * Get an autocompletion of cities
     *
     * @param {String} term
     */
    'google.cities.autocomplete': function(term) {
        var results = Partup.server.services.google.searchCities(term);

        return results.map(function(result) {
            if (!result.terms || result.terms < 1) return false;

            return {
                id: result.id,
                city: result.terms[0].value
            };
        });
    }

});
