Template.AdminSectors.onCreated(function() {
    this.subscribe('sectors.all');
});

var placeholders = {
    'name': function() {
        return TAPi18n.__('pages-modal-create-details-form-name-placeholder');
    }
};

Template.AdminSectors.helpers({
    sectors: function() {
        return Sectors.find();
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.AdminSectors.events({
    'click [data-toggle]': function(event) {
        event.preventDefault();
        $(event.currentTarget).next('[data-toggle-target]').toggleClass('pu-state-active');
        $('[data-toggle-target]').not($(event.currentTarget).next('[data-toggle-target]')[0]).removeClass('pu-state-active');
    },
    'click [data-expand]': function(event) {
        $(event.currentTarget).addClass('pu-state-expanded');
    },
    'click [data-closepage]': function(event, template) {
        event.preventDefault();
        Intent.return('admin-sectors', {
            fallback_route: {
                name: 'discover'
            }
        });
    },
    'click [data-sector-remove]': function(event, template) {
        Partup.client.prompt.confirm({
            onConfirm: function() {
                var sectorId = $(event.currentTarget).data('sector-remove');
                Meteor.call('sectors.remove', sectorId, function(error) {
                    if (error) {
                        Partup.client.notify.error(TAPi18n.__('pages-modal-admin-createsector-error-' + error.reason));
                        return;
                    }
                    Partup.client.notify.success('Sector removed correctly');
                });
            }
        });
    }
});

/*************************************************************/
/* Widget form hooks */
/*************************************************************/
AutoForm.hooks({
    createSectorForm: {
        onSubmit: function(insertDoc, updateDoc, currentDoc) {
            var self = this;

            Meteor.call('sectors.insert', insertDoc, function(error, sectorId) {
                if (error) {
                    Partup.client.notify.error(TAPi18n.__('pages-modal-admin-createsector-error-' + error.reason));
                    return;
                }
                Partup.client.notify.success('Sector inserted correctly');
            });

            return false;
        }
    }
});

