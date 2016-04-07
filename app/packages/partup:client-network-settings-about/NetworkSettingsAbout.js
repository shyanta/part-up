Template.NetworkSettingsAbout.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();

    template.subscription = template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) {
                Router.pageNotFound('network');
            }
        }
    });
    template.charactersLeft = new ReactiveDict();
    template.submitting = new ReactiveVar();
    template.current = new ReactiveDict();
    template.uploading = new ReactiveDict();

    template.locationSelection = new ReactiveVar();

    template.autorun(function() {
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;

        if (network.location && network.location.place_id) template.locationSelection.set(network.location);

        network = Partup.transformers.network.toFormNetwork(network);

        var formSchema = Partup.schemas.forms.network._schema;
        var valueLength;

        ['description', 'name', 'tags_input', 'location_input', 'website'].forEach(function(n) {
            valueLength = network[n] ? network[n].length : 0;
            template.charactersLeft.set(n, formSchema[n].max - valueLength);
        });
    });
});

Template.NetworkSettingsAbout.onRendered(function() {
    // this.$('#summernote-intro').summernote();
    // this.$('#summernote-intro').trumbowyg();

    // this.$('#summernote-p').trumbowyg();
});

Template.NetworkSettingsAbout.helpers({
    form: function() {
        var template = Template.instance();
        return {
            introInput: {
                input: 'data-intro',
                className: 'pu-textarea pu-wysiwyg',
                placeholder: 'Schrijf een intro'
            },
            paragraphInput: {
                input: 'data-paragraph',
                className: 'pu-textarea pu-wysiwyg',
                placeholder: 'Paragraaf'
            }
        };
    },
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        return {
            network: function() {
                return network;
            }
        };
    }
});

Template.NetworkSettingsAbout.events({

});
