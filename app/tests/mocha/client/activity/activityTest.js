if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe('activity in start partup form mode', function() {
            var template;
            beforeEach(function() {
                var template = document.createElement('div');
                var comp = Blaze.renderWithData(Template.Activity, {
                    activity: function() {return false},
                    edit: function() {return true},
                    CREATE: function() {return true},
                    POPUP: function() {return false},
                    START_PARTUP: function() {return true},
                    createCallback: function() {return undefined},
                });
                Blaze.insert(comp, template);
            });

            it('should render the activity form', function(done) {
                var form = $(template).find('form').first();
                chai.expect(form).to.be.defined;
                done();
            });

        });

        describe('activity in start partup view mode', function() {

            var template;
            var activityStub = {
                '_id': 'LdatZnS8dNnQyTp32',
                'archived': false,
                'created_at': '2015-06-02T13:49:26.877Z',
                'creator_id': 'K5c5M4Pbdg3B82wQH',
                'description': 'wellicht kopen bij de gamma',
                'end_date': '2015-06-30T00:00:00.000Z',
                'name': 'Bezems vinden',
                'partup_id': 'wMYW5BejkzwSuk9bA',
                'update_id': 'noKxZNkxucHuPpMtY',
                'updated_at': '2015-06-02T13:49:26.877Z'
            };

            beforeEach(function() {
                template = document.createElement('div');
                var comp = Blaze.renderWithData(Template.Activity, {
                    activity: function() {return activityStub},
                    edit: function() {return true},
                    COMMENTS_LINK: function() {return true},
                    CONTRIBUTIONS: function() {return true},
                    EXPANDED: function() {return true},
                    READONLY: function() {return false},
                    START_PARTUP: function() {return true},
                    UPDATE_LINK: function() {return true},
                    isUpper: function() {return true},
                });
                Blaze.insert(comp, template);
            });

            it('should render the activity title', function(done) {
                var title = $(template).find('h3').first();
                chai.expect(title.text()).to.contain('Bezems');
                done();
            });

        });
    });
}
