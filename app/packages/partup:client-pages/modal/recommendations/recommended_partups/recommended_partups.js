var getAmountOfColumns = function(screenwidth) {
    return screenwidth > Partup.client.grid.getWidth(11) + 80 ? 4 : 3;
};

Template.app_recommended_partups.onCreated(function() {
    var template = this;
});
