// Write your package code here!
Template.WidgetPartupdetailActivitiesDetail.helpers({
    activityUpdates: function(){
        if(!this.activity)
            return;
        if(this.activity.update_id) {
            return Updates.findOne({ _id: this.activity.update_id });
        }
    }
})