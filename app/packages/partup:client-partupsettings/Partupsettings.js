var formPlaceholders = {
    name: function() {
        return __('partupsettings-form-name-placeholder');
    },
    description: function() {
        return __('partupsettings-form-description-placeholder');
    },
    tags_input: function() {
        return __('partupsettings-form-tags_input-placeholder');
    },
    budget_money: function() {
        return __('partupsettings-form-budget_money-placeholder');
    },
    budget_hours: function() {
        return __('partupsettings-form-budget_hours-placeholder');
    },
    end_date: function() {
        return __('partupsettings-form-end_date-placeholder');
    },
    location_input: function() {
        return __('partupsettings-form-location_input-placeholder');
    }
};

Template.Partupsettings.onCreated(function() {
    var template = this;

    template.nameCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.name.max);
    template.descriptionCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.description.max);
    template.imageSystem = new ImageSystem(template);
    template.budgetType = new ReactiveVar();
    template.budgetTypeChanged = new ReactiveVar();
    template.draggingFocuspoint = new ReactiveVar(false);
    template.loading = new ReactiveDict();

    template.autorun(function() {
        var partup = Template.currentData().currentPartup;
        if (!partup) return;

        if (partup.image) {
            template.imageSystem.currentImageId.set(partup.image);
            template.imageSystem.uploaded.set(true);
        } else {
            template.imageSystem.getSuggestions(partup.tags);
        }
    });

    template.setFocuspoint = function(focuspoint) {
        focuspoint.on('drag:start', function() {
            template.draggingFocuspoint.set(true);
        });
        focuspoint.on('drag:end', function(x, y) {
            template.draggingFocuspoint.set(false);
            template.imageSystem.storeFocuspoint(x, y);
        });
        template.focuspoint = focuspoint;
    };

    template.unsetFocuspoint = function() {
        template.focuspoint = undefined;
    };

    template.autorun(function() {
        var imageId = template.imageSystem.currentImageId.get();

        if (imageId && template.focuspoint) {
            template.focuspoint.reset();
        }
    });

    Template.autoForm.onCreated(function() {
        if (mout.object.get(this, 'data.id') !== template.data.FORM_ID) return;

        // Oh. My. God. Look at that hack.
        // Don't change any of these rules!
        this.autorun(function() {
            AutoForm.getFieldValue('budget_type');

            Meteor.setTimeout(function() {
                try {
                    var budget_type = AutoForm.getFieldValue('budget_type', template.data.FORM_ID);
                    template.budgetType.set(budget_type);
                } catch (e) {
                    return;
                }
            });
        });
    });
});

Template.Partupsettings.helpers({
    datepickerOptions: function() {
        var options = Partup.client.datepicker.options;
        options.startDate = new Date();
        return options;
    },
    startPartupSchema: function() {
        return Partup.schemas.forms.startPartup;
    },
    formPlaceholders: function() {
        return formPlaceholders;
    },
    fieldsFromPartup: function() {
        var partup = this.currentPartup;
        if (!partup) return null;

        return Partup.transformers.partup.toFormStartPartup(partup);
    },
    nameCharactersLeft: function() {
        return Template.instance().nameCharactersLeft.get();
    },
    descriptionCharactersLeft: function() {
        return Template.instance().descriptionCharactersLeft.get();
    },
    partupImage: function() {
        return Template.instance().imageSystem;
    },
    suggestionSetter: function() {
        return function(index) {
            Session.set('partials.create-partup.current-suggestion', index);
        };
    },
    currentSuggestion: function() {
        return Session.get('partials.create-partup.current-suggestion');
    },
    budgetOptions: function() {
        return [
            {
                label: __('partupsettings-form-budget-type-nobudget'), // todo: i18n
                value: ''
            },
            {
                label: __('partupsettings-form-budget-type-money'), // todo: i18n
                value: 'money'
            },
            {
                label: __('partupsettings-form-budget-type-hours'), // todo: i18n
                value: 'hours'
            }
        ];
    },
    galleryIsLoading: function() {
        var template = Template.instance();
        return template.loading
            && (    template.loading.get('suggesting-images')
                 || template.loading.get('image-uploading')
                 || template.loading.get('setting-suggestion')
                );
    },
    imagepreviewIsLoading: function() {
        var template = Template.instance();
        return template.loading
            && (    template.loading.get('image-uploading')
                 || template.loading.get('setting-suggestion')
                );
    },
    uploadingPicture: function() {
        var template = Template.instance();
        return template.loading && template.loading.get('image-uploading');
    },
    budgetType: function() {
        return Template.instance().budgetType.get();
    },
    budgetTypeChanged: function() {
        return Template.instance().budgetTypeChanged.get();
    },
    setFocuspoint: function() {
        return Template.instance().setFocuspoint;
    },
    unsetFocuspoint: function() {
        return Template.instance().unsetFocuspoint;
    },
    focuspointView: function() {
        return {
            template: Template.instance(),
            selector: '[data-focuspoint-view]'
        };
    },
    onFocuspointUpdate: function() {
        return Template.instance().imageSystem.storeFocuspoint;
    },
    draggingFocuspoint: function() {
        return Template.instance().draggingFocuspoint.get();
    }
});

