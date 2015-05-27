if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("register", function(){

            it("should contain form", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.WidgetRegisterRequired, div);
                chai.expect($(div).find("#registerRequiredForm").first()).to.be.defined;
                done()
            });

        });
    });
}
