/**
 * Lane model
 *
 * @memberOf Lanes
 */
var Lane = function(document) {
    _.extend(this, document);
};

/**
 @namespace Lanes
 */
Lanes = new Mongo.Collection('lanes', {
    transform: function(document) {
        return new Lane(document);
    }
});
