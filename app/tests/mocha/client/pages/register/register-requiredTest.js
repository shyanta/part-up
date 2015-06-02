if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe('register', function() {

            it('should contain form', function(done) {
                var div = document.createElement('div');
                Blaze.render(Template.WidgetRegisterRequired, div);
                chai.expect($(div).find('form').first()).to.be.defined;
                done()
            });

        });
    });
}
