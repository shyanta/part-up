Part-Up
=================

## Installation

- ensure [meteor](https://www.meteor.com/install) is installed
- `cd app`
- `meteor`

## Frontend => Backend flow, regarding Collections

_This is just a mind dump of the current flow, k thx bye._

- Frontend uses `Meteor.call` to insert, update or remove documents in a collection.
- Backend checks if the logged in user is authorised to perform the given operation (inside a Meteor method).
- Backend emits an event that corresponds with the given CRUD operation, e.g. `insert, update or remove` (inside a Meteor method).
- Event handlers in the backend handle the given events, e.g. persistence to MongoDB or creation of user notifications.