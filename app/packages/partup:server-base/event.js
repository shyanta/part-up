var equal = Npm.require('equals');
var events = Npm.require('eventemitter2');


//
// Global
//

Event = new events.EventEmitter2({
    wildcard: true,
    delimiter: '.'
});


//
// Collection Event Helpers
//

Event.emitCollectionInsert = function (collection, fields) {
    Event.emit('collections.' + collection._name + '.insert', fields);
};

Event.emitCollectionUpdate = function (collection, entity, fields) {
    if (equal(entity, fields)) return;

    Event.emit('collections.' + collection._name + '.update', entity._id, fields);

    Object.keys(fields).forEach(function (key) {
        var value = {
            'name': key,
            'old': entity[key],
            'new': fields[key]
        };

        if (equal(value.old, value.new)) return;

        Event.emit('collections.' + collection._name + '.' + key + '.update', entity._id, value);
    });
};

Event.emitCollectionRemove = function (collection, entity) {
    Event.emit('collections.' + collection._name + '.remove', entity._id);
};