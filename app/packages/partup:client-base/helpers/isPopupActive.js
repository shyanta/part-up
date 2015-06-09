Template.registerHelper('partupIsPopupActive', function(id) {
    var current = Partup.ui.popup.current.get();
    return id === current;
});
