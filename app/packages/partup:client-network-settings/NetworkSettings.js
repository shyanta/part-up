/**
 * Render a form to edit a single network's settings
 *
 * @param {Number} networkId
 */
Template.NetworkSettings.onCreated(function() {
    this.subscription = this.subscribe('networks.one', this.data.networkId);
    this.charactersLeft = new ReactiveDict();

    var self = this;
    this.autorun(function() {
        var network = Networks.findOne({_id: self.data.networkId});
        if (!network) return;

        network = Partup.transformers.network.toFormNetwork(network);

        var formSchema = Partup.schemas.forms.network._schema;
        var valueLength;

        ['description', 'name', 'tags_input', 'location_input'].forEach(function(n) {
            valueLength = network[n] ? network[n].length : 0;
            self.charactersLeft.set(n, formSchema[n].max - valueLength);
        });
    });
});

Template.NetworkSettings.helpers({
    formSchema: Partup.schemas.forms.network,
    placeholders: {
        name: function() {
            return __('network-settings-form-name-placeholder');
        },
        description: function() {
            return __('network-settings-form-description-placeholder');
        },
        tags_input: function() {
            return __('network-settings-form-tags_input-placeholder');
        },
        location_input: function() {
            return __('network-settings-form-location_input-placeholder');
        }
    },
    descriptionCharactersLeft: function() {
        return Template.instance().charactersLeft.get('description');
    },
    nameCharactersLeft: function() {
        return Template.instance().charactersLeft.get('name');
    },
    tags_inputCharactersLeft: function() {
        return Template.instance().charactersLeft.get('tags_input');
    },
    location_inputCharactersLeft: function() {
        return Template.instance().charactersLeft.get('location_input');
    },
    network: function() {
        return Networks.findOne({_id: this.networkId});
    },
    fieldsForNetwork: function() {
        var network = Networks.findOne({_id: this.networkId});
        if (!network) return;

        return Partup.transformers.network.toFormNetwork(network);
    },
    locationChoose: function() {
        var template = Template.instance();
        return function(results) {
            template.find('[name="location_input"]').value = results.placeId;
        };
    },
    locationClear: function() {
        return function() {
            $('[name="location_input"]').val('');
        };
    }
});

Template.NetworkSettings.events({
    'input [maxlength]': function(e, template) {
        template.charactersLeft.set(this.name, this.max - e.target.value.length);
    }
});
