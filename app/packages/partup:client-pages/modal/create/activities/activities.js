/*************************************************************/
/* Widget initial */
/*************************************************************/
var getActivities = function(partupId) {
    return Activities.find({partup_id: partupId}, {sort: {created_at: -1}});
};

Template.modal_create_activities.onCreated(function() {
    var partupId = mout.object.get(this, 'data.partupId') || Session.get('partials.create-partup.current-partup');
    var handle = this.subscribe('activities.from_partup', partupId);

    this.autorun(function(c) {
        if (handle.ready()) {
            c.stop();
            Meteor.defer(Partup.client.scroll.triggerUpdate);
        }
    });

    this.subscribe('partups.one', partupId);
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.modal_create_activities.helpers({
    Partup: Partup,
    partupActivities: function() {
        return getActivities(this.partupId);
    },
    currentPartupId: function() {
        return Session.get('partials.create-partup.current-partup');
    },
    createCallback: function() {
        var template = Template.instance();
        return function(activityId) {
            setTimeout(function() {
                var createElm = $('.pu-activity-create');
                var elm = $('[data-activity-id=' + activityId + ']');

                var scroller = Partup.client.scroll._element;
                var max = scroller.scrollHeight - scroller.clientHeight;

                $(scroller).animate({
                    scrollTop: Math.min(createElm[0].offsetTop - 0, max)
                }, 250, 'swing', function() {
                    elm.addClass('pu-state-highlight');
                });
            });
        };
    },
    showActivityPlaceholder: function() {
        return getActivities(this.partupId).count() === 0;
    },
    placeholderActivity: function() {
        return {
            name: __('pages-modal-create-activities-placeholder-name'),
            description: __('pages-modal-create-activities-placeholder-description')
        };
    },
    isUpper: function() {
        var userId = Meteor.userId();
        if (!userId) return false;

        var partupId = Session.get('partials.create-partup.current-partup');
        if (!partupId) return false;

        var partup = Partups.findOne(partupId);
        if (!partup) return false;

        return partup.hasUpper(userId);
    },
    fixFooter: function() {
        var scrollPos = Partup.client.scroll.pos.get();

        if (!Partup.client.scroll._element) return false;
        var maxScroll = Partup.client.scroll._element.scrollHeight - Partup.client.scroll._element.clientHeight;

        return scrollPos < maxScroll - 50;
    },
});
