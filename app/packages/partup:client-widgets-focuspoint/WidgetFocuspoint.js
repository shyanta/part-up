Template.WidgetFocuspoint.onRendered(function () {
    var template = this;

    var focuspoint_edit = template.find('[data-focuspoint-edit]');
    if (focuspoint_edit) {
        Meteor.setTimeout(function () {
            var view_elms = template.data.view_elm.template.findAll(template.data.view_elm.selector);

            template.focuspoint = new Focuspoint.Edit(focuspoint_edit, {
                x: template.data.x || x,
                y: template.data.y || y,
                view_elm: view_elms || undefined
            });

            template.focuspoint.on('drag:move', function (x, y) {
                if(mout.lang.isFunction(template.data.move)) {
                    template.data.move(x, y);
                }
            });

            template.focuspoint.on('drag:end', function (x, y) {
                if(mout.lang.isFunction(template.data.update)) {
                    template.data.update(x, y);
                }
            });

            template.data.focuspoint(template.focuspoint);
        });
    }
});

Template.WidgetFocuspoint.onDestroyed(function () {
    var template = this;

    if (template.focuspoint) {
        template.focuspoint.kill();
        template.data.unset();
    }
});
