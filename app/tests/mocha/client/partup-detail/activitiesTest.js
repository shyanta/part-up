if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("partup-detail activities", function(){

            beforeEach(function (done) {
                Router.go('partup-detail-activities', {_id:'1111'});
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            //it("should render multiple activities", function(){
            //    chai.expect($(".pu-block").length).to.be.above(1);
            //});

        });
    });
}