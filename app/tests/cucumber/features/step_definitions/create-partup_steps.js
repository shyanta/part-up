(function() {
    'use strict';

    var assert = require('assert');

    module.exports = function() {

        // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
        var url = require('url');

        this.Given(/^I am loggedin$/, function(callback) {
            // Write code here that turns the phrase above into concrete actions
            this.browser. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
                url(url.resolve(process.env.HOST, '/login')).
                waitForExist('body *').
                waitForVisible('body *').
                setValue('[name="email"]', 'user@example.com').
                setValue('[name="password"]', 'user').
                click('[type=submit]').
                call(callback);
        });

        this.When(/^I click through the introduction page$/, function(callback) {
            this.browser.
            waitForExist('.pu-button-arrow').
            click('.pu-button-arrow').
            call(callback);
        });

        this.When(/^I enter the partup details$/, function(callback) {
            this.browser.
            waitForExist('body *', 7000).
            waitForVisible('body *').
            setValue('[name="name"]', 'Organise Testing Party').
            setValue('textarea', 'a nice testing party description').
            setValue('.bootstrap-tagsinput input', 'testing').
            setValue('[data-schema-key="end_date"]', 'Thu Jul 23 2050 02:00:00 GMT+0200 (CEST)').
            setValue('[data-locationautocomplete]', 'Ams').
            waitForExist('.tt-suggestion', 5000).
            click('.tt-suggestion').
            click('[type=submit]').
            call(callback);
        });

        this.When(/^I should be on the start activities screen$/, function(callback) {
            callback.pending();
            // return this.browser.
            // waitForExist('body *').
            // waitForVisible('body *').
            // getText('h2').should.eventually.contain('Step 2. Define the activities');
        });
    };

})();
