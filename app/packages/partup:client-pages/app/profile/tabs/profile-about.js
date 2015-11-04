var tileStub = [{
    image_id: 'raaNx9aqA6okiqaS4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia animi voluptas vero officiis repudiandae obcaecati eius hic veniam alias quos.',
    type: 'image'
},
{
    image_id: 'raaNx9aqA6okiqaS4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia animi voluptas vero officiis repudiandae obcaecati eius hic veniam alias quos.',
    type: 'image'
},
{
    image_id: 'raaNx9aqA6okiqaS4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia animi voluptas vero officiis repudiandae obcaecati eius hic veniam alias quos.',
    type: 'image'
},
{
    image_id: 'raaNx9aqA6okiqaS4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia animi voluptas vero officiis repudiandae obcaecati eius hic veniam alias quos.',
    type: 'image'
},
{
    image_id: 'raaNx9aqA6okiqaS4',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia animi voluptas vero officiis repudiandae obcaecati eius hic veniam alias quos.',
    type: 'image'
}];

Template.app_profile_about.onCreated(function() {
    var tpl = this;

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
        init: function() {
            if (typeof profileId == 'string') {
                tpl.subscribe('tiles.profile', profileId, {
                    onReady: function() {
                        var tiles = Tiles.find({upper_id: profileId}).fetch();
                        var user = Meteor.users.findOne(profileId);
                        user.profile.meurs = {
                            results: ['brainiac', 'organizer', 'socializer', 'manager', 'individual']
                        };
                        console.log(user);
                        if (!tiles || !tiles.length) {
                            Partup.client.notify.error('nope');
                            return;
                        }
                        if (user.profile.meurs && user.profile.meurs.results) {
                            tiles.unshift({
                                type: 'result',
                                result_ids: user.profile.meurs.results
                            });
                        }
                        console.log(tiles)
                        tpl.tiles.layout.items = tpl.tiles.layout.clear();
                        tpl.tiles.layout.items = tpl.tiles.layout.add(tiles);
                    }
                });
            }
        }
    };

    // First run
    tpl.tiles.init();
});

Template.app_profile_about.events({
    'click [data-create-tile]': function(event, template) {
        var type = $(event.currentTarget).closest('[data-create-tile]').data('create-tile');
        console.log(type);
        Partup.client.popup.open({
            id: 'new-' + type
        }, function(result) {
            console.log(result);
        });
    },

});

Template.app_profile_about.helpers({
    firstname: function() {
        var user = Meteor.users.findOne(this.profileId);
        return User(user).getFirstname();
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
    }
});
