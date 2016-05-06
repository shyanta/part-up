Template.NetworkSettingsAbout.onCreated(function() {
    var template = this;
    var userId = Meteor.userId();
    var networkSlug = template.data.networkSlug;
    var network;
    template.subscribe('networks.one', template.data.networkSlug, {
        onReady: function() {
            network = Networks.findOne({slug: template.data.networkSlug});
            if (!network) Router.pageNotFound('network');
            if (network.isClosedForUpper(userId)) {
                Router.pageNotFound('network');
            }
        }
    });
    template.subscribe('contentblocks.by_network_slug', template.data.networkSlug, {
        onReady: function() {
            var introBlock = ContentBlocks.findOne({type: 'intro'});
            if (introBlock) return;
            console.log('MAKE')
            Meteor.call('networks.contentblock_insert', template.data.networkSlug, {type: 'intro'}, function(err, blockId) {
                template.editBlock(blockId);
            });
        }
    });

    template.charactersLeft = new ReactiveDict();
    template.submitting = new ReactiveVar();
    template.current = new ReactiveDict();
    template.uploading = new ReactiveDict();
    template.editingBlocks = new ReactiveVar([]);

    template.locationSelection = new ReactiveVar();

    template.viewBlock = function(blockId) {
        if (!blockId) return;
        var editingBlocks = template.editingBlocks.get();
        var index = editingBlocks.indexOf(blockId);
        editingBlocks.splice(index, 1);
        template.editingBlocks.set(editingBlocks);
    };

    template.editBlock = function(blockId) {
        if (!blockId) return;
        var editingBlocks = template.editingBlocks.get();
        editingBlocks.push(blockId);
        template.editingBlocks.set(editingBlocks);
    };

    template.updateBlock = function(blockId, fields, done) {
        Meteor.call('networks.contentblock_update', networkSlug, blockId, fields, function(err) {

            if (err && err.message) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(TAPi18n.__('network-settings-form-saved'));
            template.viewBlock(blockId);
            done();
        });
    };

    template.removeBlock = function(blockId) {
        Partup.client.prompt.confirm({
            title: 'Weet je het zeker?',
            message: 'Deze actie kan niet ongedaan gemaakt worden',
            confirmButton: 'Verwijderen',
            onConfirm: function() {
                Meteor.call('networks.contentblock_remove', networkSlug, blockId);
            }
        });
    };

    template.upBlock = function(blockId) {
    };

    template.downBlock = function(blockId) {
    };
});

Template.NetworkSettingsAbout.helpers({
    config: function() {
        var template = Template.instance();
        var networkSlug = template.data.networkSlug;
        return {
            introFormSettings: function() {
                return {
                    type: 'intro',
                    onRemove: template.removeBlock,
                    onSubmit: template.updateBlock,
                    onClose: template.viewBlock
                };
            },
            introBlockSettings: function() {
                return {
                    onEdit: template.editBlock
                };
            },
            paragraphFormSettings: function() {
                return {
                    type: 'paragraph',
                    onRemove: template.removeBlock,
                    onSubmit: template.updateBlock,
                    onClose: template.viewBlock
                };
            },
            paragraphBlockSettings: function() {
                return {
                    onEdit: template.editBlock,
                    onUp: template.upBlock,
                    onDown: template.downBlock
                };
            },
        };
    },
    data: function() {
        var template = Template.instance();
        var network = Networks.findOne({slug: template.data.networkSlug});
        if (!network) return;
        var contentBlocksArr = network.contentblocks || [];
        var introBlock = ContentBlocks.findOne({_id: {$in: contentBlocksArr}, type: 'intro'});
        var contentBlocks = ContentBlocks.find({_id: {$in: contentBlocksArr}, type: 'paragraph'});

        return {
            network: function() {
                return network;
            },
            introBlock: function() {
                return introBlock;
            },
            contentBlocks: function() {
                return contentBlocks;
            }
        };
    },
    state: function() {
        var template = Template.instance();
        return {
            editingBlocks: function() {
                return template.editingBlocks.get();
            }
        };
    }
});

Template.NetworkSettingsAbout.events({
    'click [data-create]': function(event, template) {
        event.preventDefault();
        Meteor.call('networks.contentblock_insert', template.data.networkSlug, {type: 'paragraph'}, function(err, blockId) {
            template.editBlock(blockId);
        });
    }
});
