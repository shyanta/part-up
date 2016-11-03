/**
 * Render a form to edit a single network's access settings
 *
 * @module client-network-settings-access
 * @param {Number} networkSlug    the slug of the network whose settings are rendered
 */
Template.NetworkSettingsAccess.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();
    var network = Networks.findOne({slug: template.data.networkSlug});
    template.create_partup_restricted = new ReactiveVar(false);
    template.colleagues_default_enabled = new ReactiveVar(false);
    template.colleagues_custom_a_enabled = new ReactiveVar(false);
    template.colleagues_custom_b_enabled = new ReactiveVar(false);

    template.subscribe('networks.one.partups', {slug: template.data.networkSlug});

    template.subscription = template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            var network = Networks.findOne({slug: template.data.networkSlug});
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) {
                Router.pageNotFound('network');
            }

            template.create_partup_restricted.set(network.create_partup_restricted);

            template.colleagues_default_enabled.set(network.colleaguesRoleEnabled());
            template.colleagues_custom_a_enabled.set(network.customARoleEnabled());
            template.colleagues_custom_b_enabled.set(network.customBRoleEnabled());
        }
    });

    template.charactersLeft = new ReactiveDict();
    template.submitting = new ReactiveVar();

    template.autorun(function() {
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;

        network = Partup.transformers.networkAccess.toFormNetworkAccess(network);

        var formSchema = Partup.schemas.forms.networkAccess._schema;
        var valueLength;

        ['label_admins', 'label_colleagues', 'label_colleagues_custom_a', 'label_colleagues_custom_b'].forEach(function(n) {
            valueLength = network[n] ? network[n].length : 0;
            template.charactersLeft.set(n, formSchema[n].max - valueLength);
        });
    });
});

Template.NetworkSettingsAccess.helpers({
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var partups = Partups.find({network_id: network._id}).fetch();
        return {
            hasActivePartupsCollegues: function() {
                if (partups) {
                    var PartupsCollegues = partups.filter(function(item) {
                        return item.privacy_type === 7;
                    });
                    return !!PartupsCollegues.length;
                }
                return true; // disable in case we don't have the info about the partups
            },
            hasActivePartupsCustomA: function() {
                if (partups) {
                    var PartupsCustomA = partups.filter(function(item) {
                        return item.privacy_type === 8;
                    });
                    return !!PartupsCustomA.length;
                }
                return true; // disable in case we don't have the info about the partups
            },
            hasActivePartupsCustomB: function() {
                if (partups) {
                    var PartupsCustomB = partups.filter(function(item) {
                        return item.privacy_type === 9;
                    });
                    return !!PartupsCustomB.length;
                }
                return true; // disable in case we don't have the info about the partups
            },
            create_partup_restricted: function() {
                return template.create_partup_restricted.get();
            },
            colleagues_default_enabled: function() {
                return template.colleagues_default_enabled.get();
            },
            colleagues_custom_a_enabled: function() {
                return template.colleagues_custom_a_enabled.get();
            },
            colleagues_custom_b_enabled: function() {
                return template.colleagues_custom_b_enabled.get();
            }
        };
    },
    form: function() {
        var template = Template.instance();
        return {
            schema: Partup.schemas.forms.networkAccess,
            fieldsForNetworkAccess: function() {
                var network = Networks.findOne({slug: template.data.networkSlug});
                if (!network) return;

                return Partup.transformers.networkAccess.toFormNetworkAccess(network);
            }
        };
    },
    placeholders: function() {
        return {
            admins: function() {
                return TAPi18n.__('network-settings-uppers-label-admin');
            },
            colleagues: function() {
                return TAPi18n.__('network-settings-uppers-label-colleague');
            },
            colleagues_custom_a: function() {
                return TAPi18n.__('network-settings-uppers-label-colleague-custom-a');
            },
            colleagues_custom_b: function() {
                return TAPi18n.__('network-settings-uppers-label-colleague-custom-b');
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            labelAdminsCharactersLeft: function() {
                return template.charactersLeft.get('label_admins');
            },
            labelColleaguesCharactersLeft: function() {
                return template.charactersLeft.get('label_colleagues');
            },
            labelColleaguesCustomACharactersLeft: function() {
                return template.charactersLeft.get('label_colleagues_custom_a');
            },
            labelColleaguesCustomBCharactersLeft: function() {
                return template.charactersLeft.get('label_colleagues_custom_b');
            },
            submitting: function() {
                return template.submitting.get();
            }
        };
    }
});

Template.NetworkSettingsAccess.events({
    'input [maxlength]': function(e, template) {
        template.charactersLeft.set(this.name, this.max - e.target.value.length);
    },
    'click [data-switch]': function(event, template) {
        event.preventDefault();
        var field = $(event.currentTarget).attr('data-switch');
        if (field) template[field].set(!template[field].curValue);
    }
});

AutoForm.addHooks('NetworkSettingsAccessForm', {
    onSubmit: function(doc) {
        var self = this;
        var template = self.template.parent();
        var network = Networks.findOne({slug: template.data.networkSlug});

        template.submitting.set(true);
        doc.create_partup_restricted = doc.create_partup_restricted || false;
        doc.colleagues_default_enabled = doc.colleagues_default_enabled || false;
        doc.colleagues_custom_a_enabled = doc.colleagues_custom_a_enabled || false;
        doc.colleagues_custom_b_enabled = doc.colleagues_custom_b_enabled || false;
        Meteor.call('networks.updateAccess', network._id, doc, function(err) {
            template.submitting.set(false);

            if (err && err.message) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(TAPi18n.__('network-settings-access-form-saved'));
            self.done();
        });

        return false;
    }
});
