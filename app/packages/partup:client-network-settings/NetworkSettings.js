/**
 * Render a form to edit a single network's settings
 *
 * @module client-network-settings
 * @param {Number} networkSlug    the slug of the network whose settings are rendered
 */
Template.NetworkSettings.onCreated(function() {
    var tpl = this;
    var userId = Meteor.userId();

    tpl.subscription = tpl.subscribe('networks.one', tpl.data.networkSlug, function() {
        var network = Networks.findOne({slug: tpl.data.networkSlug});
        if (!network) Router.pageNotFound('network');
        if (network.isClosedForUpper(userId)) Router.pageNotFound('network');
    });
    tpl.charactersLeft = new ReactiveDict();
    tpl.submitting = new ReactiveVar();
    tpl.current = new ReactiveDict();
    tpl.uploading = new ReactiveDict();

    tpl.locationSelection = new ReactiveVar();

    tpl.autorun(function() {
        var network = Networks.findOne({slug: tpl.data.networkSlug});
        if (!network) return;

        if (network.location && network.location.place_id) tpl.locationSelection.set(network.location);

        network = Partup.transformers.network.toFormNetwork(network);

        var formSchema = Partup.schemas.forms.network._schema;
        var valueLength;

        ['description', 'name', 'tags_input', 'location_input', 'website'].forEach(function(n) {
            valueLength = network[n] ? network[n].length : 0;
            tpl.charactersLeft.set(n, formSchema[n].max - valueLength);
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
        },
        website: function() {
            return __('network-settings-form-website-placeholder');
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
    websiteCharactersLeft: function() {
        return Template.instance().charactersLeft.get('website');
    },
    network: function() {
        return Networks.findOne({slug: this.networkSlug});
    },
    fieldsForNetwork: function() {
        var network = Networks.findOne({slug: this.networkSlug});
        if (!network) return;

        return Partup.transformers.network.toFormNetwork(network);
    },
    submitting: function() {
        return Template.instance().submitting.get();
    },
    imageUploading: function() {
        return !!Template.instance().uploading.get('image');
    },
    imageUrl: function() {
        var imageId = Template.instance().current.get('image');

        if (!imageId) {
            var network = Networks.findOne({slug: this.networkSlug});
            if (network) imageId = network.image;
        }

        if (imageId) {
            var image = Images.findOne({_id: imageId});
            if (image) return image.url({store: '360x360'});
        }

        return '/images/smile.png';
    },
    iconUploading: function() {
        return !!Template.instance().uploading.get('icon');
    },
    iconUrl: function() {
        var iconId = Template.instance().current.get('icon');

        if (!iconId) {
            var network = Networks.findOne({slug: this.networkSlug});
            if (network) iconId = network.icon;
        }

        if (iconId) {
            var icon = Images.findOne({_id: iconId});
            if (icon) return icon.url({store: '360x360'});
        }

        return '/images/smile.png';
    },

    // Location autocomplete helpers
    locationLabel: function() {
        return Partup.client.strings.locationToDescription;
    },
    locationFormvalue: function() {
        return function(location) {
            return location.id;
        };
    },
    locationSelectionReactiveVar: function() {
        return Template.instance().locationSelection;
    },
    locationQuery: function() {
        return function(query, sync, async) {
            Meteor.call('google.cities.autocomplete', query, function(error, locations) {
                lodash.each(locations, function(loc) {
                    loc.value = Partup.client.strings.locationToDescription(loc);
                });
                async(locations);
            });
        };
    }
});

Template.NetworkSettings.events({
    'input [maxlength]': function(e, template) {
        template.charactersLeft.set(this.name, this.max - e.target.value.length);
    },
    'click [data-image-browse]': function(event, template) {
        event.preventDefault();
        template.find('[data-image-input]').click();
    },
    'change [data-image-input]': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            template.uploading.set('image', true);

            Partup.client.uploader.uploadImage(file, function(error, image) {
                template.uploading.set('image', false);

                if (error) {
                    Partup.client.notify.error(__('network-settings-form-image-error'));
                    return;
                }

                template.find('[name=image]').value = image._id;
                template.current.set('image', image._id);
            });

        });
    },
    'click [data-icon-browse]': function(event, template) {
        event.preventDefault();
        template.find('[data-icon-input]').click();
    },
    'change [data-icon-input]': function(event, template) {
        FS.Utility.eachFile(event, function(file) {
            template.uploading.set('icon', true);

            Partup.client.uploader.uploadImage(file, function(error, image) {
                template.uploading.set('icon', false);

                if (error) {
                    Partup.client.notify.error(__('network-settings-form-icon-error'));
                    return;
                }

                template.find('[name=icon]').value = image._id;
                template.current.set('icon', image._id);
            });

        });
    }
});

AutoForm.addHooks('networkEditForm', {
    onSubmit: function(doc) {
        var self = this;
        var template = self.template.parent();
        var network = Networks.findOne({slug: template.data.networkSlug});

        template.submitting.set(true);

        Meteor.call('networks.update', network._id, doc, function(err) {
            template.submitting.set(false);

            if (err && err.message) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(__('network-settings-form-saved'));
            self.done();
        });

        return false;
    }
});
