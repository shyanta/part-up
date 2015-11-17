
Template.app_profile_about.onCreated(function() {
    var tpl = this;
    tpl.loadingProfile = new ReactiveVar(true);
    var profileId = tpl.data.profileId;

    tpl.tiles = {

        // States
        loading: new ReactiveVar(false),

        // Namespace for columns layout functions (added by helpers)
        layout: {
            items: [],
            count: new ReactiveVar(0)
        },

        // Options reactive variable (on change, clear the layout and re-add all partups)
        init: function(results) {
            if (typeof profileId == 'string') {
                tpl.tilesSubscription = tpl.subscribe('tiles.profile', profileId, {
                    onReady: function() {
                        var tiles = Tiles.find({upper_id: profileId}).fetch();
                        var user = Meteor.users.findOne(profileId);
                        if (!tiles || !tiles.length) {
                            tiles.push({
                                type: 'image',
                                placeholder: true
                            });
                        }
                        var meurs = {};
                        if (user.profile.meurs) {
                            meurs = user.profile.meurs;
                        }
                        tiles.unshift({
                            type: 'result',
                            user: user,
                            meurs: meurs
                        });
                        tpl.loadingProfile.set(false);
                        tpl.tiles.layout.items = tpl.tiles.layout.clear();
                        tpl.tiles.layout.items = tpl.tiles.layout.add(tiles);
                    }
                });
            }
        },
        refresh: function(res) {
            var results = res || false;
            tpl.tilesSubscription.stop();
            tpl.tiles.init(results);
        }
    };

    // First run
    tpl.tiles.init();
});

Template.app_profile_about.events({
    'click [data-create-tile]': function(event, template) {
        var type = $(event.currentTarget).closest('[data-create-tile]').data('create-tile');
        Partup.client.popup.open({
            id: 'new-' + type
        }, function(result) {
            template.tiles.refresh();
        });
    },
    'click [data-start-test]': function(event, template) {
        Meteor.call('meurs.create_test', function(error, url) {
            if (url) document.location.href = url;
        });
    },
    'click [data-delete]': function(event, template) {
        var tile = this;
        var tileId = tile._id;
        Partup.client.prompt.confirm({
            title: __('pages-app-profile-about-tile-prompt-title'),
            message: __('pages-app-profile-about-tile-prompt-message'),
            onConfirm: function() {
                Meteor.call('tiles.remove', tileId, function(error, result) {
                    if (error) {
                        Partup.client.notify.error(__(error));
                        return;
                    }
                    Partup.client.notify.success('Tile removed');
                    template.tiles.refresh();
                });
            }
        });
    }

});

Template.app_profile_about.helpers({
    firstname: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getFirstname();
    },
    isCurrentusersProfile: function() {
        return this.profileId === Meteor.userId();
    },

    // We use this trick to be able to call a function in a child template.
    // The child template directly calls 'addToLayoutHook' with a callback.
    // We save that callback, so we can call it later and the child template can react to it.
    addToLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.tiles.layout.add = callback;
        };
    },
    clearLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.tiles.layout.clear = callback;
        };
    },
    rerenderLayoutHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.tiles.layout.rerender = callback;
        };
    },
    amountOfColumns: function() {
        var tpl = Template.instance();
        var smaller = Partup.client.screensize.current.get('width') < Partup.client.grid.getWidth(11) + 80;
        Meteor.defer(function() {
            tpl.tiles.layout.rerender();
        });
        return smaller ? 1 : 2;
    },

    profileLoading: function() {
        return Template.instance().loadingProfile.get();
    }
});
