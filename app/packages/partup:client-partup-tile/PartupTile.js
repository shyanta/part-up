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

/*************************************************************/
/* Rendered */
/*************************************************************/
Template.PartupTile.onRendered(function() {
    var canvasElm = this.find('canvas.pu-sub-radial');
    if (canvasElm) Partup.client.partuptile.drawCircle(canvasElm);

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

/*************************************************************/
/* Helpers */
/*************************************************************/
Template.PartupTile.helpers({
    title: function() {
        return Partup.client.url.capitalizeFirstLetter(this.name);
    },
    network: function() {
        if (!this.network_id) return false;
        var network_from_cache = lodash.find(Partup.client.discover.cache.networks, {_id: this.network_id});
        return network_from_cache || Networks.findOne({_id: this.network_id});
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
        var progress = this.progress;
        if (progress < 10) progress = 10;
        return progress;
    },
    supporterCount: function() {
        if (!this.supporters) return 0;
        return this.supporters.length;
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

        return lodash.map(uppers, function(upper, index) {
            var coords = Partup.client.partuptile.getAvatarCoordinates(uppers.length, index, 0, 24, 100);

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
        var uppers = get(Template.instance(), 'data.uppers');
        return uppers.length > 5 ? uppers.length - 4 : 0;
    },
    userCard: function() {
        if (this._id) return {'data-usercard': this._id};
    },
    partupImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.partups_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
    },
    networkImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.networks_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
    },
    upperImage: function(imageId, store) {
        var image_from_cache = lodash.find(Partup.client.discover.cache.uppers_images, {_id: imageId});
        var image = image_from_cache || Images.findOne({_id: imageId});
        if (!image) return;

        return image.url({store: store});
    }
});
