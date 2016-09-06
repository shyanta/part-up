import loginHelper from '../helpers/login';
import navigator from '../helpers/navigator';
import locators from '../helpers/locators';

module.exports = function () {
    let privateCssSelector = 'h2 a[href="/partups/super-secret-closed-ing-partup-CJETReuE6uo2eF7eW"]';

    this.Given(/^The user is logged in as Admin$/, () => {
        // console.log(loginHelper.logInAsAdmin());
        navigator.gotoPage('login');
        loginHelper.logInAsAdmin();
    });

    this.Then(/^Should see part\-up title "([^"]*)"$/, (aDefinedTitleInTest) => {
        expect(
            locators.getTextFromElement(privateCssSelector)
        ).toBe(aDefinedTitleInTest);
    });

    this.Given(/^The user is logged in as Judy$/,  () => {
        navigator.gotoPage('login');
        loginHelper.loginAsJudy();
    });

    this.Then(/^Should NOT see "([^"]*)"$/,  (aDefinedTitleInTest) => {
        expect(
            browser.isExisting(privateCssSelector)
        ).toBeFalsy();
    });

};