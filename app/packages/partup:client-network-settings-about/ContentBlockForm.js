Template.ContentBlockForm.onCreated(function() {
    var template = this;
    template.settings = new ReactiveVar(template.data.formSettings);
});

Template.ContentBlockForm.helpers({
    form: function() {
        var template = Template.instance();
        var settings = template.settings.get();
        return {
            contentBlockInput: {
                input: 'data-intro',
                className: 'pu-textarea pu-wysiwyg',
                placeholder: 'Schrijf een intro'
            },
            schema: Partup.schemas.forms.contentBlock,
            id: 'contentBlockForm',
            type: function() {
                return settings.type;
            }
        };
    }
});

AutoForm.addHooks('contentBlockForm', {
    onSubmit: function(doc) {
        var self = this;
        var template = self.template.parent();

        template.submitting.set(true);

        Meteor.call('networks.contentblock_insert', template.data.networkSlug, doc, function(err) {
            template.submitting.set(false);

            if (err && err.message) {
                Partup.client.notify.error(err.reason);
                return;
            }

            Partup.client.notify.success(TAPi18n.__('network-settings-form-saved'));
            self.done();
        });

        return false;
    }
});

