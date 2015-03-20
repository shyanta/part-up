// Load the colors on the String prototype now, so we can use
// things like 'this is a string'.gray in the console.
Npm.require('colors');

ServiceConfiguration.configurations.upsert({
    service: 'facebook'
},{
    $set: {
        appId: process.env['FACEBOOK_APP_ID'],
        loginStyle: "popup",
        appSecret: process.env['FACEBOOK_APP_SECRET'],
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