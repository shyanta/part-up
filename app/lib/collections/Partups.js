Partups = new Meteor.Collection('partups');

Partups.allow({
    insert: function(userId, doc) { 
        return userId; 
    },
    update: function(userId, doc, fieldNames, modifier) { 
        return userId === doc.userId; 
    },
    remove: function(userId, doc) { 
        return userId === doc.userId; 
    }
});

Partups.deny({

});

