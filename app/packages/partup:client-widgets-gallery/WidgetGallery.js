/*************************************************************/
/* Widget functions */
/*************************************************************/
Template.WidgetGallery.onCreated(function () {
    var template = this;

    template.setNewCurrent = function (relativePos) {
        var pictures = template.data.pictures;
        var current = template.data.current;
        var newCurrent = current + relativePos;

        if(relativePos > 0 && newCurrent > pictures.length - 1) {
            newCurrent = 0;
        } else if(relativePos < 0 && newCurrent < 0) {
            newCurrent = pictures.length - 1;
        } else if(newCurrent < 0 || newCurrent > pictures.length - 1) {
            newCurrent = 0;
        }

        template.data.setter(newCurrent);
    };

    template.setFocuspoint = function (focuspoint) {
        focuspoint.on('drag:end', template.data.fp_update);
        template.focuspoint = focuspoint;
    };

    template.unsetFocuspoint = function () {
        template.focuspoint = undefined;
    };
});


/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetGallery.helpers({
    isCurrent: function () {
        var template = Template.instance();
        return template.data.current === template.data.pictures.indexOf(this.toString());
    },
    setFocuspoint: function () {
        return Template.instance().setFocuspoint;
    },
    unsetFocuspoint: function () {
        return Template.instance().unsetFocuspoint;
    },
    focuspointView: function () {
        return {
            template: Template.instance(),
            selector: '[data-focuspoint-view]'
        };
    },
});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetGallery.events({

    'click [data-previous]': function eventsClickNext (event, template) {
        template.setNewCurrent(-1);
        if (template.focuspoint) template.focuspoint.set(0.5, 0.5);
    },

    'click [data-next]': function eventsClickNext (event, template) {
        template.setNewCurrent(1);
        if (template.focuspoint) template.focuspoint.set(0.5, 0.5);
    }

});
