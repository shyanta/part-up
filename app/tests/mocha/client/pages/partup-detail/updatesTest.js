if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        var template;
        var updatesStub = [{"_id":"kf9SGoM4wxKKKubXa","upper_id":"rcuFvNy9xh8SJGM54","partup_id":"TtwsyXeYLuyH7uzmH","type":"partups_created","type_data":{},"comments_count":0,"created_at":"2015-05-29T10:27:29.262Z","updated_at":"2015-05-29T10:27:29.262Z"}];

        describe('partup-detail updates', function() {

            beforeEach(function() {

                stubs.create('findUpdates', Updates, 'find');
                stubs.findUpdates.returns([{name: 'test'},{name: 'test'}]);

                template = document.createElement('div');
                var comp = Blaze.renderWithData(Template.WidgetPartupdetailUpdates, {
                    //no data
                });
                Blaze.insert(comp, template);
            });

            xit('should display all updates', function(done) {
                chai.expect($(template).find('.pu-update').length).to.be.above(0);
                done();
            });

        });

    });

}
