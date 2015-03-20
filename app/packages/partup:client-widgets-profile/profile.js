Template.WidgetProfile.rendered = function(){
    // this = template
    this.namespace = 'partials.dropdown.profile.opened';
    Partup.ui.dropdown.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetProfile.destroyed = function(){
    // this = template
    // remove click handler on destroy
    Session.set(this.namespace, false);
    Partup.ui.dropdown.removeOutsideDropdownClickHandler(this);
}

Template.WidgetProfile.events({
    'click [data-toggle-menu]': function eventClickOpenMenu(event, template) {
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
