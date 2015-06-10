Partup.client.elements = {

    /**
     * Helpers to check if an element is somewhere below another element
     *
     * @memberOf Partup.client
     * @param {Element} target element to look below
     * @param {String} selector for element to search
     * @returns {Boolean} whether the element is somewhere below
     */
    checkIfElementIsBelow: function(currentElement, selector) {
        $element = $(currentElement);
        var self = false;
        $(selector).each(function (idx, match) {
            if (!self) {
                self = $element.get(0) === match;
                return;
            }
        });
        var parents = $element.parents(selector);
        return (!! parents.length || self);
    }
};
