var equal = Npm.require('deeper');
var events = Npm.require('eventemitter2');

/**
 * The global event emitter instance.
 *
 * @type {EventEmitter2}
 */
Event = new events.EventEmitter2({
    wildcard: true,
    delimiter: '.'
});

/**
 * Helper to handle the event emitting for an update of a collection document.
 *
 * @param collection (Mongo.Collection)
 * @param document
 * @param fields
 */
Event.emitCollectionUpdate = function (collection, document, fields) {
    if (equal(document, fields)) return;

    Event.emit('collections.' + collection._name + '.updated', document, fields);

    Object.keys(fields).forEach(function (key) {
        var value = {
            'name': key,
            'old': document[key],
            'new': fields[key]
        };

        if (equal(value.old, value.new)) return;

        Event.emit('collections.' + collection._name + '.' + key + '.updated', document, value);
    });
};
