Template.registerHelper('partupIE9', function() {
    if (Partup.client.browser.isIE()) {
        var version = Partup.client.browser.msieversion();
        if (version && version < 10) {
            return true;
        }
    }
    return false;
});
