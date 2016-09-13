class LocatorsHelper {
    constructor() {

    }

    getTextFromElement(cssSelector) {
        var element = browser.element(cssSelector);
        element.waitForExist();
        return element.getText();
    }

    getTextFromElements(cssSelector, index) {
        browser.waitForExist(cssSelector);
        // this.client.element('.pu-highlighttext').waitForExist();
        var elements = browser.elements(cssSelector);
        if (index < 0) {
            index += elements.value.length;
        }
        var elementId = elements.value[index].ELEMENT;
        var text = browser.elementIdText(elementId).value;
        return text;
    }
}

export default new LocatorsHelper();