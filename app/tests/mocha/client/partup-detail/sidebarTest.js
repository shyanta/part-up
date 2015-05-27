if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("partup-detail sidebar", function(){

            it("should contain partup name", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.PartialsPartupDetailSidebar, div);
                chai.expect($(div).find("h1").first().text().length).to.be.above(0);
                done()
            });

        });
    });
}

