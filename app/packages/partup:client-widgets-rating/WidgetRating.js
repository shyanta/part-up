/**
 * A widget that will render a single rating
 *
 * @param {Object} contribution   The contribution on which this rating is applied
 * @param {Object} rating   The rating data
 */

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetRating.onCreated(function(){
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRating.helpers({
    canEdit: function(){
        var user = Meteor.user();
        if (!user) return false;

        var partup = Partups.findOne({_id: this.contribution.partup_id});
        if (!partup) return false;

        return true;
    },
    formSchema: Partup.schemas.forms.rating,
    generateFormId: function(){
        if (this.rating){
            return 'ratingEditForm-' + this.rating._id;
        }

        return 'ratingCreateForm-' + this.contribution._id;
    },
    placeholders: Partup.services.placeholders.rating,
    upper: function(){
        return Meteor.user();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetRating.events({
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        if (!/rating(Create|Edit)Form/.test(this.formId)) return;

        return false;
    }
});
