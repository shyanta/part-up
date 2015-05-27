if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("partup-detail updates", function(){

            it("should display updates", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.WidgetPartupdetailUpdates, div);

                chai.expect($(div).find(".pu-update").length).to.be.above(0);
                done();
            });

        });

    });

}
