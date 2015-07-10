Template.app_footer.onCreated(function() {
    var tpl = this;

    tpl.versiondata = new ReactiveVar();

    HTTP.get('/VERSION', function(error, response) {
        if (error || !response) return;

        var filecontent = response.content;
        if (!filecontent) return;

        var parsed_versiondata = JSON.parse(filecontent);
        tpl.versiondata.set(parsed_versiondata);
    });
});

Template.app_footer.helpers({
    versiondata: function() {
        return Template.instance().versiondata.get() || {
            version: '"development"',
            deploydate: new Date()
        };
    }
});
