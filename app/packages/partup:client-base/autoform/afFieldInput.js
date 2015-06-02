Template.afFieldInput.onRendered(function() {
    if (this.data.focusOnRender) {
        this.find('input').focus();
    }
});
