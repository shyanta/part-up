Template.Home_Form.events({
    'submit [data-form]': function(event, template) {
        event.preventDefault();
        var values = {};

        var formData = $('[data-form]').serializeArray();

        formData.forEach(function(field, index) {
            lodash.set(values, field.name, field.value);
        });

        console.log(values);
    }
});
