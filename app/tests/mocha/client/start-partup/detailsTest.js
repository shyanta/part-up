if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("Start Partup Details Test", function(){
            it("should show partup details activities page", function(){
                Session.set('partials.start-partup.current-partup', '1111');
                Router.go('start');
                Meteor.flush();
                chai.assert.equal($("[data-schema-key=\"name\"]").val(), "1First awesome Part-Up!");


            });

        });
    });
}

