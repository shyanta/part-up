class LocatorsHelper {
    constructor() {

    }
    getTextFromElement(cssSelector) {
        var element = browser.element(cssSelector);
        element.waitForExist();
        return element.getText();
    }
}

export default new LocatorsHelper();