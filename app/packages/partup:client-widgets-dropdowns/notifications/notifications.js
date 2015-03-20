Template.WidgetDropdownNotifications.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'widget-dropdown-notifications.opened';

    // set default boolean values    
    Session.set(this.dropdownToggleBool, false);

    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetDropdownNotifications.destroyed = function(){
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.WidgetDropdownNotifications.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler
})

Template.WidgetDropdownNotifications.helpers({
    menuOpen: function(){
        return Session.get('widget-dropdown-notifications.opened');
    },
    notifications: function () {
        return Notifications.find();
    }
});
