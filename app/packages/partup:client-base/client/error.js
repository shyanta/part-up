/**
 * Error function for global use
 * @name error
 */
Partup.client.error = function(context, msg) {
    var full_msg = context + ': ' + msg;
    var err = new Error(full_msg);
    console.error(err);
    return;
};
