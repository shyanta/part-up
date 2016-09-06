class LoginHelper {
    constructor() {

    }
    login(userEmail, userPassword) {
        browser.element('[name="email"], [name="password"]').waitForExist();
        browser.setValue('[name="email"]', userEmail);
        browser.setValue('[name="password"]', userPassword);
        console.log(userEmail);
        console.log(userPassword);
        browser.click('[type=submit]');
    }
    logInAsAdmin() {
        // console.log('as admin');
        // console.log(browser);
        this.login('admin@example.com', 'user');
    }
    loginAsJudy() {
        this.login('judy@example.com', 'user');
    }
    loginAsJohn() {
        this.login('john@example.com', 'user');
    }
    loginAsUser() {
        this.login('user@example.com', 'user');
    }
}

export default new LoginHelper();