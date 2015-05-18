Partup.ui.focuslayer = {

    state: new ReactiveVar(),

    enable: function () {
        this.state.set(true);
    },

    disable: function () {
        this.state.set(false);
    }

};