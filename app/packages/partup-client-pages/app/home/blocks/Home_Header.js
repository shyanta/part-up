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
    'click [data-what-is-partup], mousewheel [data-header]': function(event, template) {
        // event.preventDefault();
        if (template.data.reactiveHeaderExpanded.curValue) return;

        template.data.reactiveHeaderExpanded.set(true);

        $('[data-what-is-partup]').addClass('pu-home-header__button--is-clicked');

        $('body').removeClass('pu-prevent-scrolling');

        $('[data-header]').addClass('pu-home-header--is-collapsed');
    }
});

Template.Home_Header_CallToAction.events({
    'input [data-register-email]': function(event, template) {
        template.email = $('[data-register-email]').val();
    },
    'click [data-register-button]': function(event, template) {
        Router.go('register', {}, {query: 'email=' + template.email});
    },
    'submit [data-register-form]': function(event, template) {
        event.preventDefault();
        Router.go('register', {}, {query: 'email=' + template.email});
    }
});
