Meteor.methods({
    /**
     * Upload a file
     *
     * @param {File} file
     */
    'uploads.insert': function(file) {
        check(file, File);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        this.unblock();

        Uploads.insert({'uploaded_by': user._id, 'file': file});
    },

    /**
     * Upload a CSV file and return the containing email addresses
     *
     * @param {String} fileId
     * @param {String} fileName
     *
     * @return {Array} emailAddresses
     */
    'uploads.return_email_addresses_from_csv': function(fileId, fileName) {
        check(fileId, String);
        check(fileName, String);

        var user = Meteor.user();
        if (!user) throw new Meteor.Error(401, 'unauthorized');

        this.unblock();

        var fs = Npm.require('fs');
        var file = Uploads.find({_id: fileId});
        var emailAddresses = [];

        Meteor.setTimeout(function() {
            var filePath = '/uploads/csv/' + user._id + '-' + fileId + '-' + fileName;
            CSV.from.stream(
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
                console.log(count);
            });
        }, 1000);

        return emailAddresses;
    }
});
