if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("partup-detail updates", function(){

            beforeEach(function (done) {
                Router.go('partup-detail', {_id:'1111'});
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            xit("should render the title of the partup", function(){
                chai.expect($(".pu-partupheader h1").first().text()).to.contain("First awesome Part-Up!");
            });

        });

    });

}