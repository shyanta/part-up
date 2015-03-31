/**
 @namespace Tags helper service
 @name Partup.services.tags
 @memberOf partup.services
 */
Partup.services.tags = {
    /**
     * Transform a comma separated string into an array of tags
     *
     * @memberOf services.location
     * @param {Object} location
     */
    tagInputToArray: function(tags_input) {
        var _tags = tags_input.split(',');
        if (_tags.length > 0) {
            return _tags.map(function(elem) {
                return elem.trim();
            }).filter(function(elem) {
                return !!elem;
            });
        } else {
            return [];
        }
    }

};