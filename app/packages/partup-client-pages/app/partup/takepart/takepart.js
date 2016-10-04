Template.app_partup_takepart.helpers({
    partup: function() {
        return Partups.findOne({_id: this.partupId});
    },
    form: function() {
        return {
            schema: Partup.schemas.entities.updateComment
        };
    }
});

AutoForm.hooks({
    becomePartnerForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            console.log('dhjsfhdfkhdasfjkh');
        }
    }
});

