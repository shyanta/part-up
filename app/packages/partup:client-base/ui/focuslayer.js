Partup.ui.focuslayer = {

    state: new ReactiveVar(),

    // Enable the focuslayer
    enable: function () {
        this.state.set(true);
    },

    // Disable the focuslayer
    disable: function () {
        this.state.set(false);
    }

};

// Make sure the focuslayer cannot survive page switches
Meteor.startup(function () {
    Router.onBeforeAction(function () {
        Partup.ui.focuslayer.disable();
        this.next();
    });
});