if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {

        describe('start-partup intro', function() {

            beforeEach(function(done) {
                Meteor.loginWithPassword('user@example.com', 'user');
                done();
                // Session.set('partials.start-partup.current-partup', '1111');
                // Router.go('start');
                // Tracker.afterFlush(done);
            });

            it('should have ability to close the page', function(done) {
                var div = document.createElement('DIV');
                Blaze.render(Template.PagesStartPartupIntro, div);

                var closeButton = $(div).find('[data-closepage]').first();
                chai.expect(closeButton).to.be.defined;

                done();
            });

            it('should be able to continue to partup details', function(done) {
                var div = document.createElement('DIV');
                Blaze.render(Template.PagesStartPartupIntro, div);

                var startPartupButton = $(div).find('.pu-button-arrow').first();
                chai.expect(startPartupButton).to.be.defined;
                chai.expect(startPartupButton.attr('href')).to.contain('start');

                done();
            });
        });
    });
}
