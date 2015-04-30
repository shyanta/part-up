if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("discover", function(){

            beforeEach(function (done) {
                Router.go('discover');
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            xit("should show discover page", function(){
                chai.expect($("h2").first().text()).to.contain("Discover");
            });

        });
    });
}