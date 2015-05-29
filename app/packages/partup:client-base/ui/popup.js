Partup.ui.popup = {
    open: function(){
        Session.set('main.popup-open', true);
    },
    close: function(){
        Session.set('main.popup-open', false);
        if(typeof this.onClose == 'function'){
            this.onClose();
            this.onClose = undefined;
        }
    },
    toggle: function(){
        var open = Session.get('main.popup-open');
        if(open) {
            this.close();
        } else {
            this.open();
        }
    }
}