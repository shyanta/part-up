/**
 * Network model
 */
var Network = function(document) {
    _.extend(this, document);
};

/**
 * Check if given user is the admin of this network
 *
 * @param {String} userId
 * @return {Boolean}
 */
Network.prototype.isAdmin = function(userId) {
    return mout.lang.isString(userId) && userId === network.admin_id;
};

/**
 * Check if given user is a member of this network
 *
 * @param {String} userId
 * @return {Boolean}
 */
Network.prototype.hasMember = function(userId) {
    return mout.lang.isString(userId) && this.uppers.indexOf(userId) > -1;
};

/**
 @namespace Networks
 @name Networks
 */
Networks = new Mongo.Collection('networks', {
    transform: function(document) {
        return new Network(document);
    }
});

/**
 * Networks collection helpers
 */
Networks.open = function(options) {
    return this.find({'access_level': 1}, options);
};
