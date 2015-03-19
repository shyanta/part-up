Partup.ui.dropdown = function(template){
    // remember myself
    var self = template;
    // find the dropdown
    var dropdown = template.find('[data-clickoutside-close]');
    // find the toggle button
    var button = template.find('[data-toggle-menu]');
    
    // put the documentClickHandler in the template namespace, 
    // so more than one documentclickhandlers dan be created
    template.documentClickHandler = function(e){

        // see if the click was on the dropdown button
        if(self.buttonClicked) {
            self.buttonClicked = false;
            return;
        }

        // check if a child element of the dropdown was clicked
        var dropdownClicked = $.inArray(dropdown, $(e.target).parents());
        if(dropdownClicked > -1) return;

        // close the dropdown
        Session.set(self.namespace, false);
    }
    // add click handler
    document.addEventListener('click', template.documentClickHandler);
};