// var errorHookedAutoform = new ReactiveDict;
// var dirtyStates = new ReactiveDict;
// var onceBlurredStates = new ReactiveDict;
// var focusedStates = new ReactiveDict;
// var invalidStates = new ReactiveDict;

// /*
//  * Field find stateKey
//  */
// Template.afFieldInput.onRendered(function() {
//     var formId = AutoForm.getFormId();
//     var fieldName = this.data.name;
//     var stateKey = formId + '_' + fieldName;
//     this.stateKey = stateKey;

//     dirtyStates.setDefault(this.stateKey, false);
//     onceBlurredStates.setDefault(this.stateKey, false);
//     focusedStates.setDefault(this.stateKey, false);
//     invalidStates.setDefault(this.stateKey, false);
// });

// /*
//  * Field unset states
//  */
// Template.afFieldInput.onDestroyed(function() {
//     dirtyStates.set(this.stateKey, false);
//     onceBlurredStates.set(this.stateKey, false);
//     focusedStates.set(this.stateKey, false);
//     invalidStates.set(this.stateKey, false);
// });

// /*
//  * Extra field events
//  */
// Template.afFieldInput.events({

//     // 'focus [data-schema-key], blur [data-schema-key], input [data-schema-key], keyup [data-schema-key]': function (event, template) {
//     //     console.log('extra validation shizzle');
//     //     var formId = AutoForm.getFormId();
//     //     var fieldName = this.name;
//     //     lodash.defer(function() {
//     //         invalidStates.set(template.stateKey, !AutoForm.validateField(formId, fieldName));
//     //     });
//     // },
//     'focus [data-schema-key]': function (event, template) {
//         focusedStates.set(template.stateKey, true);
//     },
//     'blur [data-schema-key]': function (event, template) {
//         focusedStates.set(template.stateKey, false);
//         onceBlurredStates.set(template.stateKey, true);

//         var formId = AutoForm.getFormId();
//         var fieldName = this.name;
//         Meteor.defer(function() {
//             invalidStates.set(template.stateKey, !AutoForm.validateField(formId, fieldName));
//         });
//     },
//     'sticky-error [data-schema-key]': function (event, template) {
//         // custom error
//         console.log('custom error');
//         invalidStates.set(template.stateKey, true);
//         onceBlurredStates.set(template.stateKey, true);

//         var formId = AutoForm.getFormId();
//         var fieldName = this.name;
//         lodash.defer(function() {
//             invalidStates.set(template.stateKey, true);
//         });

//         event.stopImmediatePropagation();
//     },
// });

// /*
//  * afFieldClasses
//  */
// Template.registerHelper('PartupFieldClasses', function autoFormFieldClasses(options) {

//     var formId = AutoForm.getFormId();
//     if(!options || !options.hash || !options.hash.name || !formId) return false;

//     var stateKey = formId + '_' + options.hash.name;

//     return [
//         invalidStates.get(stateKey) ?      'pu-state-invalid' : '',
//         dirtyStates.get(stateKey) ?       'pu-state-dirty' : '',
//         onceBlurredStates.get(stateKey) ? 'pu-state-onceblurred' : '',
//         focusedStates.get(stateKey) ?     'pu-state-focused' : ''
//     ].join(' ');
// });
