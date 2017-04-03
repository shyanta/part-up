Template.AdminSectors.onCreated(function() {
    this.subscribe('sectors.all');
    this.currentSectorId = new ReactiveVar(undefined)
    this.currentToggleTarget = new ReactiveVar(undefined)
    this.toggleMenu = function () {
        var target = Template.instance().currentToggleTarget.get()
        $(target).next('[data-toggle-target]').toggleClass('pu-state-active');
        $('[data-toggle-target]').not($(target).next('[data-toggle-target]')[0]).removeClass('pu-state-active')
    }
});

Template.AdminSectors.helpers({
    sectors: function() {
        return Sectors.find();
    },
    newSector: function () {
        return {
            _id: undefined,
            name: undefined,
            phrase_key: 'network-settings-sector-'
        }
    },
    currentSector: function () {
        return Template.instance().currentSectorId.get()
    },
    toggleMenu: function () {
        return Template.instance().toggleMenu
    }
});

/*************************************************************/
/* Widget events */
/*************************************************************/
Template.AdminSectors.events({
    'click [data-toggle]': function(event, template) {
        event.preventDefault();
        template.currentToggleTarget.set(event.currentTarget)
        template.toggleMenu()
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
    'click [data-sector-edit]' : function (event, template) {
        var sectorId = $(event.currentTarget).data('sector-edit');
        template.currentSectorId.set(sectorId);
        Partup.client.popup.open({
            id: 'popup.sector-edit'
        });
        template.toggleMenu()
    },
    'click [data-sector-remove]': function(event, template) {
        var sectorId = $(event.currentTarget).data('sector-remove');

        var affectedCount = Networks.find().fetch()
            .filter(function(network) {
                return tribe.sector_id === sectorId;
            })
            .reduce(function (total, current) {
                total = total + 1;
            }, 0);

        Partup.client.prompt.confirm({
            message: `This will affect ${affectedCount} tribes, are you sure?`,
            onConfirm: function() {
                
                Meteor.call('sectors.remove', sectorId, function(error) {
                    if (error) {
                        Partup.client.notify.error(TAPi18n.__('pages-modal-admin-createsector-error-' + error.reason));
                        return;
                    }
                    Partup.client.notify.success('Sector removed correctly');
                });
            }
        });
        template.toggleMenu()
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
                self.done();
                AutoForm.resetForm('createSectorForm');
            });

            return false;
        }
    }
});

