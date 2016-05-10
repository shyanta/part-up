Template.app_network_chat.onCreated(function() {

});

Template.app_network_chat.events({
    'DOMMouseScroll [data-preventscroll], mousewheel [data-preventscroll]': Partup.client.scroll.preventScrollPropagation
});
