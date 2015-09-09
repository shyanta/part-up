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

            Meteor.setTimeout(function() {
                CSV().from.stream(
                    fs.createReadStream(filePath),
                    {'escape': '\\'}
                )
                .on('record', function(row, index) {
                    list.push({
                        'name': row[0],
                        'email': row[1]
                    });
                }, function(error) {
                    Log.error('Error in method [uploads.parse_csv] while parsing CSV in [record]:', error);
                })
                .on('error', function(error) {
                    Log.error('Error in method [uploads.parse_csv] while parsing CSV:', error);
                })
                .on('end', function(count) {
                    done(null, list);
                });
            }, 1000);
        });

        return emailAddresses(filePath);
    }
});
