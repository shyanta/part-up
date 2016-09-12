class CookiebarHelper {
    constructor() {
    }

    clickCookiebarIfExists() {
        if (browser.isVisible('#cookie-bar')) {
            console.log("    cookie-bar: click 'I understand' button");
            browser.click('[class=cb-enable]');
        }
    }
}

export default new CookiebarHelper();
