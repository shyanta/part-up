ClientDropdowns = {
    addOutsideDropdownClickHandler: function(template, dropdownSelector, buttonSelector, altkey) {
        // remember myself
        var self = template;

        // find the dropdown
        var dropdown = template.find(dropdownSelector);

        // find the toggle button
        var button = template.find(buttonSelector);

        // put the documentClickHandler in the template namespace,
        // so more than one documentclickhandlers dan be created
        template.documentClickHandler = function(e){

            // see if the click was on the dropdown button
            if (altkey ? self[altkey + '-clicked'] : self.buttonClicked) {
                if (altkey) {
                    self[altkey + '-clicked'] = false;
                } else {
                    self.buttonClicked = false;
                }
                return;
            }

            // check if a child element of the dropdown was clicked
            var dropdownClicked = $.inArray(dropdown, $(e.target).parents());
            if (dropdownClicked > -1) return;

            // close the dropdown
            Session.set(self[altkey || 'dropdownToggleBool'], false);
        };
        // add click handler
        document.addEventListener('click', template.documentClickHandler);
    },
    removeOutsideDropdownClickHandler: function(template){
        document.removeEventListener('click', template.documentClickHandler);
    },
    dropdownClickHandler: function(event, template){
        // get current state of the dropdown
        var dropdownOpen = Session.get(template.dropdownToggleBool);
        Session.set(template.dropdownToggleBool, !dropdownOpen);
        template.buttonClicked = true;
    },
    customDropdownSwitch: function(template, key) {
        // get current state of the dropdown
        var dropdownOpen = Session.get(template[key]);
        var newState = !dropdownOpen;
        Session.set(template[key], newState);
        template[key + '-clicked'] = true;

        return newState;
    }
};

Partup.client.ClientDropdowns = ClientDropdowns;
