if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("Strings Service", function(){
            it('slugifies string', function() {
                chai.assert.equal(Partup.ui.strings.slugify('Accounts.LoginCancelledError') , 'Accounts-LoginCancelledError');
                chai.assert.equal(Partup.ui.strings.slugify('bla afterspace') , 'bla-afterspace');
            });
        });
    });
}