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

var positionTags = function(tagsEl) {
    var br = document.body.getBoundingClientRect();
    var rect = tagsEl.getBoundingClientRect();

    if (rect.right > br.right) {
        tagsEl.classList.add('pu-state-right');
    }

};

Template.PartupTile.onCreated(function() {
    this.hoveringPartupcircles = new ReactiveDict();
});

Template.PartupTile.onRendered(function() {
    var tagsEl = this.find('.pu-sub-partup-tags');
    if (tagsEl) {
        positionTags(tagsEl);
        window.addEventListener('resize', function() {
            positionTags(tagsEl);
        });
    }

    if (this.data.image) {
        var image = Images.findOne({_id: this.data.image});
        if (image && image.focuspoint) {
            var focuspointElm = this.find('[data-partup-tile-focuspoint]');
            this.focuspoint = new Focuspoint.View(focuspointElm, {
                x: image.focuspoint.x,
                y: image.focuspoint.y
            });
        }
    }
});

Template.PartupTile.helpers({
    title: function() {
        return Partup.client.url.capitalizeFirstLetter(this.name);
    },
    network: function() {
        if (!this.partup.network_id) return false;
        var network_from_cache = lodash.find(Partup.client.discover.cache.networks, {_id: this.partup.network_id});
        return network_from_cache || Networks.findOne({_id: this.partup.network_id});
    },
    activityCount: function() {
        return this.activity_count || Activities.findForPartup(this).count();
    },
    dayCount: function() {
        var created = new Date(this.created_at);
        var now = new Date();
        return Math.ceil(((((now - created) / 1000) / 60) / 60) / 24);
    },
    progress: function() {
        if (!this.progress) return;
        var template = Template.instance();

        Meteor.defer(function() {
            var canvasElm = template.find('canvas.pu-sub-radial');
            if (canvasElm) Partup.client.partuptile.drawCircle(canvasElm);
        });

        return Math.max(10, Math.min(99, this.progress));
    },
    supporterCount: function() {
        if (this.supporters && this.supporters.length) {
            return this.supporters.length;
        } else {
            return 0;
        }
    },
    tags: function() {
        if (!this.partup.tags) return;

        var tags = [];
        for (var i = 0; i < this.partup.tags.length; i++) {
            tags.push({
                tag: this.partup.tags[i],
                delay: .075 * i
            });
        }

        return tags;
    },
    upper: function() {
        var upper_from_cache = lodash.find(Partup.client.discover.cache.uppers, {_id: this._id});
        return upper_from_cache || Meteor.users.findOne({_id: this._id});
    },
    uppers: function() {
        if (!this._id || !this.uppers) return;
        var uppers = this.uppers.slice(0);

        if (uppers.length > 5) {
            while (uppers.length > 4) {
                uppers.pop();
            }

            uppers.push(null);
        }

        // Make the radius and the distance depend on the hover state
        var hovering = Template.instance().hoveringPartupcircles.get(this._id);
        var radius = hovering ? 125 : 100;
        var distance = hovering ? 18 : 24;

        return lodash.map(uppers, function(upper, index) {
            var coords = Partup.client.partuptile.getAvatarCoordinates(uppers.length, index, 0, distance, radius);

            var attributes = {
                x: coords.x + 95,
                y: coords.y + 95,
                delay: .075 * index
            };

            if (upper) {
                attributes._id = upper;
            }

            return attributes;
        });
    },
    remainingUppers: function() {
        var uppers = get(Template.instance(), 'data.partup.uppers');
        if (uppers && uppers.length && uppers.length > 5) {
            return uppers.length - 4;
        } else {
            return 0;
        }
    },
    userCard: function() {
        if (this._id) return {'data-usercard': this._id};
    },
    partupImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.partups_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;
        return Partup.client.url.getImageUrl(image, store);
    },
    networkImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.networks_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;
        return Partup.client.url.getImageUrl(image, store);
    },
    upperImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.uppers_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;
        return Partup.client.url.getImageUrl(image, store);
    }
});

Template.PartupTile.events({
    'mouseenter .pu-partupcircle': function(event, template) {
        var partupId = event.currentTarget.getAttribute('data-partup-id');
        template.hoveringPartupcircles.set(partupId, true);
    },
    'mouseleave .pu-partupcircle': function(event, template) {
        var partupId = event.currentTarget.getAttribute('data-partup-id');
        template.hoveringPartupcircles.set(partupId, false);
    }
});
