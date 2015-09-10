Meteor.methods({
    /**
     * Parse a CSV file and return the containing email addresses
     *
     * @param {String} fileId
     *
     * @return {Array} emailAddresses
     */
    'uploads.parse_csv': function(fileId) {
        check(fileId, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        this.unblock();

        var file = Temp.findOne({_id: fileId});
        var filePath = process.env.TEMP_DIR + '/temp-' + file._id + '-' + file.original.name;

        var fs = Npm.require('fs');

        var emailAddresses = Meteor.wrapAsync(function(filePath, done) {
            var list = [];

            if (!fs.existsSync(filePath)) {
                done(new Meteor.Error(400, 'could_not_read_uploaded_file'));
                return;
            }

            var fileContent = fs.readFileSync(filePath).toString('utf8');

            CSV()
            .from.string(fileContent)
            .to.array(Meteor.bindEnvironment(function(array) {
                var list = lodash.chain(array)
                    .map(function(row) {
                        if (!Partup.services.validators.email.test(row[1])) return false;

                        return {
                            name: row[0],
                            email: row[1]
                        };
                    })
                    .compact();

                file.remove();

                done(null, list);
            }));
        });

        return emailAddresses(filePath);
    }
});
