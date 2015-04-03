// Load the colors on the String prototype now, so we can use
// things like 'this is a string'.gray in the console.
Npm.require('colors');

if(process.env.NODE_ENV !== 'development') {
    console.log('setting tempstore to match with modulus temporary folder')
    FS.TempStore.Storage = new FS.Store.FileSystem("_tempstore", {
        internal :  true,
        path : process.env['CLOUD_DIR']
    });
}

ServiceConfiguration.configurations.upsert({
    service: 'facebook'
},{
    $set: {
        appId: process.env['FACEBOOK_APP_ID'],
        loginStyle: "popup",
        secret: process.env['FACEBOOK_APP_SECRET'],
    }
});

ServiceConfiguration.configurations.upsert({
    service: 'linkedin'
},{
    $set: {
        clientId: process.env['LINKEDIN_API_KEY'],
        loginStyle: "popup",
        secret: process.env['LINKEDIN_SECRET_KEY'],
    }
});
