import authentication from '../helpers/authentication';
import navigator from '../helpers/navigator';
import locators from '../helpers/locators';

module.exports = function () {
    let privateCssSelector = 'h2 a[href="/partups/super-secret-closed-ing-partup-CJETReuE6uo2eF7eW"]';

    this.Given(/^The user is logged in as Admin$/, function () {
        navigator.gotoPage('login');
        authentication.logInAsAdmin();
    });

    this.Then(/^Should see part\-up title "([^"]*)"$/, function (aDefinedTitleInTest) {
        expect(locators.getTextFromElement(privateCssSelector)).toBe(aDefinedTitleInTest);
        authentication.logout();
    });

    this.Given(/^The user is logged first time in as Judy$/, function () {
        navigator.gotoPage('login');
        authentication.loginAsJudy();
    });

    this.Then(/^Should NOT see "([^"]*)"$/, function (aDefinedTitleInTest) {
        expect(browser.isExisting(privateCssSelector)).toBeFalsy();
        authentication.logout();
    });

    this.Given(/^The user is logged in second time as Judy$/, function () {
        navigator.gotoPage('login');
        authentication.loginAsJudy();
    });

    this.When(/^The user navigates to "([^"]*)"$/, function (nonPublicPage) {
        navigator.gotoPage(nonPublicPage);
    });

    this.Then(/^Should see a non\-public warning page$/, function () {
        expect(browser.isExisting('.pu-errorpage.pu-errorpage-partup-closed')).toBeTruthy();
        authentication.logout();
    });

};