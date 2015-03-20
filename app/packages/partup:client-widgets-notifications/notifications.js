Template.WidgetNotifications.rendered = function(){
    Partup.ui.dropdown.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetNotifications.destroyed = function(){
    // remove click handler on destroy
    Partup.ui.dropdown.removeOutsideDropdownClickHandler(this);
}

Template.WidgetNotifications.events({
    'click [data-toggle-menu]': function eventClickOpenMenu(event, template) {
        template.namespace = 'partials.dropdown.notifications.opened'
        var currentState = Session.get(template.namespace);
        Session.set(template.namespace, !currentState);
        template.buttonClicked = true;
    }
})

Template.WidgetNotifications.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.notifications.opened');
    }
});
