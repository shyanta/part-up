var webdriverio = require('webdriverio');
var client = webdriverio.remote({});

describe('CookieLawBar e2e tests @watch', () => {

  beforeEach(() => {
    browser.url('http://localhost:3000');
  });

  before( () => {
    browser.cookie('delete', 'cb-enabled');
  });

  it('should show cookiebar when cookie is NOT set', () => {

    browser.waitForExist('#cookie-bar');

    var elem = browser.element('#cookie-bar');

    var display = elem.getCssProperty('display');

    assert.equal(display.value, 'block');

  });

  it('should NOT show cookiebar when cookie is set', () => {

    client.setCookie({'cb-enabled': 'enabled'});

    browser.click('#cookie-bar .cb-enable');

    var elem = browser.element('#cookie-bar');

    var display = elem.getCssProperty('display');

    assert.equal(display.value, 'none');

  });

});
