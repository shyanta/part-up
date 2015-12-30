Part-up
=================

# Installation

- ensure [imagemagick][im] is installed (OS X: `brew
  install imagemagick`)
- ensure [meteor](https://www.meteor.com/install) is installed
- `./start` (in the root folder of the app)
- App running at: http://localhost:3000/

[im]: http://www.imagemagick.org/

# Documentation

- generate documentation with `./generate_documentation`
- open `./docs/jsdocs/index.html` to view documentation

# Frontend

## Structure
We have four types of application parts: *layout*, *page*, *widget* and *small component*. The explanation below points out their uses. Grahpic: **app/packages/partup:client-pages/app** and for the modals **app/packages/partup:client-pages/modal**.

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

## Quick deployment
- `cd devops`
- `./devops provision <environment> all --tags=app` (provide the SHA hash of the commit to be deployed, make sure it is build by Jenkins upfront)

### Release process for developers

 1. Peer-review the code changes you've made.
 2. If everything is OK, create a new branch ```git checkout -b MD*.**.* // whatever release version you need ``` Please check the [CHANGELOG.md](https://github.com/part-up/part-up/blob/develop/CHANGELOG.md) to understand the version management of this project.  For more information about Semantic Versioning please take a look at: http://semver.org/ 
 3. Update the CHANGELOG.md.
 
 For each fix or feature changes please include the commit message/description and if possible the related issue number, eg. ```fix(emails): fixed commenter name in "conversation reply email", fix #141```
 4. Commit your updated CHANGELOG.md. 
 
 **Tip**: ``` git commit -am "docs(changelog): add changelog MD*.**.* // whatever release version you need" ```
 5. Tag your latest commit. The ``` MD*.**.*  ``` will also be the tag label.
 6. Push the release branch to the origin/master ``git push origin``
 7. After the push Jenkins will automatically build the tag release. Please go to http://ci.part-up.com/view to see the build. You can compare the build with the latest commit SHA.
 8. After the build is finished on Jenkins you can go to the **PROJECT_ROOT/devops** folder and start to deploy an image tag to the **acceptance** server. Run the **./devops** shell script: 
 ``` ./devops provision acceptance all --tags=app```
 The system will ask you: 
  ``` Which image tag do you want to deploy? [latest]: {{COPY_PASTE_HERE_THE_LATEST_COMMIT_SHA}}```
  Please provide the latest relase tag commit SHA. Check **devops/inventories/*.yml** to see all the available deployment server instances. 
 9. Check your deployment on acceptance https://pu-acceptance.lifely.nl. Open your browser console and type: ``` Version.get() ```
 10. To deploy it to **production** server repeat step 8 - 9, but change the deploy command to  ``` ./devops provision production all --tags=app``` (change ***acceptance*** to **production**)
 11. Let the people of the part-up open source development community know that you've just made a new release by adding a new message on the part-up messages board.  
 12. Last but not least please merge your **release branch** back into **develop** and finally **develop** into **master**.
For example:
``` 
git checkout master
git merge MD1.16.2 --no-ff
git checkout develop
git merge master
git push origin
```

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
