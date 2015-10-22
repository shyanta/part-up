# Part-up Events

## Introduction
The part-up application emits events internally when certain scenarios are triggered within the backend. There is internal handling code that listens to these events and responds with subsequent actions. In addition to the internal events, all these events are POSTed to a specified HTTP endpoint.

## Example flow 
when the user creates an activity through the ddp method `activities.insert`, a `partups.activities.inserted` event is triggered, containing the `userId` and the `activity` as arguments. The `partup:server/event_handlers/activities/activities_handler.js` file contains an event listener that reacts to the `partups.activities.inserted` event and creates an update for this activity and notifies certain users that this event has occurred.

Meanwhile, the `partups.activities.inserted` event is POSTed to https://api.part-up.com/events as an HTTP message. The server listening to these messages could now react on the insertion of the activity.

## Event specification

### Collection events

Most collection automatically emit `*.inserted`, `*.updated`, `*.changed`, `*.removed` events when the collection is altered.

event arguments
- eventname
- userId
- document
- previous document (optional)

events
- partups.inserted
- partups.updated
- partups.changed
- partups.removed
- partups.activities.inserted
- partups.activities.updated
- partups.activities.changed
- partups.activities.removed
- partups.updates.inserted
- partups.updates.updated
- partups.updates.removed
- partups.contributions.inserted
- partups.contributions.updated
- partups.contributions.changed
- partups.contributions.removed
- partups.contributions.ratings.inserted
- partups.contributions.ratings.updated
- partups.contributions.ratings.changed
- partups.contributions.ratings.removed

### Other events
```
Event.emit('contributions.accepted', upper._id, contribution.activity_id, contribution.upper_id);
Event.emit('contributions.rejected', upper._id, contribution.activity_id, contribution.upper_id);
Event.emit('invites.inserted.activity', inviter, partup, activity, invitee);
Event.emit('invites.inserted.activity.by_email', inviter, partup, activity, fields.email, fields.name, fields.message, accessToken);
Event.emit('invites.inserted.network', inviter, network, invitee);
Event.emit('invites.inserted.network.by_email', inviter, network, fields.email, fields.name, fields.message, accessToken);
Event.emit('invites.inserted.network.by_email', inviter, network, invitee.email, invitee.name, fields.message, accessToken);
Event.emit('invites.inserted.partup', inviter, partup, invitee);
Event.emit('invites.inserted.partup.by_email', inviter, partup, fields.email, fields.name, fields.message, accessToken);
Event.emit('networks.accepted', user._id, networkId, upperId);
Event.emit('networks.new_pending_upper', network, user);
Event.emit('partups.activities.archived', upper._id, activity);
Event.emit('partups.activities.unarchived', upper._id, activity);
Event.emit('partups.contributions.archived', upper._id, contribution);
Event.emit('partups.messages.insert', upper, partup, newMessage, fields.text);
Event.emit('partups.supporters.inserted', partup, upper);
Event.emit('partups.supporters.inserted', partup, upper);
Event.emit('partups.supporters.removed', partup, upper);
Event.emit('partups.uppers.inserted', contribution.partup_id, contribution.upper_id);
Event.emit('settings.updated', upper._id, settings);
Event.emit('updates.comments.inserted', upper, partup, update, comment);
Event.emit('users.deactivated', subject._id);
Event.emit('users.inserted', user);
Event.emit('users.reactivated', subject._id);
Event.emit('users.updated', upper._id, userFields);
```
