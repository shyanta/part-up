Template.WidgetProfile.rendered = function(){
    Partup.ui.dropdown.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
    //
}

Template.WidgetProfile.destroyed = function(){
    // remove click handler on destroy
    Partup.ui.dropdown.removeOutsideDropdownClickHandler(this);
}

Template.WidgetProfile.events({
    'click [data-toggle-menu]': function eventClickOpenMenu(event, template) {
        template.namespace = 'partials.dropdown.profile.opened';
        var currentState = Session.get(template.namespace);
        Session.set(template.namespace, !currentState);
        template.buttonClicked = true;
        
    },
    'click [data-logout]': function eventClickLogout (event, template) {
        Meteor.logout();
    }
})

Template.WidgetProfile.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.profile.opened');
    }
});
