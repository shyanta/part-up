import {Meteor} from 'meteor/meteor';
import {chai} from 'meteor/practicalmeteor:chai';
import {Template} from 'meteor/templating';
import {$} from 'meteor/jquery';
import {withRenderedTemplate} from '../../test-helpers';
import * as Cookies from '../cookie-law-bar/cookies.min';
import './CookieLawBar.js';

if (Meteor.isClient) {
  describe('CookieLawBar tests', function () {
    beforeEach(function () {
      Template.registerHelper('_', key => key);
    });

    afterEach(function () {
      Template.deregisterHelper('_');
    });

    it('should show cookiebar when Cookie is NOT set', function () {
      Cookies.set('cb-enabled', 'disabled', {expires: Infinity});
      withRenderedTemplate('CookieLawBar', {}, el => {
        chai.expect($(el).find('#cookie-bar').css('display') !== 'none').to.equal(true);
      });
    });

    it('should NOT show cookiebar when Cookie is set', function () {
      Cookies.set('cb-enabled', 'enabled', {expires: Infinity});
      withRenderedTemplate('CookieLawBar', {}, el => {
        chai.expect($(el).find('#cookie-bar').css('display') === 'none').to.equal(true);
      });
    });

  });

}
