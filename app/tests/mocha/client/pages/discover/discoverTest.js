if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        xdescribe("discover", function(){

            it("should show discover page", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.app_discover, div);

                chai.expect($(div).find("h2").first().text()).to.contain("Discover");
                done();
            });

        });
    });
}
