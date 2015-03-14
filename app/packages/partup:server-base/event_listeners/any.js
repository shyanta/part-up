var colors = Npm.require('colors');

Event.onAny(function() {
    console.log('Event fired: '.gray + this.event.green, arguments);
})
