/*************************************************************/
/* Widget initial */
/*************************************************************/


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.CopyActivityPopup.helpers({
    partups: function () {
        return Partups.find().fetch().map(function (partup) {
            console.log(partup.name);
            return { id: partup._id, value: partup.name };
        });
    }
});

Template.CopyActivityPopup.rendered = function() {
    Meteor.typeahead.inject();
};

/*************************************************************/
/* Widget form hooks */
/*************************************************************/