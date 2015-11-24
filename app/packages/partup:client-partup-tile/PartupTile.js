// jscs:disable
/**
 * Render a single partup tile
 *
 * widget options:
 *
 * @param {Boolean} HIDE_TAGS       Whether the widget should hide the tags
 * @module client-partup-tile
 */
// jscs:enable

var MAX_AVATARS = 5;
var AVATAR_DEFAULT_RADIUS = 100;
var AVATAR_HOVERING_RADIUS = 125;
var AVATAR_DEFAULT_DISTANCE = 24;
var AVATAR_HOVERING_DISTANCE = 18;

Template.PartupTile.onCreated(function() {
    var template = this;

    // Partup image reactive hover state
    template.hovering = new ReactiveVar(false);

    // Transform partup
    var partup = template.data.partup;

    // -- Partup details
    partup.name = Partup.client.url.capitalizeFirstLetter(partup.name);
    var partupImage = Images.findOne({_id: partup.image});
    partup.imageUrl = partupImage ? Partup.client.url.getImageUrl(partupImage, '360x360') : '';
    partup.boundedProgress = partup.progress ? Math.max(10, Math.min(99, partup.progress)) : 10;
    partup.tags = partup.tags.map(function(tag, index) {
        return {
            tag: tag,
            delay: .05 * index
        };
    });

    // -- Partup network
    partup.network = Networks.findOne({_id: partup.network_id});
    if (partup.network) {
        var networkIcon = Images.findOne({_id: partup.network.icon});
        partup.network.iconUrl = networkIcon ? Partup.client.url.getImageUrl(networkIcon, '32x32') : '';
    }

    // -- Partup counts
    partup.activityCount = partup.activity_count || Activities.findForPartup(partup).count();
    partup.supportersCount = partup.supporters ? partup.supporters.length : 0;
    partup.dayCount = Math.ceil(((((new Date() - new Date(partup.created_at)) / 1000) / 60) / 60) / 24);

    // -- Partup uppers
    partup.avatars = partup.uppers
        .slice(0, MAX_AVATARS)
        .map(function(avatar, index, arr) {

            // Avatar position
            var default_coords = Partup.client.partuptile.getAvatarCoordinates(arr.length, index, 0, AVATAR_DEFAULT_DISTANCE, AVATAR_DEFAULT_RADIUS);
            var hovering_coords = Partup.client.partuptile.getAvatarCoordinates(arr.length, index, 0, AVATAR_HOVERING_DISTANCE, AVATAR_HOVERING_RADIUS);
            var position = {
                default: {
                    delay: .03 * index,
                    x: default_coords.x + 95,
                    y: default_coords.y + 95
                },
                hover: {
                    delay: .03 * index,
                    x: hovering_coords.x + 95,
                    y: hovering_coords.y + 95
                }
            };

            // Blue avatar, for example: (5+)
            if (partup.uppers.length > arr.length && index + 1 === MAX_AVATARS) {
                return {
                    position: position,
                    data: {
                        remainingUppers: partup.uppers.length - MAX_AVATARS + 1
                    }
                };
            }

            // Default avatar
            var upper = Meteor.users.findOne({_id: avatar});
            if (!upper) return {};

            var upperImage = Images.findOne({_id: mout.object.get(upper, 'profile.image')});
            if (!upperImage) return {};

            return {
                position: position,
                data: {
                    upper: upper,
                    upperImageUrl: Partup.client.url.getImageUrl(upperImage, '80x80')
                }
            };
        });
});

Template.PartupTile.onRendered(function() {
    var template = this;

    // Bind tag positioner
    var tagsElement = template.find('.pu-sub-partup-tags');
    if (tagsElement) {
        template.autorun(function() {
            Partup.client.screen.size.get();
            var br = document.body.getBoundingClientRect();
            var rect = tagsElement.getBoundingClientRect();

            if (rect.right > br.right) {
                tagsElement.classList.add('pu-state-right');
            }
        });
    }

    // if (template.data.image) {
    //     var image = Images.findOne({_id: this.data.image});
    //     if (image && image.focuspoint) {
    //         var focuspointElm = this.find('[data-partup-tile-focuspoint]');
    //         this.focuspoint = new Focuspoint.View(focuspointElm, {
    //             x: image.focuspoint.x,
    //             y: image.focuspoint.y
    //         });
    //     }
    // }

    var canvasElm = template.find('canvas.pu-sub-radial');
    if (canvasElm) Partup.client.partuptile.drawCircle(canvasElm);
});

Template.PartupTile.helpers({
    avatarPosition: function() {
        return Template.instance().hovering.get() ? this.position.hover : this.position.default;
    }
});

Template.PartupTile.events({
    'mouseenter .pu-partupcircle': function(event, template) {
        template.hovering.set(true);
    },
    'mouseleave .pu-partupcircle': function(event, template) {
        template.hovering.set(false);
    }
});
