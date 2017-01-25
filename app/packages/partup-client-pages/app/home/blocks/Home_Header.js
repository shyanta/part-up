// Meteor.startup(function() {
//     Session.set('partup-fullScreenHome', true);
// });

Template.Home_Header.onCreated(function() {
    $('body').addClass('pu-prevent-scrolling');
});

Template.Home_Header.onDestroyed(function() {
    $('body').removeClass('pu-prevent-scrolling');
});

Template.Home_Header.helpers({
    greeting: function() {
        var daypart;
        var hour = moment().hours();

        if (hour < 6) daypart = 'night';
        else if (hour < 12) daypart = 'morning';
        else if (hour < 18) daypart = 'afternoon';
        else if (hour < 24) daypart = 'evening';
        else daypart = 'fallback';

        return TAPi18n.__('pages-app-home-loggedin-greeting-' + daypart);
    },
    firstName: function() {
        return User(Meteor.user()).getFirstname();
    }
});

Template.Home_Header.events({
    'click [data-what-is-partup]': function(event, template) {
        event.preventDefault();

        // Session.set('partup-fullScreenHome', false);

        $(event.currentTarget).addClass('pu-home-header__button--is-clicked');

        $('body').removeClass('pu-prevent-scrolling');

        $('[data-header]').addClass('pu-home-header--is-collapsed');
    }
});
