if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){
        describe("Collections", function(){
            it("should have users in database", function(){
                chai.assert(Meteor.users.find().count() > 0);
            });

            it("should have partups available", function(){
                chai.assert(Partups.find().count() > 0);
            });

            it("should have activities available", function(){
                chai.assert(Activities.find().count() > 0);
            });
        });
    });
}