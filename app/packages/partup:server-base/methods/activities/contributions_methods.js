Meteor.methods({
    /**
     * Insert a contribution in an Activity
     *
     * @param {mixed[]} fields
     */
    'activities.contributions.insert': function (activityId, fields) {
        var upper = Meteor.user();
        if (!upper) throw new Meteor.Error(401, 'Unauthorized.');

        // TODO: Validation

        var activity = Activities.findOneOrFail(activityId);

        try {
            var contribution = {};
            contribution.created_at = Date.now();
            contribution.updated_at = Date.now();
            contribution.upper_id = upper._id;

            var types = [];
            if (fields.want) {
                types.push({
                    'type': 'want'
                });
            }
            if (fields.have) {
                types.push({
                    'type': 'have',
                    'type_data': {
                        'amount': fields.type_have_amount,
                        'description': fields.type_have_description
                    }
                });
            }
            if (fields.can) {
                types.push({
                    'type': 'can',
                    'type_data': {
                        'amount': fields.type_can_amount,
                        'description': fields.type_can_description
                    }
                });
            }

            contribution.types = types;

            Activities.update(activityId, {$push: {'contributions': contribution}});
            Event.emit('activities.contributions.inserted', activity, contribution);

            return true;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Contribution could not be inserted.');
        }
    },

});
