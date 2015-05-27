Template.CopyActivityPopup.onRendered(function() {
    Meteor.typeahead.inject();
});

// Initialize selected Partup variable to store ID in when selected
var selectedPartup;

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find({}).map(function (partup) {
            return { id: partup._id, value: partup.name };
        });
    },
    selected: function(event, suggestion) {
        selectedPartup = suggestion.id;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
            }
        });
    }
});