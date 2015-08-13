var partupsToColumnTiles = function(partups) {
    return lodash.map(partups, function(partup) {
        return {
            partup: partup,
            HIDE_TAGS: true
        };
    });
};

Template.app_home.onCreated(function() {
    var tpl = this;

    tpl.popular_partups = {
        layout: {}
    };

    // Call first four discover part-ups and add them to the UI
    Meteor.call('partups.discover', {sort: 'popular', limit: 4}, function(error, partupIds) {
        if (tpl.view.isDestroyed) return;

        tpl.subscribe('partups.by_ids', partupIds, {
            onReady: function() {
                var popular_partups = Partups.find({_id: {$in: partupIds}}).fetch();

                if (popular_partups.length > 0) {
                    tpl.popular_partups.layout.add(partupsToColumnTiles(popular_partups));
                }
            }
        });
    });
});

Template.app_home.helpers({
    featured_partup: function() {
        // return Partups.findFeaturedForHome();
    },
    videoWatched: function() {
        return Session.get('home.videowatched');
    },
    greeting: function() {
        var daypart;
        var hour = moment().hours();

        if (hour < 6) daypart = 'night';
        else if (hour < 12) daypart = 'morning';
        else if (hour < 18) daypart = 'afternoon';
        else if (hour < 24) daypart = 'evening';
        else daypart = 'fallback';

        return __('pages-app-home-loggedin-greeting-' + daypart);
    },
    firstName: function() {
        return User(Meteor.user()).getFirstname();
    },

    // For the columnLayout for popular partups
    amountOfColumns: function() {
        var width = Partup.client.screensize.current.get('width');

        var template = Template.instance();
        Meteor.defer(function() {
            template.popular_partups.layout.rerender();
        });

        if (width >= 992) return 4;
        if (width >= 600) return 2;
        return 1;
    },

    // We use this trick to be able to call a function in a child template.
    // The child template directly calls 'addToLayoutHook' with a callback.
    // We save that callback, so we can call it later and the child template can react to it.
    addToLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.popular_partups.layout.add = callback;
        };
    },
    clearLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.popular_partups.layout.clear = callback;
        };
    },
    rerenderLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.popular_partups.layout.rerender = callback;
        };
    }
});

Template.app_home.events({
    'click [data-open-video-modal]': function(event, template) {
        event.preventDefault();

        // Open the video popup
        Partup.client.popup.open('video', function() {

            // We explicitely want to use localstorage here
            Session.set('home.videowatched', true);

        });
    }
});
