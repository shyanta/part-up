/**
 * Board model
 *
 * @memberOf Boards
 */
var Board = function(document) {
    _.extend(this, document);
};

/**
 @namespace Boards
 */
Boards = new Mongo.Collection('boards', {
    transform: function(document) {
        return new Board(document);
    }
});
