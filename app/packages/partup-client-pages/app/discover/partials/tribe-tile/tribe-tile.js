Template.TribeTile.helpers({
    data: function() {
        var template = Template.instance();
        var network = template.data.tribe;
        if (!network) return;
        return {
            tribe: function() {
                return network;
            },
            activeUppers: function() {
                return {
                    ids: network.most_active_uppers,
                    count: network.stats.upper_count,
                    networkSlug: self.networkSlug,
                    networkId: network._id
                };
            },
            activePartups: function() {
                return {
                    ids: network.most_active_partups,
                    count: network.stats.partup_count,
                    networkId: network._id
                };
            }
        };
    }
});

Template.TribeTile.events({
    'click [data-open-network]': function(event, template) {
        var preventOpen = Partup.client.element.hasAttr(event.target, 'data-prevent-open');
        if (!preventOpen) {
            event.preventDefault();
            var networkSlug = $(event.currentTarget).data('open-network');
            Router.go('network-detail', {slug: networkSlug});
        }
    }
});

Template.MostActivePartups.onCreated(function() {
    var template = this;
    var partupId = (template.data.partups.ids || [])[0];
});

Template.MostActivePartups.helpers({
    data: function() {
        var template = Template.instance();
        var partupId = (template.data.partups.ids || [])[0];
        var partups = template.data.partups || {};
        return {
            mostActivePartup: function() {
                return Partups.findOne({_id: partupId});
            },
            totalActivePartupCount: function() {
                return partups.count;
            }
        };
    }
});

Template.MostActiveUppers.onCreated(function() {
    var template = this;
    template.MAX_UPPERS = 7;
    var upperIds = template.data.uppers.ids || [];
    template.subscribe('users.by_ids', upperIds);
});

Template.MostActiveUppers.helpers({
    data: function() {
        var template = Template.instance();
        var upperIds = template.data.uppers.ids || [];
        var upperCount = template.data.uppers.count;
        return {
            uppers: function() {
                return Meteor.users.find({_id: {$in: upperIds}}, {limit: template.MAX_UPPERS});
            },
            remainingUppers: function() {
                var remaining = upperCount > template.MAX_UPPERS ? upperCount - template.MAX_UPPERS : 0;
                return remaining;
            },
            networkSlug: function() {
                return template.data.networkSlug;
            }
        };
    }
});
