Partup.ui.popup = {
    open: function(){
        Session.set('main.popup-open', true);
    },
    close: function(){
        Session.set('main.popup-open', false);
    },
    toggle: function(){
        var open = Session.get('main.popup-open');
        Session.set('main.popup-open', !open);
    }
}