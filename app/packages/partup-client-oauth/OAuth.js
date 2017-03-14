// jscs:disable
/**
 * Render oauth grant functionality
 *
 * @module client-oauth
 *
 */
// jscs:enable

var submitting = new ReactiveVar(false);

Template.OAuth.events({
    'click #authButton': function() {
        var template = Template.instance();


        console.log('client id: ' + template.data.clientId);
        submitting.set(true);
        setTimeout(function() {
            submitting.set(false);
        }, 2000);
    }
});

Template.OAuth.helpers({
    submitting: function() {
        return submitting.get();
    },
    attrs: function() {
        var obj = {};
        if (submitting.get()) {
            obj.disabled = 'disabled';
        }
        return obj;
    }
});