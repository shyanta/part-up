Template.WidgetDropdownMenu.rendered = function(){
    // this = template
    this.dropdownToggleBool = 'partials.dropdown.menu.opened';

    // set default boolean values    
    Session.set(this.dropdownToggleBool, false);

    ClientWidgetsDropdowns.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.WidgetDropdownMenu.destroyed = function(){
    // remove click handler on destroy
    Session.set(this.dropdownToggleBool, false);
    ClientWidgetsDropdowns.removeOutsideDropdownClickHandler(this);
}

Template.WidgetDropdownMenu.events({
    'click [data-toggle-menu]': ClientWidgetsDropdowns.dropdownClickHandler
})

Template.WidgetDropdownMenu.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.menu.opened');
    }
});