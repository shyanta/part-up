(function() {
    'use strict';

    var assert = require('assert');

    module.exports = function() {

        // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
        var url = require('url');

        this.Given(/^I navigate to "([^"]*)"$/, function(relativePath, callback) {
            // WebdriverIO supports Promises/A+ out the box, so you can return that too
            this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
            url(url.resolve(process.env.HOST, relativePath)). // process.env.HOST always points to the mirror
            call(callback);
        });

        this.When(/^I enter my authentication information$/, function(callback) {
            this.browser.
            waitForExist('body *').
            waitForVisible('body *').
            setValue('[name="email"]', 'user@example.com').
            setValue('[name="password"]', 'user').
            click('[type=submit]').
            call(callback);
        });

        this.When(/^I enter wrong login information$/, function(callback) {
            this.browser.
            waitForExist('body *').
            waitForVisible('body *').
            setValue('[name="email"]', 'user@example.com').
            setValue('[name="password"]', 'bad password').
            click('[type=submit]').
            call(callback);
        });

        this.Then(/^I should see my username "([^"]*)"$/, function(expectedUsername, callback) {
            this.browser.
            waitForExist('.pu-composition-register .pu-title-modal').
            getText('.pu-composition-register .pu-title-modal').then(function(text) {
                assert(text.substr(expectedUsername), true);
                callback();
            });
        });

        this.Then(/^I should see an error$/, function(callback) {
            this.browser.
            waitForExist('.pu-sub-error').
            getText('.pu-sub-error').then(function(text) {
                assert(text, 'Unknown validation error');
                callback();
            });
        });
    };

})();
