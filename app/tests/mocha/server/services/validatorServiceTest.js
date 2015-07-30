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

            describe('facebookUrl', function() {
                var facebookUrl = Partup.services.validators.facebookUrl;

                it('works with correct word input', function(done) {
                    chai.assert.isTrue(facebookUrl.test('https://www.facebook.com/zuck'));
                    chai.assert.isTrue(facebookUrl.test('https://facebook.com/zuck'));
                    chai.assert.isTrue(facebookUrl.test('https://facebook.com/zuck?_rdr=p'));
                    chai.assert.isFalse(facebookUrl.test('https://exploit.com'));
                    done();
                });
            });

            describe('instagramUrl', function() {
                var instagramUrl = Partup.services.validators.instagramUrl;

                it('works with correct word input', function(done) {
                    chai.assert.isTrue(instagramUrl.test('https://www.instagram.com/zuck'));
                    chai.assert.isTrue(instagramUrl.test('https://www.instagram.com/zuck/'));
                    chai.assert.isFalse(instagramUrl.test('https://exploit.com'));
                    done();
                });
            });
            describe('linkedinUrl', function() {
                var linkedinUrl = Partup.services.validators.linkedinUrl;

                it('works with correct word input', function(done) {
                    chai.assert.isTrue(linkedinUrl.test('https://de.linkedin.com/pub/matthias-graus/65/a02/649/en'));
                    chai.assert.isTrue(linkedinUrl.test('https://nl.linkedin.com/pub/jacob-peerdeman/51/758/796/en'));
                    chai.assert.isTrue(linkedinUrl.test('https://www.linkedin.com/in/peterpeerdeman'));
                    chai.assert.isTrue(linkedinUrl.test('https://linkedin.com/in/peterpeerdeman'));
                    chai.assert.isTrue(linkedinUrl.test('http://linkedin.com/profile/view?id=365894620'));
                    chai.assert.isTrue(linkedinUrl.test('https://linkedin.com/profile/view?id=365894620'));
                    chai.assert.isFalse(linkedinUrl.test('https://exploit.com'));
                    done();
                });
            });
        });
    });
}
