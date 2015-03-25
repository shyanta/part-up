Template.WidgetStartContribute.helpers({
    'Partup': Partup,
    'placeholders': Partup.services.placeholders.startcontribute,
    'partupActivities': function () {
        var partupId = Session.get('partials.start-partup.current-partup');
        return Activities.find({ partup_id: partupId }, {sort: { created_at: -1 }});
    },
});

Template.WidgetStartContribute.events({
    'click #nextPage': function () {
        Router.go('start-promote', {_id: Session.get('partials.start-partup.current-partup')});
    }
});

Template.WidgetStartContribute.rendered = function () {
    //
};