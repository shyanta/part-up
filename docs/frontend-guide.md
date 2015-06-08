# Front-end development guide

## Template structure (partup:client-pages)
The template structure is located in the package **partup:client-pages**. The directory structure inside that package, equals the template hierarchy. The names of these templates are being used by the application routing (in **/lib/routes.js**).

An example directory structure for **partup:client-pages**:
```
└── app
    ├── app.html                        -->  This template is called "app".
    ├── app.js
    ├── app-header.html                 -->  These are partials for the large "app.html" file.
    ├── app-header.js
    ├── app-footer.html
    ├── discover
    │   ├── discover.html               -->  This template is called "app_discover".
    │   └── discover.js
    └── partup
        ├── partup.html
        ├── partup.js
        ├── partup-navigation.html
        ├── partup-navigation.js
        ├── partup-sidebar.html
        ├── partup-sidebar.js
        ├── updates
        │   ├── updates.html            -->  This template is called "app_partup_updates".
        │   ├── updates.js
        │   └── newmessage
        │       ├── newmessage.html     -->  It doesn't matter that New message is not really a page, but a popup.
        │       └── newmessage.js
        └── update                      -->  This directory is not a subdirectory of app/partup/updates,
            ├── update.html                    because this template is not being included inside the updates template.
            └── update.js
```


When translations are present, you must create i18n-files for that template file:

```
└── i18n
    ├── app.en.i18n.json
    ├── app.nl.i18n.json
    ├── app-discover.en.i18n.json
    ├── app-discover.nl.i18n.json
    ├── app-partup.en.i18n.json
    ├── app-partup.nl.i18n.json
    ├── app-partup-updates.en.i18n.json
    ├── app-partup-updates.nl.i18n.json
    ├── app-partup-updates-newmessage.en.i18n.json
    ├── app-partup-updates-newmessage.nl.i18n.json
    ├── app-partup-update.en.i18n.json
    ├── app-partup-update.nl.i18n.json
```

## When do I create a package?
The only case for creating a package is to componentize a feature. The main reasons for you to create a package, are:
- Making the page-file smaller
- Being able to re-use a specific component/feature

Don't create a package just because you think the file is going to become gargantuan. Then you should consider to only split up your file, just like in the template structure example above.

## Package checklist
When creating a package, there are some points you should be aware of:

### Package documentation
Write a small summary of what the package does, in it's **package.js**.

```js
Package.describe({
    name: 'partup:client-activity',
    version: '0.0.1',
    summary: 'Represent a Part-up activity'
});
```

Also write a jsdoc block in your template file, representing the API of the template.
```js
/**
 * Widget to render a single activity
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @param {Object} activity   The activity to render
 * @param {Function} createCallback   A function which is executed after a new activity has been added
 * @param {String} contribution_id   Contribution id to render, if only one should be rendered
 * @param {Boolean} READONLY   Whether the widget should contain an edit mode
 * @param {Boolean} EXPANDED   Whether the widget should render in expanded state
 */
```
