Template.CopyActivityPopup.onRendered(function () {
    Meteor.typeahead.inject();
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find({}).map(function (partup) {
            return { id: partup._id, value: partup.name };
        });
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
            }
        });
    }
});