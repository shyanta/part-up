Template.PartupTile_active.helpers({
    avatarPosition: function() {
        return Template.instance().data.partup.hovering.get() ? this.position.hover : this.position.default;
    }
});
