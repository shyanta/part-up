if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {

        xdescribe('create details', function() {

            beforeEach(function(done) {
                Meteor.loginWithPassword('user@example.com', 'user');
                done();
            });

            it('should render the partup form', function(done) {
                var div = document.createElement('div');
                Blaze.render(Template.modal_create_details, div);

                chai.expect($(div).find('#partupForm').first()).to.be.defined;
                done();
            });

            it('should be able to go to the next wizard step', function(done) {
                var div = document.createElement('div');
                Blaze.render(Template.modal_create_details, div);
                var nextbutton = $(div).find('[data-submission-type="next"]').first();
                chai.expect(nextbutton).to.be.defined;
                done();
            });

        });
    });
}
