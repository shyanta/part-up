Part-Up
=================

# Installation

- ensure [graphicsmagick][gm] or [imagemagic][im] is installed (OS X: `brew
  install graphicsmagick`)
- ensure [meteor](https://www.meteor.com/install) is installed
- `cd app`
- `meteor`

[gm]: http://www.graphicsmagick.org/
[im]: http://www.imagemagick.org/

# Documentation

- generate documentation with `./generate_documentation`
- open `./docs/jsdocs/index.html` to view documentation

# Frontend

## Structure
We have four types of application parts: *layout*, *page*, *widget* and *small component*. The explanation below points out their uses. Grahpic: **docs/frontend-structure.pdf**.

### Layout
Layouts are the top-level templates. They can contain a header, current page placeholder and footer. The Sass file should only contain header and footer positioning rules. The js file should keep track of the state of the template and handle navigation functionality.

### Page
Pages can contain single components with page-specific functionality, widgets (packages) and sub-pages. A page, in fact, only represents a composition. Therefore, the Sass file should only contain position defenitions of the inside components. The js file should handle the page states and navigation functionality if subpages are present. Pages are directly binded to routes.

### Widget (packages)
With a funcionality, you can think of a widget which will fulfill one standalone functionality. Functionalities that tie the app together (like a navigation bar) should not be declared as a package, because it’s not a widget with a standalone functionality. The Sass file may only contain component composition rules. When a widget is called WidgetsPartupActivities, the package should be called partup:client-widgets-partup-activities.

### Small component
The whole app is made up of small styled components. These components are not functional by themselves, but only provides styling. For example: buttons, inputs, titles, paragraphs and menus. Each component should be defined as a Sass class prefixed with “pu-”, for example “pu-button”. Be aware not to define any styling dealing with the position of the component inside its parent or relative to its siblings.

# Backend
## Collections manipulation flow

- Frontend uses `Meteor.call` to insert, update or remove documents in a collection.
- Backend checks if the logged in user is authorised to perform the given operation (inside a Meteor method).
- Backend saves document in mongodb
- Backend emits an event that corresponds with the given CRUD operation, e.g. `inserted, updated or removed` (inside a Meteor method).
- Handlers are created that have to react to these created events, for instance when inserting an update or notification.

# Fixtures

- the following users are created automatically (all with password "user"):
    - user@example.com
    - john@example.com
    - judy@example.com
    - admin@example.com
- admin created all the tribes
- john is member of closed tribe and created a closed partup
- user is member of open and invite tribe and created a partups in these tribes
- judy is invited for closed tribe

# Unit / Integration tests

- disable tests
    - `cd app`
    - `meteor remove mike:mocha`
- enable tests
    - `cd app`
    - `meteor add mike:mocha`
    - `meteor add xolvio:cucumber`

# DevOps

## Deployment
- `cd devops`
- `./devops deploy <environment>`

## MongoDB

- Connecting: `mongo "<host>/<database>" -u "<user>" -p "<password>"`
- Dumping: `mongodump "<host>" --db "<database>" -u "<user>" -p "<password>" -o \`date +%s\``
- Restoring: `mongorestore "<host>" --db "<database>" -u "<user>" -p "<password>"`
- Restoring Meteor LoginServiceConfiguration: `mongorestore "<host>" --db "<database>" -u "<user>" -p "<password>" -c "meteor_accounts_loginServiceConfiguration" <bson file from dump>`
- Emptying all Collections (run in mongo shell): `db.getCollectionNames().forEach(function(collectionName) { db[collectionName].remove({}); });`
- Make user (super)admin: `db.users.update({ '_id': '<insertuseridhere>' }, { $set: { 'roles': ['admin'] } })`
- Find faulty / wrongly uploaded pictures: `db.getCollection('cfs.images.filerecord').find({'copies':{$exists:false}})`

## Unit testing
- `meteor run --test`

## Required server environment variables
```
NODE_ENV
MONGO_URL
ROOT_URL
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_BUCKET_REGION
AWS_BUCKET_NAME
FACEBOOK_APP_ID
FACEBOOK_APP_SECRET
LINKEDIN_API_KEY
LINKEDIN_SECRET_KEY
TZ = Europe/Amsterdam
MAIL_URL
FLICKR_API_KEY
FLICKR_SECRET_KEY
NEW_RELIC_LICENSE_KEY
NEW_RELIC_APP_NAME
NEW_RELIC_NO_CONFIG_FILE = true
KADIRA_APP_ID
KADIRA_APP_SECRET
METEOR_SETTINGS = {"public":{"analyticsSettings":{"Google Analytics":{"trackingId":"UA-34557675-16"}}}}
GOOGLE_API_KEY
```

## data dumps

### clean userdump
- regular mongo dump command
- unpack bson `for f in *.bson; do bsondump "$f" > "$f.json"; done`
- `cat users.bson.json | sed 's/accessToken" : "[^"]*"/accessToken" : ""/g' > users.bson-clean.json`
- `cat users.bson-clean.json | sed 's/hashedToken" : "[^"]*"/hashedToken" : ""/g' > users.bson-clean-2.json`
- `cat users.bson-clean-2.json | sed 's/bcrypt" : "[^"]*"/bcrypt" : ""/g' > users.bson-clean-3.json`
- `cat users.bson-clean-3.json | sed 's/token" : "[^"]*"/token" : ""/g' > users.bson-clean-4.json`
