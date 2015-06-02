if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("start-partup details", function(){

            beforeEach(function (done) {
                Meteor.loginWithPassword('user@example.com', 'user');
                Session.set('partials.create-partup.current-partup', '1111');
                Router.go('start');
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            xit("should greet the currently loggedin user", function(){
                chai.expect($(".pu-title").first().text()).to.contain("Default");
            });

            //it("should render current-partup details in input fields", function(){
            //    chai.expect($("[data-schema-key=\"name\"]").val()).to.contain("First awesome Part-Up!");
            //});

        });
    });
}
