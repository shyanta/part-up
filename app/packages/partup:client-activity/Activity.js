// jscs:disable
/**
 * Widget to render a single activity
 *
 * You can pass the widget a few options which enable various functionalities
 *
 * @module client-activity
 * @param {Object} activity   The activity to render
 * @param {Function} createCallback   A function which is executed after a new activity has been added
 * @param {String} contribution_id   Contribution id to render, if only one should be rendered
 * @param {Boolean} COMMENTS_LINK   Whether the widget should display the link to comments
 * @param {Boolean} CONTRIBUTIONS   Whether the widget should display contributions
 * @param {Boolean} CREATE   Whether the widget should be shown in create mode
 * @param {Boolean} EXPANDED   Whether the widget should render in expanded state
 * @param {Boolean} POPUP   Whether the widget is being rendered inside of a modal
 * @param {Boolean} READONLY   Whether the widget should contain an edit mode
 * @param {Boolean} CREATE_PARTUP   Whether the widget is being rendered in the start partup flow
 * @param {Boolean} UPDATE_LINK   Whether the widget is being rendered in the start partup flow
 */
// jscs:enable

/*************************************************************/
/* Widget initial */
/*************************************************************/
Template.Activity.onCreated(function() {
    this.edit = new ReactiveVar(false);
    this.showContributions = new ReactiveVar(false);

    var self = this;
    this.autorun(function() {
        if (!Partup.client.focuslayer.state.get()) {
            self.edit.set(false);
        }
    });

    this.autorun(function() {
        if (self.edit.get()) {
            Partup.client.focuslayer.enable();

            // scroll
            var DELAY = 100;
            var DURATION = 750;
            setTimeout(function() {
                var elm = $(self.find('[data-activity-id]'));
                if (!elm) return;

                var offset = elm.offset().top;
                var elmIsCompletelyInView = offset >= window.scrollY &&
                    offset + elm.outerHeight() <= window.scrollY + window.innerHeight;

                if (!elmIsCompletelyInView) {
                    var max = $(document).height() - window.innerHeight;
                    var pos = Math.min(offset - 50, max);

                    $('html, body').animate({
                        scrollTop: pos
                    }, DURATION);
                }
            }, DELAY);

        } else {
            Partup.client.focuslayer.disable();
        }
    });
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.Activity.helpers({
    createCallback: function() {
        return this.createCallback;
    },
    edit: function() {
        return Template.instance().edit;
    },
    showForm: function() {
        return !this.READONLY && (!!this.CREATE || Template.instance().edit.get());
    }
});
