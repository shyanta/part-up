/*************************************************************/
/* Widget functions */
/*************************************************************/
Template.WidgetGallery.onCreated(function () {
    var template = this;
    this.scope = {
        setNewCurrent: function (relativePos) {
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
        }
    };
});

/*************************************************************/
/* Widget helpers */
/*************************************************************/
Template.WidgetGallery.helpers({
    isCurrent: function () {
        var template = Template.instance();
        return template.data.current === template.data.pictures.indexOf(this.toString());
    }
});


/*************************************************************/
/* Widget events */
/*************************************************************/
Template.WidgetGallery.events({

    'click [data-previous]': function eventsClickNext (event, template) {
        template.scope.setNewCurrent(-1);
    },

    'click [data-next]': function eventsClickNext (event, template) {
        template.scope.setNewCurrent(1);
    }

})
