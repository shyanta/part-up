/*************************************************************/
/* Widget image system */
/*************************************************************/
var ImageSystem = function ImageSystemConstructor (template) {
    var self = this;

    this.currentImageId = new ReactiveVar(false);
    this.uploaded = new ReactiveVar(false);
    this.availableSuggestions = new ReactiveVar([]);

    this.getSuggestions = function (tags) {
        if(!tags || !tags.length) {
            this.availableSuggestions.set([]);
            return;
        }

        var newSuggestionsArray = [];

        var addSuggestions = function (suggestions) {
            if(!suggestions) return;
            newSuggestionsArray = newSuggestionsArray.concat(lodash.map(suggestions, 'imageUrl'));
        };

        var setAvailableSuggestions = function () {
            template.loading.set('suggesting-images', false);

            if(!newSuggestionsArray.length) {
                Partup.ui.notify.warning('Could not find any images suggestions.');
                return;
            }

            self.availableSuggestions.set(newSuggestionsArray.slice(0, 5));
            Session.set('partials.start-partup.current-suggestion', 0);
        };

        template.loading.set('suggesting-images', true);
        Meteor.call('partups.services.splashbase.search', tags, function(error, result) {
            if (!error) addSuggestions(result);

            if (newSuggestionsArray.length >= 5) {
                setAvailableSuggestions();
            } else {
                Meteor.call('partups.services.flickr.search', tags, function(error, result) {
                    if(!error) addSuggestions(result);
                    setAvailableSuggestions();
                });
            }
        });
    };

    this.unsetUploadedPicture = function (tags) {
        self.getSuggestions(tags);
        self.currentImageId.set(false);
        self.uploaded.set(false);
    };

    // Set suggestion
    var setSuggestionByIndex = function (index) {

        var suggestions = self.availableSuggestions.get();
        if(!mout.lang.isArray(suggestions)) return;

        var url = suggestions[index];
        if(!mout.lang.isString(url)) return;

        template.loading.set('setting-suggestion', true);
        Partup.ui.uploader.uploadImageByUrl(url, function (error, image) {
            self.currentImageId.set(image._id);
            template.loading.set('setting-suggestion', false);
        });
    };

    template.autorun(function() {
        var suggestionIndex = Session.get('partials.start-partup.current-suggestion');

        if(mout.lang.isNumber(suggestionIndex) && !mout.lang.isNaN(suggestionIndex) && !self.uploaded.get()) {
            self.currentImageId.set(false);
            self.uploaded.set(false);
            setSuggestionByIndex(suggestionIndex);
        }
    });
};

/*************************************************************/
/* Widget on created */
/*************************************************************/
Template.WidgetStartDetails.onCreated(function() {
    var template = this;

    template.data = template.data || {};
    template.data.currentPartup = Partups.findOne({ _id: Session.get('partials.start-partup.current-partup') });
    template.loading = new ReactiveDict();
    template.nameCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.name.max);
    template.descriptionCharactersLeft = new ReactiveVar(Partup.schemas.entities.partup._schema.description.max);
    template.imageSystem = new ImageSystem(template);

    template.autorun(function () {
        var p = template.data.currentPartup;

        if(!p) return;

        if(p.image) {
            template.imageSystem.currentImageId.set(p.image);
            template.imageSystem.uploaded.set(true);
        } else {
            template.imageSystem.getSuggestions(p.tags);
        }
    });

    template.budgetType = new ReactiveVar();
    
});

