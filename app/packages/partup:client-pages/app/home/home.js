Template.app_home.helpers({
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
