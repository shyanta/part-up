/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetPartupdetailUpdateItem.helpers({
    'partupId': function(){
        return Router.current().params._id;
    },
    'activityData': function(){
        var activityId = Template.instance().data.update.type_data.activity_id;
        // debugger;
        return Activities.findOne({_id: activityId});
    },
    isDetail: function(){
        var update_id = Router.current().params.update_id;
        if(update_id) {
            return true;
        } else {
            return false;
        }
    },
    'titleKey': function helperTitleKey() {
        return 'partupdetail-update-item-type-' + this.update.type + '-title';
    },

    'updateUpper': function getUpdateUpper() {
        var user = Meteor.users.findOne({_id: this.update.upper_id});

        if (user.profile && user.profile.image) {
            user.profile.image = Images.findOne({_id: user.profile.image});
        }

        return user;
    },

    'getImageUrlById': function getImageUrlById(imageId) {
        var image = Images.findOne({_id: imageId});
        if(image) return image.url();
        return '';
    }

});
