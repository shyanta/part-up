/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_home.helpers({
    shrinkHeader: function() {
        return Partup.client.scroll.pos.get() > 40;
    },
    videoWatched: function() {
        return Session.get('home.videowatched');
    },
    firstName: function() {
        return User(Meteor.user()).getFirstname();
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
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_home.events({
    'click [data-open-video-modal]': function clickTranslate (event, template) {
        event.preventDefault();

        // Open the video popup
        Partup.client.popup.open('video', function() {

            // We explicitely want to use localstorage here
            Session.set('home.videowatched', true);

        });
    }
});
