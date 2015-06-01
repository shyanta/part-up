/*************************************************************/
/* LayoutMain rendered */
/*************************************************************/
Template.LayoutMain.onRendered(function() {
    Bender.initialize(this.find('.pu-main'));
});