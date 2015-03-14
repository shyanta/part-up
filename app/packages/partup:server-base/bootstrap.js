var events = Npm.require('eventemitter2');

// Global
Event = new events.EventEmitter2();

// Load the colors on the String prototype now, so we can use
// things like 'this is a string'.gray in the console.
Npm.require('colors');