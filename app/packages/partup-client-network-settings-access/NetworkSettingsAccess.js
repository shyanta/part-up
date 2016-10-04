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

    template.partupsInNetwork = new ReactiveVar;

    Meteor.call('partups.in_network', network, {
    }, function(error, results) {
        template.partupsInNetwork.set(results);
    });

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

        return {
            hasActivePartupsCustomA: function () {
                var partups = template.partupsInNetwork.get();
                if (partups) {
                    var PartupsCustomA = partups.filter(item => item.privacy_type === 8);
                    return !!PartupsCustomA.length;
                }
                return true; // disable in case we don't have the info about the partups
            },
            hasActivePartupsCustomB: function () {
                var partups = template.partupsInNetwork.get();
                if (partups) {
                    var PartupsCustomB = partups.filter(item => item.privacy_type === 9);
                    return !!PartupsCustomB.length;
                }
                return true; // disable in case we don't have the info about the partups
            }
        }
    },
    form: function() {
        var template = Template.instance();
        // var userId = Meteor.userId();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;

        return {
            schema: Partup.schemas.forms.networkAccess,
            fieldsForNetworkAccess: function() {
                return Partup.transformers.networkAccess.toFormNetworkAccess(network);
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
        }
    }
});

Template.NetworkSettingsAccess.events({
    'input [maxlength]': function(e, template) {
        template.charactersLeft.set(this.name, this.max - e.target.value.length);
    }
});

AutoForm.addHooks('NetworkSettingsAccessForm', {
    onSubmit: function(doc) {
        var self = this;
        var template = self.template.parent();
        var network = Networks.findOne({slug: template.data.networkSlug});

        template.submitting.set(true);

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
