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

        if (!upper || !partup.hasUpper(upper._id)) throw new Meteor.Error(401, 'unauthorized');

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
            throw new Meteor.Error(400, 'activity_could_not_be_inserted');
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
        var partup = Partups.findOneOrFail(activity.partup_id);

        if (!upper || !partup.hasUpper(upper._id)) {
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(500, 'activity_could_not_be_updated');
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
        var partup = Partups.findOneOrFail({_id: activity.partup_id});

        if (!upper || !partup.hasUpper(upper._id)) {
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(500, 'activity_could_not_be_removed');
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
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(500, 'activity_could_not_be_unarchived');
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
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(500, 'activity_could_not_be_archived');
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
            throw new Meteor.Error(401, 'unauthorized');
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
            throw new Meteor.Error(500, 'activities_could_not_be_copied_from_partup');
        }
    },

    /**
     * Get user suggestions for a given activity
     *
     * @param {String} activityId
     * @param {Object} options
     * @param {Number} options.locationId
     * @param {String} options.query
     *
     * @return {[String]}
     */
    'activities.user_suggestions': function(activityId, options) {
        this.unblock();

        var upper = Meteor.user();

        if (!upper) {
            throw new Meteor.Error(401, 'Unauthorized');
        }

        var users = Partup.server.services.matching.matchUppersForActivity(activityId, options);

        // We are returning an array of IDs instead of an object
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
    'activities.invite_by_email': function(activityId, email, name) {
        var inviter = Meteor.user();

        if (!inviter) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var activity = Activities.findOneOrFail(activityId);
        var partup = Partups.findOneOrFail(activity.partup_id);

        var isAllowedToAccessPartup = !!Partups.guardedFind(inviter._id, {_id: activity.partup_id}).count() > 0;
        if (!isAllowedToAccessPartup) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var isAlreadyInvited = !!Invites.findOne({
            activity_id: activityId,
            invitee_email: email,
            type: Invites.INVITE_TYPE_ACTIVITY_EMAIL
        });
        if (isAlreadyInvited) {
            throw new Meteor.Error(403, 'email_is_already_invited_to_activity');
        }

        var locale = User(inviter).getLocale();

        // Compile the E-mail template and send the email
        SSR.compileTemplate('inviteUserActivityEmail', Assets.getText('private/emails/InviteUserToActivity.' + locale + '.html'));
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
                inviterName: inviter.profile.name,
                url: url
            })
        });

        var invite = {
            type: Invites.INVITE_TYPE_ACTIVITY_EMAIL,
            activity_id: activity._id,
            inviter_id: inviter._id,
            invitee_name: name,
            invitee_email: email,
            created_at: new Date
        };

        Invites.insert(invite);
    },

    /**
     * Invite an existing upper to an activity
     *
     * @param {String} activityId
     * @param {String} inviteeId
     */
    'activities.invite_existing_upper': function(activityId, inviteeId) {
        var inviter = Meteor.user();
        if (!inviter) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var activity = Activities.findOneOrFail(activityId);
        var invitee = Meteor.users.findOneOrFail(inviteeId);

        var isAllowedToAccessPartup = !!Partups.guardedFind(inviter._id, {_id: activity.partup_id}).count() > 0;
        if (!isAllowedToAccessPartup) {
            throw new Meteor.Error(401, 'unauthorized');
        }

        var isAlreadyInvited = !!Invites.findOne({
            activity_id: activityId,
            invitee_id: invitee._id,
            inviter_id: inviter._id,
            type: Invites.INVITE_TYPE_ACTIVITY_EXISTING_UPPER
        });
        if (isAlreadyInvited) {
            throw new Meteor.Error(403, 'user_is_already_invited_to_activity');
        }

        var partup = Partups.findOneOrFail(activity.partup_id);

        var notificationOptions = {
            userId: invitee._id,
            type: 'partup_activities_invited',
            typeData: {
                inviter: {
                    _id: inviter._id,
                    name: inviter.profile.name,
                    image: inviter.profile.image
                },
                activity: {
                    _id: activityId,
                    name: activity.name
                },
                partup: {
                    _id: partup._id,
                    name: partup.name,
                    slug: partup.slug
                }
            }
        };

        Partup.server.services.notifications.send(notificationOptions);

        var invite = {
            type: Invites.INVITE_TYPE_ACTIVITY_EXISTING_UPPER,
            activity_id: activity._id,
            inviter_id: inviter._id,
            invitee_id: invitee._id,
            created_at: new Date
        };

        Invites.insert(invite);

        // Add to the invite list of the partup
        var partup = Partups.findOneOrFail(activity.partup_id);
        if (!partup.hasInvitedUpper(invitee._id)) {
            Partups.update(partup._id, {$addToSet: {invites: invitee._id}});
        }

        // Compile the E-mail template and send the email
        var locale = User(inviter).getLocale();
        SSR.compileTemplate('inviteUserActivityEmail', Assets.getText('private/emails/InviteUserToActivity.' + locale + '.html'));
        var url = Meteor.absoluteUrl() + 'partups/' + partup._id;

        Email.send({
            from: 'Part-up <noreply@part-up.com>',
            to: User(invitee).getEmail(),
            subject: 'Invite for ' + activity.name + ' in Part-up ' + partup.name,
            html: SSR.render('inviteUserActivityEmail', {
                name: invitee.profile.name,
                partupName: partup.name,
                partupDescription: partup.description,
                activityName: activity.name,
                activityDescription: activity.description,
                inviterName: inviter.profile.name,
                url: url
            })
        });
    }
});
