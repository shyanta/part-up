Template.WidgetNotifications.rendered = function(){
    // this = template
    this.namespace = 'partials.dropdown.notifications.opened';
    Partup.ui.dropdown.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetNotifications.destroyed = function(){
    // remove click handler on destroy
    Session.set(this.namespace, false);
    Partup.ui.dropdown.removeOutsideDropdownClickHandler(this);
}

Template.WidgetNotifications.events({
    'click [data-toggle-menu]': function eventClickOpenMenu(event, template) {
        var currentState = Session.get(template.namespace);
        Session.set(template.namespace, !currentState);
        template.buttonClicked = true;
    }
})

Template.WidgetNotifications.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.notifications.opened');
    },
    notifications: function(){
        return Notifications.find();
    }
});
