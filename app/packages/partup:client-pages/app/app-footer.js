Template.app_footer.onCreated(function() {
    var tpl = this;

    tpl.versiondata = new ReactiveVar();

    HTTP.get(Meteor.absoluteUrl('VERSION'), function(error, response) {
        if (error || !response) return;

        // Be sure the result is a binary file
        if (response.headers['content-type'] !== 'application/octet-stream') return;

        if (!response.content) return;

        var parsed_versiondata = JSON.parse(response.content);
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
