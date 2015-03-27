if (!(typeof MochaWeb === 'undefined')){
    MochaWeb.testOnly(function(){

        describe("Partup Service", function(){
            it('transforms a partup location to a location input', function() {
                var location = {
                    city: 'amsterdam',
                    country: 'netherlands'
                };
                chai.assert.equal(Partup.services.partup.locationToLocationInput(location) , 'amsterdam');
            });
        });
    });
}