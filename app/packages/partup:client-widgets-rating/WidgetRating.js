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
    this.contribution = this.data.contribution;
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetRating.helpers({
    canEdit: function(){
        var user = Meteor.user();
        if (!user) return false;

        if (this.rating && this.rating.upper_id !== user._id) return false;

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
var save = function(event, template){
    var form = template.find('#ratingCreateForm-' + template.data.contribution._id);
    $(form).submit();
};

Template.WidgetRating.events({
    'blur [name=feedback]': save,
    'blur [name=rating]': save
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.addHooks(null, {
    onSubmit: function(doc){
        if (!/rating(Create|Edit)Form/.test(this.formId)) return;

        var self = this;
        var template = this.template.parentTemplate();

        Meteor.call('ratings.insert', template.contribution._id, doc, function(error){
            if (error){
                return console.error(error);
            }

            self.done();
        });

        return false;
    }
});
