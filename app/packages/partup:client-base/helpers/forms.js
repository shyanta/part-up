Meteor.startup(function(){

    /*************************************************************/
    /* Global autoform hooks */
    /*************************************************************/
    AutoForm.addHooks(null, {
        beginSubmit: function() {
            Partup.ui.forms.removeAllStickyFieldErrors(this);
        }
    });

});