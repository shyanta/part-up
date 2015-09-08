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

        var file = Uploads.findOne({_id: fileId});
        var emailAddresses = [];
        var fs = Npm.require('fs');

        Meteor.setTimeout(function() {
            var filePath = '/tmp/uploads/csv/uploads-' + file._id + '-' + file.original.name;
            CSV().from.stream(
                fs.createReadStream(filePath),
                {'escape':'\\'}
            ).on('record', Meteor.bindEnvironment(function(row, index) {
                emailAddresses.push({
                    'name': row[0],
                    'email': row[1]
                });
            }, function(error) {
                console.log(error);
            })).on('error', function(error) {
                console.log(error);
            }).on('end', function(count) {
                console.log(emailAddresses);
                return emailAddresses;
            });
        }, 1000);
    }
});
