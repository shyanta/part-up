var maxLength = {
    name: Partup.schemas.forms.startActivities._schema.name.max,
    description: Partup.schemas.forms.startActivities._schema.description.max
};

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.WidgetActivity.onCreated(function(){
    this.edit = new ReactiveVar(false);
    this.showContributions = new ReactiveVar(false);
    this.charactersLeft = new ReactiveDict();
    this.charactersLeft.set('name', maxLength.name);
    this.charactersLeft.set('description', maxLength.description);

    var self = this;
    this.autorun(function () {
        if(!Partup.ui.focuslayer.state.get()) {
            self.edit.set(false);
        }
    });

    this.autorun(function () {
        if(self.edit.get()) {
            Partup.ui.focuslayer.enable();

            // scroll
            var DELAY = 100;
            var DURATION = 750;
            setTimeout(function () {
                var elm = $(self.find('[data-activity-id]'));
                if(!elm) return;

                var offset = elm.offset().top;
                var elmIsCompletelyInView = offset >= window.scrollY && offset + elm.outerHeight() <= window.scrollY + window.innerHeight;

                if(!elmIsCompletelyInView) {
                    var max = $(document).height() - window.innerHeight;
                    var pos = Math.min(offset - 50, max);

                    $('html, body').animate({
                        scrollTop: pos
                    }, DURATION);
                }
            }, DELAY);

        } else {
            Partup.ui.focuslayer.disable();
        }
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetActivity.helpers({
    edit: function(){
        return Template.instance().edit;
    },

    showForm: function(){
        return !this.READONLY && (!!this.CREATE || Template.instance().edit.get());
    },
    showContributions: function(){
        return this.EXPANDED || (Template.instance().showContributions.get() && !!this.CONTRIBUTIONS);
    },
    commentsCount: function(){
        var update = Updates.findOne({ _id: this.activity.update_id });
        if (!update) return;
        return update.comments_count;
    },
    contributions: function(){
        return Contributions.find({ activity_id: this.activity._id });
    },
    showMetaData: function(){
        return this.activity.end_date || this.COMMENTS_LINK;
    },
    showPlaceholderContribution: function(){
        var user = Meteor.user();
        if (!user) return false;

        contributions = Contributions.find({ activity_id: this.activity._id }).fetch();

        for (var i = 0; i < contributions.length; i++){
            if (contributions[i].upper_id === user._id) return false;
        }

        return true;
    },
    updateContribution: function(){
        var activityId = this.activity ? this.activity._id : this.activity_id;
        return function(contribution, cb){
            Meteor.call('contribution.update', activityId, contribution, cb);
        };
    },
    upper: function(event, template){
        return Meteor.users.findOne({ _id: this.upper_id });
    },
    showEditButton: function () {
        return !this.READONLY && !this.CREATE;
    },
    createCallback: function(){
        return this.createCallback;
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetActivity.events({
    'click [data-activity-edit]': function(event, template){
        template.charactersLeft.set('name', maxLength.name - template.data.activity.name.length);
        template.charactersLeft.set('description', maxLength.description - (mout.object.get(template.data, 'activity.description.length') || 0));
        template.edit.set(true);
    },
    'click [data-expander]': function(event, template){
        var opened = template.showContributions.get();
        template.showContributions.set(!opened);
    }
});
