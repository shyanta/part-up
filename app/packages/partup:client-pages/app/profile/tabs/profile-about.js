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
                Meteor.call('tiles.profile', profileId, function(error, tiles) {
                    if (error) {
                        Partup.client.notify.error(error);
                        return;
                    }
                    tpl.tiles.layout.items = tpl.tiles.layout.clear();
                    tpl.tiles.layout.items = tpl.tiles.layout.add(tiles);
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
