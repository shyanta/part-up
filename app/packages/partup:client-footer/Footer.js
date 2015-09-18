var isMobile = new ReactiveVar();

Meteor.startup(function() {
    var onResize = lodash.debounce(function() {
        isMobile.set(window.innerWidth < 992);
    }, 20);

    $(window).on('load resize', onResize);
});

Template.Footer.helpers({
    isMobile: function() {
        return Partup.client.responsive.is() && isMobile.get();
    }
});

Template.Footer.events({
    'click [data-feedback]': function(event, template) {
        event.preventDefault();
        var $intercom = $('#intercom-launcher');
        if ($intercom.length > 0) {
            Intercom('showNewMessage');
        } else {
            window.location.href = 'mailto:' + __('footer-feedback-button-mailto') + '?subject=' + __('footer-feedback-button-mailto-subject');
        }
    }
});
