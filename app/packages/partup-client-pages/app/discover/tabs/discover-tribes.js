Template.app_discover_tribes.onCreated(function() {
    var template = this;
    var PAGING_INCREMENT = 32;

    template.networks = new ReactiveVar([]);

    // States such as loading states
    template.states = {
        loading_infinite_scroll: false,
        paging_end_reached: new ReactiveVar(false),
        count_loading: new ReactiveVar(false)
    };

    // Partup result count
    template.count = new ReactiveVar();

    template.page = new ReactiveVar(undefined, function(previousPage, page) {

        template.query = Partup.client.discover.composeTribeQueryObject();

        // Cancel possibly ongoing request
        if (template.partupsXMLHttpRequest) {
            template.partupsXMLHttpRequest.abort();
            template.partupsXMLHttpRequest = null;
        }

        var query = mout.object.deepFillIn({}, template.query);
        query.limit = PAGING_INCREMENT;
        query.skip = page * PAGING_INCREMENT;
        query.userId = Meteor.userId();
        query.token = Accounts._storedLoginToken();

        template.partupsXMLHttpRequest = null;
        HTTP.get('/tribes/discover' + mout.queryString.encode(query), {
            beforeSend: function(_request) {
                template.partupsXMLHttpRequest = _request;
            }
        }, function(error, response) {
            template.partupsXMLHttpRequest = null;

            if (error || !response.data.networks || response.data.networks.length === 0) {
                template.states.loading_infinite_scroll = false;
                template.states.paging_end_reached.set(true);
                return;
            }

            //  response.data contains all discovered part-ups with all relevant users.
            var result = response.data;
            template.states.paging_end_reached.set(result.networks.length < PAGING_INCREMENT);
            var tiles = result.networks.map(function(network) {
                Partup.client.embed.network(network, result['cfs.images.filerecord'], result.users);
                return network;
            });

            template.networks.set(tiles);
        });
    });
});

Template.app_discover_tribes.onRendered(function() {
    var template = this;
    template.page.set(0);
});

Template.app_discover_tribes.helpers({
    data: function() {
        var template = Template.instance();
        return {
            networks: function() {
                return template.networks.get();
            }
        };
    }
});
