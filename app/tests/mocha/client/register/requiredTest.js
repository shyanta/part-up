if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("register", function(){

            beforeEach(function (done) {
                Router.go('register');
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            it("should contain signup button", function(){
                chai.expect($("[type=\"submit\"]").length).to.be.above(0);
            });

            it("should be able to close the page", function(){
                chai.expect($("[data-closepage]").length).to.be.above(0);
            });

        });
    });
}