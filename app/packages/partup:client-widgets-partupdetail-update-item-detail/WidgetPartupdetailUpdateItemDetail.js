// Write your package code here!
Template.WidgetPartupdetailUpdatesItemDetail.helpers({
    update: function(){
        var update_id = Router.current().params.update_id;
        if(update_id) {
            return Updates.findOne({ _id: Router.current().params.update_id });
        }
    }
})