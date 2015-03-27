if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("start-partup details", function(){

            beforeEach(function (done) {
                Meteor.loginWithPassword('user@example.com', 'user');
                Session.set('partials.start-partup.current-partup', '1111');
                Router.go('start');
                Tracker.afterFlush(done);
            });

            beforeEach(waitForRouter);

            it("should greet the currently loggedin user", function(){
                chai.expect($("h2").first().text()).to.contain("User");
            });

            it("should render current-partup details in input fields", function(){
                chai.expect($("[data-schema-key=\"name\"]").val()).to.contain("First awesome Part-Up!");
            });

        });
    });
}