if (!(typeof MochaWeb === 'undefined')) {
    MochaWeb.testOnly(function() {
        describe('Validator Service', function() {
            describe('tagsSeparatedByComma', function() {
                var tagsSeparatedByComma = Partup.services.validators.tagsSeparatedByComma;;

                it('works with correct word input', function(done) {
                    var correctTags = 'test,test2,test3';
                    chai.assert.isTrue(tagsSeparatedByComma.test(correctTags));
                    done();
                });

                it('works with correct dashed input', function(done) {
                    var tagsWithDash = 'test,test2,test3,test4,part-up';
                    chai.assert.isTrue(tagsSeparatedByComma.test(tagsWithDash));
                    done();
                });

                it('works with incorrect specialchar input', function(done) {
                    var tagsWithSpecialchars = 'tüst,tést2';
                    chai.assert.isFalse(tagsSeparatedByComma.test(tagsWithSpecialchars));
                    done();
                });

                it('works with incorrect tags', function(done) {
                    var incorrectTags = 'test@,test2,test3,test4,part-up';
                    chai.assert.isFalse(tagsSeparatedByComma.test(incorrectTags));
                    done();
                });
            });
        });
    });
}
