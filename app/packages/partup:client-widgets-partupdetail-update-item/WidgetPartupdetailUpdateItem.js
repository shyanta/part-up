/*************************************************************/
/* Widget reactives */
/*************************************************************/
var commentsExpandedDict = new ReactiveDict;


/*************************************************************/
/* Widget rendered */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.onRendered(function () {
    commentsExpandedDict.set(this.data.update._id, this.data.update.comments.length > 0);
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.helpers({

    'titleKey': function titleKey () {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    'commentsExpanded': function commentsExpanded () {
        return commentsExpandedDict.get(this.update._id);
    }

});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.events({
    
    'click [data-expand-comment-field]': function eventClickExpandCommentField (event, template) {
        commentsExpandedDict.set(template.data.update._id, true);
    },

    'submit [data-addcomment]': function eventSubmitAddComment (event, template) {
        event.preventDefault();
        var form = event.currentTarget;
        var commentValue = lodash.find(form, {name: 'commentValue'}).value;


        // temp reactive var until mongo implementation
        var updates = template.data.updateVar.get();
        lodash.find(updates, { _id: template.data.update._id }).comments.push({
            user: {
                fullname: 'Testgebruiker'
            },
            content: commentValue
        });
        template.data.updateVar.set(updates);
        

        // todo: mongo implementation
        // --

        form.reset();
    }

});
