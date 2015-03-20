Template.PartialsDropdownMenu.rendered = function(){
    Partup.ui.dropdown.addOutsideDropdownClickHandler(this, '[data-clickoutside-close]', '[data-toggle-menu]');
}

Template.PartialsDropdownMenu.destroyed = function(){
    // remove click handler on destroy
    Partup.ui.dropdown.removeOutsideDropdownClickHandler(this);
}
Template.PartialsDropdownMenu.events({
    'click [data-toggle-menu]': function eventClickOpenMenu(event, template) {
        template.namespace = 'partials.dropdown.menu.opened'
        var currentState = Session.get(template.namespace);
        Session.set(template.namespace, !currentState);
        template.buttonClicked = true;
    }
})

Template.PartialsDropdownMenu.helpers({
    menuOpen: function(){
        return Session.get('partials.dropdown.menu.opened');
    }
});