/*************************************************************/
/* AutoForm on rendered */
/*************************************************************/
Template.autoForm.onRendered(function () {
    if(this.data.id !== 'partupForm') return;

    var widgetTemplate = this.parent();

    this.autorun(function () {
        var formId = AutoForm.getFormId();
        if(!formId) return;

        var budget_type = AutoForm.getFieldValue('budget_type');
        widgetTemplate.budgetType.set(budget_type);
    });

});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetStartDetails.helpers({
    Partup: Partup,
    placeholders: Partup.services.placeholders.startdetails,
    fieldsFromPartup: function() {
        var p = this.currentPartup;
        return p ? Partup.transformers.partup.toFormStartPartup(p) : {};
    },
    nameCharactersLeft: function(){
        return Template.instance().nameCharactersLeft.get();
    },
    descriptionCharactersLeft: function(){
        return Template.instance().descriptionCharactersLeft.get();
    },
    partupImage: function () {
        return Template.instance().imageSystem;
    },
    suggestionSetter: function () {
        return function (index) {
            Session.set('partials.start-partup.current-suggestion', index);
        }
    },
    currentSuggestion: function () {
        return Session.get('partials.start-partup.current-suggestion');
    },
    budgetOptions: function () {
        return [
            {
                label: 'Geen budget',
                value: ''
            },
            {
                label: 'Ja, in geld',
                value: 'money'
            },
            {
                label: 'Ja, in uren',
                value: 'hours'
            }
        ];
    },
    galleryIsLoading: function () {
        var template = Template.instance();
        return template.loading
            && (    template.loading.get('suggesting-images')
                 || template.loading.get('image-uploading')
                 || template.loading.get('setting-suggestion')
                );
    },
    budgetType: function () {
        return Template.instance().budgetType.get();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetStartDetails.events({
    'keyup [data-max]': function updateMax(event, template) {
        var max = eval($(event.target).data("max"));
        var charactersLeftVar = $(event.target).data("characters-left-var");
        template[charactersLeftVar].set(max - $(event.target).val().length);
    },
    'change [data-imageupload]': function eventChangeFile(event, template) {
        $("[data-imageupload]").replaceWith($("[data-imageupload]").clone(true));
        FS.Utility.eachFile(event, function (file) {
            template.loading.set('image-uploading', true);
            Partup.ui.uploader.uploadImage(file, function (error, image) {
                template.imageSystem.currentImageId.set(image._id);
                template.imageSystem.uploaded.set(true);
                template.loading.set('image-uploading', false);
            });
        });
    },
    'change [name=budget_type]': function eventChangeBudgetType(event, template) {
        var budgetType = $(event.currentTarget).val();
        setTimeout(function() {
            var budgetAmountField = template.find('[name=budget_' + budgetType + ']');

            if(budgetType) {
                $(budgetAmountField).val('');
                budgetAmountField.focus();
            }
        });
    },
    'click [data-imageremove]': function eventChangeFile(event, template) {
        var tags = Partup.ui.strings.tagsStringToArray($(event.currentTarget.form).find('[name=tags_input]').val());
        template.imageSystem.unsetUploadedPicture(tags);
    },
    'blur [name=tags_input]': function searchFlickerByTags(event, template) {
        var tags = Partup.ui.strings.tagsStringToArray($(event.currentTarget).val());
        Template.instance().imageSystem.getSuggestions(tags);
    },
    'click [data-submission-type]': function eventClickSetSubmissionType (event) {
        var submissionType = event.currentTarget.getAttribute('data-submission-type');
        Session.set('partials.start-partup.submission-type', submissionType);
    }
});

/*************************************************************/
/* Widget create partup */
/*************************************************************/
var createOrUpdatePartup = function createOrUpdatePartup (partupId, insertDoc, callback) {
    if(partupId) {

        // Partup already exists. Update.
        Meteor.call('partups.update', partupId, insertDoc, function(error, res){
            if(error && error.message) {
                switch (error.message) {
                    // case 'User not found [403]':
                    //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                    //     break;
                    default:
                        Partup.ui.notify.error(error.reason);
                }
                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }
            
            callback(partupId);
        });

    } else {

        // Partup does not exists yet. Insert.
        Meteor.call('partups.insert', insertDoc, function(error, res){
            if(error && error.message) {
                switch (error.message) {
                    // case 'User not found [403]':
                    //     Partup.ui.forms.addStickyFieldError(self, 'email', 'emailNotFound');
                    //     break;
                    default:
                        Partup.ui.notify.error(error.reason);
                }
                AutoForm.validateForm(self.formId);
                self.done(new Error(error.message));
                return;
            }

            Session.set('partials.start-partup.current-partup', res._id);
            callback(res._id);
        });

    }
};

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    partupForm: {
        onSubmit: function(insertDoc) {
            var self = this;
            var partupId = Session.get('partials.start-partup.current-partup');
            var submissionType = Session.get('partials.start-partup.submission-type') || 'next';

            createOrUpdatePartup(partupId, insertDoc, function (id) {
                if(submissionType === 'next') {
                    Router.go('start-activities', {_id: id});
                } else if (submissionType === 'skip') {
                    Partup.ui.modal.executeIntentCallback('start', id, function (id) {
                        Router.go('partup-detail', { _id: id });
                    });
                }
            });

            this.event.preventDefault();
            return false;
        }
    }
});
