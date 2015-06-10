Template.registerHelper('partupIsPopupActive', function(id) {
    var current = Partup.client.popup.current.get();
    return id === current;
});
