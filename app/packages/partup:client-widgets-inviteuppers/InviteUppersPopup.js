Template.InviteUppersPopup.helpers({
    formSchema: Partup.schemas.forms.inviteUpper
});

AutoForm.hooks({
    inviteUppersForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;
            Meteor.call('partups.invite', Router.current().params._id, insertDoc.email, insertDoc.name);
            Partup.ui.popup.close();

            return false;
        }
    }
});