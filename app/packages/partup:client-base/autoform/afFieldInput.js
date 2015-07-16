Template.afFieldInput.onRendered(function() {
    if (this.data.focusOnRender) {
        this.find('input').focus();
    }

    if (this.data.numeric) {
        $(this.find('input')).keypress(function(e) {
            var isNumber = e.charCode >= 48 && e.charCode <= 57;
            var isSeparator = e.charCode === 44 || e.charCode === 46;
            if (!isNumber && !isSeparator) {
                e.preventDefault();
            }
        });
    }
});

Meteor.startup(function() {
    Template.autoformTags.onRendered(function() {
        var input = this.findAll('input')[1];
        $(input).attr('placeholder', this.data.atts.placeholder);
        $(input).attr('style', '');
    });
});
