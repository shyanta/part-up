Template.PartupTileFeatured.onRendered(function() {
    var tpl = this;

    var canvasElm = tpl.find('canvas.pu-sub-radial');
    if (canvasElm) Partup.client.partuptile.drawCircle(canvasElm);

    tpl.autorun(function() {
        var image = Images.findOne({_id: get(tpl, 'data.partup.image')});
        if (!image || !image.focuspoint) return;

        var elm = tpl.find('[data-partuptile-focuspoint]');
        new Focuspoint.View(elm, {
            x: image.focuspoint.x,
            y: image.focuspoint.y
        });
    });
});

Template.PartupTileFeatured.helpers({
    upper: function() {
        var upper_from_cache = lodash.find(Partup.client.discover.cache.uppers, {_id: this._id});
        return upper_from_cache || Meteor.users.findOne({_id: this._id});
    },
    progress: function() {
        if (!this.partup) return;
        var template = Template.instance();

        Meteor.defer(function() {
            var canvasElm = template.find('canvas.pu-sub-radial');
            if (canvasElm) Partup.client.partuptile.drawCircle(canvasElm);
        });

        return Math.max(10, Math.min(99, this.partup.progress));
    },
    avatars: function() {
        if (!this.partup || !this.partup.uppers) return;
        var uppers = this.partup.uppers.slice(0);

        if (uppers.length > 5) {
            while (uppers.length > 4) {
                uppers.pop();
            }

            uppers.push(null);
        }

        return lodash.map(uppers, function(upper, index) {
            var coords = Partup.client.partuptile.getAvatarCoordinates(uppers.length, index, 0, 18, 125);

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
    activityCount: function() {
        if (!this.partup || !this.partup.activity_count) return 0;
        return this.partup.activity_count;
    },
    dayCount: function() {
        if (!this.partup) return 0;

        var created = new Date(this.partup.created_at);
        var now = new Date();
        return Math.ceil(((((now - created) / 1000) / 60) / 60) / 24);
    },
    supporterCount: function() {
        if (!this.partup || !this.partup.supporters) return 0;
        return this.partup.supporters.length;
    }
});

Template.PartupTileFeatured_commentbox.helpers({
    featured_by_user: function() {
        if (!this.partup) return;

        return Meteor.users.findOne(this.partup.featured.by_upper._id);
    },
    featured_by_user_title: function() {
        return get(Template.instance(), 'data.partup.featured.by_upper.title');
    }
});
