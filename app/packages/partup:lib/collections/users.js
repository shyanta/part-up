Meteor.users._transform = function(user) {
    /**
     * Check if this user is a supporter of given partup
     *
     * @param {String} partupId
     * @return {Boolean}
     */
    user.isSupporter = function(partupId) {
        if (!mout.lang.isString(partupId)) return false;
        return !!Partups.findOne({_id: partupId, supporters: {$in: [user._id]}});
    };

    /**
     * Check if this user is an upper in given partup
     *
     * @param {String} partupId
     * @return {Boolen}
     */
    user.isUpper = function(partupId) {
        if (!mout.lang.isString(partupId)) return false;
        return !!Partups.findOne({_id: partupId, uppers: {$in: [user._id]}});
    };

    return user;
};
