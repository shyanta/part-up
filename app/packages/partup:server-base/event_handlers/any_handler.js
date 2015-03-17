Event.onAny(function() {
    console.log('Event fired: '.red + this.event.green, arguments);
})
