
Partup.client.element = {
    hasAttr: function(element, attribute) {
        var attr = $(element).attr(attribute);
        return !!(typeof attr !== typeof undefined && attr !== false);
    }
};
