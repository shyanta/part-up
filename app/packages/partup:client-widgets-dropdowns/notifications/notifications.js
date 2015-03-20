Template.WidgetDropdownNotifications.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partials.dropdown.notifications.opened';
    this.animationToggleBool = 'partials.dropdown.notifications.animationDone';
    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetDropdownNotifications.destroyed = function(){
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    Session.set(this.animationToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.WidgetDropdownNotifications.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler
})

Template.WidgetDropdownNotifications.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.notifications.opened');
    },
    animationDone: function(){
        return Session.get('partials.dropdown.notifications.animationDone');
    }
});
