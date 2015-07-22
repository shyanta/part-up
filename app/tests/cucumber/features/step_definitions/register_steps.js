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

        this.When(/^I enter my profile information$/, function(callback) {
            this.browser.
            waitForExist('body *').
            waitForVisible('body *').
            setValue('[name="name"]', 'Registered User').
            setValue('[name="email"]', 'registered@example.com').
            setValue('[name="password"]', 'Testpassword1').
            setValue('[name="confirmPassword"]', 'Testpassword1').
            click('[type=submit]').
            call(callback);
        });

        this.When(/^I enter wrong profile information$/, function(callback) {
            this.browser.
            waitForExist('body *').
            waitForVisible('body *').
            setValue('[name="name"]', 'Registered User').
            click('[type=submit]').
            call(callback);
        });

        this.Then(/^I should see some validation errors$/, function(callback) {
            this.browser.
            waitForExist('.pu-sub-error').
            getText('.pu-sub-error').then(function(text) {
                text[1].should.contain('is required');
                text[2].should.contain('is required');
                text[3].should.contain('is required');
                callback();
            });
        });
    };

})();
