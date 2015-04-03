var errorHookedAutoform = new ReactiveDict;
var dirtyStates = new ReactiveDict;
var onceBlurredStates = new ReactiveDict;
var focusedStates = new ReactiveDict;
var invalidStates = new ReactiveDict;

/*
 * Form onError hook
 */
AutoForm.hooks({
    
});

/*
 * Field find stateKey
 */
Template.afFieldInput.onRendered(function() {
    var formId = AutoForm.getFormId();
    var fieldName = this.data.name;
    var stateKey = formId + '_' + fieldName;
    this.stateKey = stateKey;

    dirtyStates.setDefault(this.stateKey, false);
    onceBlurredStates.setDefault(this.stateKey, false);
    focusedStates.setDefault(this.stateKey, false);
    invalidStates.setDefault(this.stateKey, false);
});

/*
 * Field unset states
 */
Template.afFieldInput.onDestroyed(function() {
    dirtyStates.set(this.stateKey, false);
    onceBlurredStates.set(this.stateKey, false);
    focusedStates.set(this.stateKey, false);
    invalidStates.set(this.stateKey, false);
});

/*
 * Extra field events
 */
Template.afFieldInput.events({
    'keyup [data-schema-key], blur [data-schema-key]': function (event, template) {
        dirtyStates.set(template.stateKey, true);
        invalidStates.set(template.stateKey, !AutoForm.validateField(false, this.name));
    },
    'blur [data-schema-key]': function (event, template) {
        onceBlurredStates.set(template.stateKey, true);
        focusedStates.set(template.stateKey, false);
    },
    'focus [data-schema-key]': function (event, template) {
        focusedStates.set(template.stateKey, true);
    },
    'error [data-schema-key]': function (event, template) {
        dirtyStates.set(template.stateKey, true);
        onceBlurredStates.set(template.stateKey, true);
        invalidStates.set(template.stateKey, true);
    },
});

/*
 * afFieldClasses
 */
Template.registerHelper('PartupFieldClasses', function autoFormFieldClasses(options) {

    var formId = AutoForm.getFormId();
    if(!options || !options.hash || !options.hash.name || !formId) return false;

    var stateKey = formId + '_' + options.hash.name;

    return [
        invalidStates.get(stateKey) ?      'pu-state-invalid' : '',
        dirtyStates.get(stateKey) ?       'pu-state-dirty' : '',
        onceBlurredStates.get(stateKey) ? 'pu-state-onceblurred' : '',
        focusedStates.get(stateKey) ?     'pu-state-focused' : ''
    ].join(' ');
});
