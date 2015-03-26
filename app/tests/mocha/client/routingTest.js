if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("Routing", function(){
            it("should show discover page", function(){
                Router.go('discover');

                setTimeout(function() {
                    chai.assert.equal($("h2").val(), "Discover");

                }, 10);
            });

            it("should show partup details page", function(){
                Router.go('partup-detail', {_id:'1111'});

                setTimeout(function() {
                    chai.assert.equal($("h1").val(), "First awesome Part-Up!");
                }, 10);
            });

            it("should show partup details activities page", function(){
                Router.go('partup-detail-activities', {_id:'1111'});

                setTimeout(function() {
                    chai.assert.lengthOf($("pu-block"), 2);

                }, 10);
            });

        });
    });
}