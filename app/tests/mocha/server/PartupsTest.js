if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function () {
        describe('Partups', function () {

            // beforeAll(function (done) {
            //     Accounts.createUser({
            //         username: 'lifely',
            //         password: 'test',
            //         email: 'info@lifely.nl',
            //         profile: {
            //             name: 'Lifely'
            //         }
            //     }, done);
            // });

            // beforeEach(function (done) {
            //     Meteor.loginWithPassword('lifely', 'test', function (error) {
            //         expect(error).toBeUndefined();
            //         done();
            //     });
            // });

            // afterEach(function (done) {
            //     Meteor.logout(function (error) {
            //         expect(error).toBeUndefined();
            //         done();
            //     });
            // });

            it('this is a stub test', function (done) {
                chai.expect(true).to.equal(true);
                done();
            });
        });
    });
}
