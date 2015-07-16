Template.registerHelper('safeHTML', function(htmlchunk) {
    return new Handlebars.SafeString(htmlchunk);
});
