/**
 * Helper for updates page
 *
 * @class updates
 * @memberOf Partup.client
 */
Partup.client.updates = {

    /**
     * List of updates caused by the current user
     *
     * @memberOf Partup.client.updates
     */
    updates_causedby_currentuser: new ReactiveVar([]),

    /**
     * Add update to list of updates caused by the current user
     *
     * @memberOf Partup.client.updates
     * @param {String} update_id _id of the update caused by the current user
     */
    addUpdateToUpdatesCausedByCurrentuser: function(update_id) {
        var current_list = this.updates_causedby_currentuser.get();
        current_list.push(update_id);
        this.updates_causedby_currentuser.set(current_list);
    },

    /**
     * Reset the caused-by-current-user array
     *
     * @memberOf Partup.client.updates
     */
    resetUpdatesCausedByCurrentuser: function() {
        this.updates_causedby_currentuser.set([]);
    }
};
