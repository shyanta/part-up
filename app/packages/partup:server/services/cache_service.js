var cache = {};

/**
 @namespace Partup server cache service
 @name Partup.server.services.cache
 @memberof Partup.server.services
 */
Partup.server.services.cache = {

    set: function(key, value, ttl) {
        ttl = ttl || false;

        var data = {
            value: value,
            ttl: ttl,
            timestamp: Date.now()
        };

        mout.object.set(cache, key, value);
    },

    get: function(key) {
        var data = mout.object.get(cache, key);

        if ((data.timestamp + ttl) < Date.now()) {
            mout.object.unset(cache, key);

            return false;
        }

        if (data) return data.value;
    },

    has: function(key) {
        return mout.object.has(cache, key);
    }

};
