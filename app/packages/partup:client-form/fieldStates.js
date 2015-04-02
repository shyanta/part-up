var dirtyStates = new ReactiveDict;
var onceBlurredStates = new ReactiveDict;
var focusedStates = new ReactiveDict;
var invalidStates = new ReactiveDict;

/*
 * Field find reactiveKey
 */
Template.afFieldInput.onRendered(function() {
    var inputElm = this.find('[data-schema-key]');
    var formId = AutoForm.getFormId();
    var fieldName = inputElm.dataset.schemaKey;
    var reactiveKey = formId + '_' + fieldName;
    this.reactiveKey = reactiveKey;
});

/*
 * Field unset states
 */
Template.afFieldInput.onDestroyed(function() {
    dirtyStates.set(this.reactiveKey, false);
    onceBlurredStates.set(this.reactiveKey, false);
    focusedStates.set(this.reactiveKey, false);
    invalidStates.set(this.reactiveKey, false);
});

/*
 * Extra field events
 */
Template.afFieldInput.events({
    'keyup [data-schema-key], blur [data-schema-key]': function (event, template) {
        var fieldName = event.currentTarget.dataset.schemaKey;
        var formId = AutoForm.getFormId();
        var invalid = !AutoForm.validateField(formId, fieldName);

        dirtyStates.set(template.reactiveKey, true);
        invalidStates.set(template.reactiveKey, invalid);
    },
    'blur [data-schema-key]': function (event, template) {
        onceBlurredStates.set(template.reactiveKey, true);
        focusedStates.set(template.reactiveKey, false);
    },
    'focus [data-schema-key]': function (event, template) {
        focusedStates.set(template.reactiveKey, true);
    }
});

/*
 * afFieldClasses
 */
Template.registerHelper('PartupFieldClasses', function autoFormFieldClasses(options) {

    var formId = AutoForm.getFormId();
    if(!options
    || !options.hash || !options.hash.name
    || !formId) {
        return false;
    }

    var fieldName = options.hash.name;
    var reactiveKey = formId + '_' + fieldName;

    var invalid = invalidStates.get(reactiveKey);
    var dirty = dirtyStates.get(reactiveKey);
    var onceBlurred = onceBlurredStates.get(reactiveKey);
    var focused = focusedStates.get(reactiveKey);

    return [
        invalid ? 'pu-state-invalid' : '',
        dirty ? 'pu-state-dirty' : '',
        onceBlurred ? 'pu-state-onceblurred' : '',
        focused ? 'pu-state-focused' : ''
    ].join(' ');
});
