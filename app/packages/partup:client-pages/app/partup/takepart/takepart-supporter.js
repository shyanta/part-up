Template.app_partup_takepart_supporter.events({
    'click [data-newmessage]': function() {
        Partup.client.popup.close(true); // here, true is used for open_new_message_popup
    }
});
