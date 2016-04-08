Template.NetworkInviteTile.helpers({
    data: function() {
        var template = Template.instance();
        return {
            networkSlug: function() {
                return template.data.networkSlug;
            }
        };
    }
});
