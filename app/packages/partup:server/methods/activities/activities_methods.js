Meteor.methods({
    /**
     * Insert an Activity
     *
     * @param {string} partupId
     * @param {mixed[]} fields
     */
    'activities.insert': function(partupId, fields) {
        check(fields, Partup.schemas.forms.startActivities);
        var upper = Meteor.user();
        var partup = Partups.findOneOrFail({_id: partupId});

        if (!upper || !partup.hasUpper(upper._id)) throw new Meteor.Error(401, 'Unauthorized.');

        try {
            var activity = Partup.transformers.activity.fromForm(fields, upper._id, partupId);

            activity._id = Activities.insert(activity);

            // Update the activity count of the Partup
            Partups.update(partupId, {
                $inc: {
                    activity_count: 1
                }
            });

            return {
                _id: activity._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(400, 'Activity could not be inserted.');
        }
    },

    /**
     * Update an Activity
     *
     * @param {string} activityId
     * @param {mixed[]} fields
     */
    'activities.update': function(activityId, fields) {
        check(fields, Partup.schemas.forms.startActivities);
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail({_id: activity.partup_id});

        if (!activity) {
            throw new Meteor.Error(404, 'Could not find activity.');
        }

        if (!upper || !partup.hasUpper(upper._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            var updatedActivity = Partup.transformers.activity.fromForm(fields, activity.creator_id, activity.partup_id);
            updatedActivity.updated_at = new Date();

            Activities.update(activityId, {$set: updatedActivity});

            // Post system message
            Partup.server.services.system_messages.send(upper, activity.update_id, 'system_activities_updated');

            return {
                _id: activity._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity could not be updated.');
        }
    },

    /**
     * Remove an Activity
     *
     * @param {string} activityId
     */
    'activities.remove': function(activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);

        if (!upper || activity.creator_id !== upper._id) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.remove(activityId);

            // Update the activity count of the Partup
            Partups.update(activity.partup_id, {
                $inc: {
                    activity_count: -1
                }
            });

            // Post system message
            Partup.server.services.system_messages.send(upper, activity.update_id, 'system_activities_removed');

            return {
                _id: activity._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be removed.');
        }
    },

    /**
     * Unarchive an Activity
     *
     * @param  {string} activityId
     */
    'activities.unarchive': function(activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail({_id: activity.partup_id});

        if (!upper || !partup.hasUpper(upper._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.update(activityId, {$set: {archived: false}});

            // Post system message
            Partup.server.services.system_messages.send(upper, activity.update_id, 'system_activities_unarchived');

            Event.emit('partups.activities.unarchived', upper._id, activity);

            return {
                _id: activity._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be unarchived.');
        }
    },

    /**
     * Archive an Activity
     *
     * @param  {string} activityId
     */
    'activities.archive': function(activityId) {
        var upper = Meteor.user();
        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail({_id: activity.partup_id});

        if (!upper || !partup.hasUpper(upper._id)) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        try {
            Activities.update(activityId, {$set: {archived: true}});

            // Post system message
            Partup.server.services.system_messages.send(upper, activity.update_id, 'system_activities_archived');

            Event.emit('partups.activities.archived', upper._id, activity);

            return {
                _id: activity._id
            };
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activity [' + activityId + '] could not be archived.');
        }
    },

    /**
     * Copy activities from one Partup to another
     *
     * @param  {string} fromPartupId
     * @param  {string} toPartupId
     */
    'activities.copy': function(fromPartupId, toPartupId) {
        var upper = Meteor.user();
        if (!upper) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        // Check if both Partup IDs are valid
        Partups.findOneOrFail(fromPartupId);
        Partups.findOneOrFail(toPartupId);

        try {
            var existingActivities = Activities.find({partup_id: fromPartupId});
            existingActivities.forEach(function(activity) {
                var newActivity = {
                    name: activity.name,
                    description: activity.description,
                    end_date: activity.end_date,
                    created_at: new Date(),
                    updated_at: new Date(),
                    creator_id: upper._id,
                    partup_id: toPartupId,
                    archived: false
                };

                Activities.insert(newActivity);
            });

            return true;
        } catch (error) {
            Log.error(error);
            throw new Meteor.Error(500, 'Activities from Partup [' + fromPartupId + '] could not be copied.');
        }
    },

    /**
     * Get user suggestions for a given activity
     *
     * @return {[String]}
     */
    'activities.user_suggestions': function(activityId) {
        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        var users = Partup.server.services.matching.matchUppersForActivity(activityId);

        return users.map(function(user) {
            return user._id;
        });
    },

    /**
     * Invite someone to an activity
     *
     * @param {String} activityId
     * @param {String} email
     * @param {String} name
     */
    'activities.invite': function(activityId, email, name) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        // TODO: Authorisation, who can invite a user?

        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail(activity.partup_id);

        var invites = activity.invites || [];
        var invitedEmails = mout.array.pluck(invites, 'email');

        if (invitedEmails.indexOf(email) > -1) {
            throw new Meteor.Error(403, 'Email is already invited to the given activity.');
        }

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserActivityEmail', Assets.getText('private/emails/InviteUserToActivity.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: email,
            subject: 'Uitnodiging voor de activiteit ' + activity.name + ' in Part-up ' + partup.name,
            html: SSR.render('inviteUserActivityEmail', {
                name: name,
                partupName: partup.name,
                partupDescription: partup.description,
                activityName: activity.name,
                activityDescription: activity.description,
                inviterName: user.profile.name,
                url: url
            })
        });

        // Save the invite on the partup for further references
        var invite = {
            name: name,
            email: email
        };

        Activities.update(activityId, {$push: {'invites': invite}});

        Event.emit('activities.invited', user._id, activityId, email, name);

        return true;
    },

    /**
     * Invite an existing upper to an activity
     *
     * @param {String} activityId
     * @param {String} upperId
     */
    'activities.invite_existing_upper': function(activityId, upperId) {
        var user = Meteor.user();

        if (!user) {
            throw new Meteor.Error(401, 'Unauthorized.');
        }

        var activity = Activities.findOneOrFail(activityId);
        var upper = Meteor.users.findOneOrFail(upperId);

        var invites = activity.invites || [];
        if (invites.indexOf(upperId) > -1) {
            throw new Meteor.Error(403, 'User is already invited to the given activity.');
        }

        var notificationOptions = {
            userId: upper._id,
            type: 'partup_activities_invited',
            typeData: {
                inviter: {
                    id: user._id,
                    name: user.profile.name,
                    image: user.profile.image
                }
            }
        };

        Partup.server.services.notifications.send(notificationOptions);

        Activities.update(activityId, {$push: {invites: upperId}});

        Event.emit('partups.activities.invited_existing_user', user._id, activityId, upperId);
    }

});
