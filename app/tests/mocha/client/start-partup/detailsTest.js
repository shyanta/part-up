if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("start-partup details", function(){

            beforeEach(function (done) {
                Meteor.loginWithPassword('user@example.com', 'user');
                done();
            });

            it("should render the partup form", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.WidgetStartDetails, div);

                console.log('hit');
                console.log(div);
                chai.expect($(div).find("#partupForm").first()).to.be.defined;
                done();
            });

            it("should be able to go to the next wizard step", function(done){
                var div = document.createElement("DIV");
                Blaze.render(Template.WidgetStartDetails, div);

                chai.expect($(div).find('[data-submission-type="next"]').first()).to.be.defined;
                done();
            });

            it("should render current-partup details in input fields", function(done){
                Session.set('partials.start-partup.current-partup', '1111');
                chai.expect($("[data-schema-key=\"name\"]").val()).to.contain("First awesome Part-Up!");
                done();
            });

        });
    });
}
