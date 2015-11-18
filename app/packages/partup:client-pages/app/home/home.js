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

    tpl.video = new ReactiveVar(false);

    // Popular partups
    tpl.popular_partups = {
        layout: {}
    };

    // Featured partup
    tpl.featured_partup = new ReactiveVar();

    this.autorun(function() {
        if (Partup.client.language.current.get() == undefined) return;

        var currentLanguage = Partup.client.language.current.get();

        // Call first four discover part-ups and add them to the UI
        Partup.client.API.get('/partups/home/' + currentLanguage, {}, function(error, result) {
            if (error) return;

            var popular_partup_ids = lodash.pluck(get(result, 'partups'), '_id');
            var popular_partups = Partups.find({_id: {$in: popular_partup_ids}}).fetch();

            if (popular_partups.length > 0) {
                tpl.popular_partups.layout.add(partupsToColumnTiles(popular_partups));
            }
        });

        // Call one featured part-up
        Partup.client.API.get('/partups/featured_one_random/' + currentLanguage, {}, function(error, result) {
            if (error) return;

            var featured_partup_ids = lodash.pluck(get(result, 'partups'), '_id');
            var featured_partup = Partups.findOne({_id: {$in: featured_partup_ids}});

            tpl.featured_partup.set(featured_partup);
        });
    });
});

Template.app_home.helpers({
    featured_partup: function() {
        return Template.instance().featured_partup.get();
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
        var width = Partup.client.screen.size.get('width');

        var template = Template.instance();
        Meteor.defer(function() {
            template.popular_partups.layout.rerender();
        });

        if (width > 1024) return 4;
        if (width >= 600) return 2;
        return 1;
    },

    playVideo: function() {
        return Template.instance().video.get();
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
    'click [data-start-video]': function(event, template) {
        event.preventDefault();
        template.video.set(true);
        Meteor.setTimeout(function() {
            Session.set('home.videowatched', true);
        }, 500);

        Partup.client.scroll.to(event.currentTarget, -30, {
            duration: 800
        });
    }
});