Template.Partupsettings.events({
    'keyup [data-max]': function updateMax(event, template) {
        var max = eval($(event.target).data('max'));
        var charactersLeftVar = $(event.target).data('characters-left-var');
        template[charactersLeftVar].set(max - $(event.target).val().length);
    },
    'change [data-imageupload]': function eventChangeFile(event, template) {
        $('[data-imageupload]').replaceWith($('[data-imageupload]').clone(true));
        FS.Utility.eachFile(event, function(file) {
            template.loading.set('image-uploading', true);
            Partup.client.uploader.uploadImage(file, function(error, image) {
                if (error) {
                    Partup.client.notify.error(__('partupsettings-image-error'));
                    template.loading.set('image-uploading', false);
                    return;
                }
                template.loading.set('image-uploading', false);
                template.imageSystem.currentImageId.set(image._id);
                template.imageSystem.uploaded.set(true);
                var focuspoint = template.imageSystem.focuspoint.get();
                if (focuspoint) focuspoint.reset();
            });
        });
    },
    'change [name=budget_type]': function eventChangeBudgetType(event, template) {
        template.budgetTypeChanged.set(true);
    },
    'click [data-imageremove]': function eventChangeFile(event, template) {
        var tags = Partup.client.strings.tagsStringToArray($(event.currentTarget.form).find('[name=tags_input]').val());
        template.imageSystem.unsetUploadedPicture(tags);
    },
    'blur [name=tags_input]': function searchFlickerByTags(event, template) {
        var tagsInputValid = AutoForm.validateField(template.data.FORM_ID, 'tags_input');
        if(tagsInputValid) {
            var tags = Partup.client.strings.tagsStringToArray($(event.currentTarget).val());
            template.imageSystem.getSuggestions(tags);
        }
    },
    'click [data-removedate]': function eventsClickRemoveDate (event, template) {
        event.preventDefault();
        template.find('[name=end_date]').value = '';
    }
});

/*************************************************************/
/* Image system for Part-up cover picture */
/*************************************************************/
var ImageSystem = function ImageSystemConstructor (template) {
    var self = this;

    this.currentImageId = new ReactiveVar(false);
    this.uploaded = new ReactiveVar(false);
    this.availableSuggestions = new ReactiveVar([]);
    this.focuspoint = new ReactiveDict();

    this.getSuggestions = function(tags) {
        if (!tags || !tags.length) {
            this.availableSuggestions.set([]);
            return;
        }

        var newSuggestionsArray = [];

        var addSuggestions = function(suggestions) {
            if (!suggestions) return;
            newSuggestionsArray = newSuggestionsArray.concat(lodash.map(suggestions, 'imageUrl'));
        };

        var setAvailableSuggestions = function() {
            template.loading.set('suggesting-images', false);

            if (!newSuggestionsArray.length) {
                Partup.client.notify.warning('Could not find any images suggestions.');
                return;
            }

            self.availableSuggestions.set(newSuggestionsArray.slice(0, 5));
            Session.set('partials.create-partup.current-suggestion', 0);
        };

        template.loading.set('suggesting-images', true);
        Meteor.call('partups.services.splashbase.search', tags, function(error, result) {
            if (!error) addSuggestions(result);

            if (newSuggestionsArray.length >= 5) {
                setAvailableSuggestions();
            } else {
                Meteor.call('partups.services.flickr.search', tags, function(error, result) {
                    if (!error) addSuggestions(result);
                    setAvailableSuggestions();
                });
            }
        });
    };

    this.unsetUploadedPicture = function(tags) {
        self.getSuggestions(tags);
        self.currentImageId.set(false);
        self.uploaded.set(false);
    };

    this.storeFocuspoint = function(x, y) {
        self.focuspoint.set('x', x);
        self.focuspoint.set('y', y);
    };

    // Set suggestion
    var setSuggestionByIndex = function(index) {

        var suggestions = self.availableSuggestions.get();
        if (!mout.lang.isArray(suggestions)) return;

        var url = suggestions[index];
        if (!mout.lang.isString(url)) return;

        template.loading.set('setting-suggestion', true);
        Partup.client.uploader.uploadImageByUrl(url, function(error, image) {
            template.loading.set('setting-suggestion', false);

            if (error) {
                Partup.client.notify.error('Some error occured');
                return;
            }
            self.currentImageId.set(image._id);
        });
    };

    template.autorun(function() {
        var suggestionIndex = Session.get('partials.create-partup.current-suggestion');

        if (mout.lang.isNumber(suggestionIndex) && !mout.lang.isNaN(suggestionIndex) && !self.uploaded.get()) {
            self.currentImageId.set(false);
            self.uploaded.set(false);
            setSuggestionByIndex(suggestionIndex);

            var focuspoint = self.focuspoint.get();
            if (focuspoint) focuspoint.reset();
        }
    });
};
