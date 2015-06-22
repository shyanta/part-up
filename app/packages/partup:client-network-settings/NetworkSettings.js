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

        var entitySchema = Partup.schemas.entities.network._schema;

        ['description', 'name'].forEach(function(n) {
            self.charactersLeft.set(n, entitySchema[n].max - network[n].length);
        });
    });
});

Template.NetworkSettings.helpers({
    entitySchema: Partup.schemas.entities.network._schema,
    formSchema: Partup.schemas.forms.network,
    placeholders: {
        name: function() {
            return __('network-settings-form-name-placeholder');
        },
        description: function() {
            return __('network-settings-form-description-placeholder');
        }
    },
    descriptionCharactersLeft: function() {
        return Template.instance().charactersLeft.get('description');
    },
    nameCharactersLeft: function() {
        return Template.instance().charactersLeft.get('name');
    },
    network: function() {
        return Networks.findOne({_id: this.networkId});
    }
});

Template.NetworkSettings.events({
    'input [maxlength]': function(e, template) {
        template.charactersLeft.set(this.name, this.max - e.target.value.length);
    }
});
