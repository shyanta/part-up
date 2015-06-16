Template.app_partup_update.helpers({
    update_id: function() {
        return Router.current().params.update_id;
    },
    metaDataForUpdate: function() {
        var update = Updates.findOne({_id: Router.current().params.update_id});
        if (!update) return {};

        var updateUpper = Meteor.users.findOne({_id: update.upper_id});

        var path = '';
        if (update.type === 'partups_newuser') {
            path = Router.path('profile', {_id: update.upper_id});
        } else if (update.type.indexOf('partups_contributions_') > -1) {
            var activityUpdateId = Activities.findOne({_id: update.type_data.activity_id}).update_id;
            path = Router.path('partup-update', {_id: update.partup_id, update_id: activityUpdateId});
        } else {
            path = Router.path('partup-update', {_id: update.partup_id, update_id: update._id});
        }

        return {
            updateUpper: updateUpper,
            updated_at: update.updated_at,
            path: path,
            update_type: update.type,
            invited_name: update.type_data.invited_name
        };
    }
});
