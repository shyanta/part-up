if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("discover", function(){

            it("should show discover page", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.PagesDiscover, div);

                chai.expect($(div).find("h2").first().text()).to.contain("Discover");
                done();
            });

        });
    });
}
