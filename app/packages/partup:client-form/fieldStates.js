var dirtyStates = new ReactiveDict;
var onceBlurredStates = new ReactiveDict;
var focusedStates = new ReactiveDict;
var invalidStates = new ReactiveDict;

var getContext = function getContext (event) {
    if(!event || !event.currentTarget
    || !event.currentTarget.form || !event.currentTarget.form.id
    || !event.currentTarget.dataset || !event.currentTarget.dataset.schemaKey) {
        return false;
    }

    var formId = event.currentTarget.form.id;
    var fieldName = event.currentTarget.dataset.schemaKey;

    var output = {
        formId: formId,
        fieldName: fieldName,
        reactiveKey: formId + '_' + fieldName
    };

    return output;
};

Template.afFieldInput.onRendered(function() {
    var inputElm = this.find('[data-schema-key]');
    var formId = inputElm.form.id;
    var fieldName = inputElm.dataset.schemaKey;
    var reactiveKey = formId + '_' + fieldName;
    this.reactiveKey = reactiveKey;
});

Template.afFieldInput.onDestroyed(function() {
    dirtyStates.set(this.reactiveKey, false);
    onceBlurredStates.set(this.reactiveKey, false);
    focusedStates.set(this.reactiveKey, false);
    invalidStates.set(this.reactiveKey, false);
});

Template.afFieldInput.events({
    'keydown [data-schema-key], blur [data-schema-key]': function (event, template) {
        var context = getContext(event);
        if(!context) return;

        // Dirty state
        dirtyStates.set(context.reactiveKey, true);

        // Invalid state
        var valid = AutoForm.validateField(context.formId, context.fieldName);
        invalidStates.set(context.reactiveKey, !valid);
    },
    'blur [data-schema-key]': function (event, template) {
        var context = getContext(event);
        if(!context) return;

        // Once blurred state
        onceBlurredStates.set(context.reactiveKey, true);

        // Focused state
        focusedStates.set(context.reactiveKey, false);
    },
    'focus [data-schema-key]': function (event, template) {
        var context = getContext(event);
        if(!context) return;

        // Focused state
        focusedStates.set(context.reactiveKey, true);
    }
});

/*
 * afFieldClasses
 */
Template.registerHelper('PartupFieldClasses', function autoFormFieldClasses(options) {
    if(!options
    || !options.hash || !options.hash.name
    || !this._af || !this._af.formId) {
        return false;
    }

    var formId = this._af.formId;
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
