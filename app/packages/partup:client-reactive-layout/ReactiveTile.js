Template.ReactiveTile.onRendered(function() {
    if (typeof this.data.onRenderCallback === 'function') {
        this.data.onRenderCallback();
    }
});
Template.ReactiveTile.helpers({
    templateName: function() {
        return Template.instance().data.templateName;
    },
    templateData: function() {
        return Template.instance().data.templateData;
    }
});
