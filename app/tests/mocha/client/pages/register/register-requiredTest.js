if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe('register', function() {

            xit('should contain form', function(done) {
                var div = document.createElement('div');
                Blaze.render(Template.modal_register_create, div);
                chai.expect($(div).find('form').first()).to.be.defined;
                done()
            });

        });
    });
}
