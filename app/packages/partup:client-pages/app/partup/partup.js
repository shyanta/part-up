var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_partup.onCreated(function() {
    var template = this;

    Subs.subscribe('activities.from_partup', template.data.partupId);
    Subs.subscribe('updates.from_partup', template.data.partupId);
    var partup_sub = Subs.subscribe('partups.one', template.data.partupId);

    template.autorun(function(c) {
        if (partup_sub.ready()) {
            c.stop();

            var partup = Partups.findOne({_id: template.data.partupId});
            if (!partup) return Router.pageNotFound('partup');

            var userId = Meteor.userId();
            if (!partup.isViewableByUser(userId)) return Router.pageNotFound('partup-closed');

            var seo = {
                title: partup.name,
                meta: {
                    title: partup.name,
                    description: partup.description
                }
            };

            if (partup.image) {
                var image = Images.findOne({_id: partup.image});
                if (image) {
                    var imageUrl = image.url();
                    if (imageUrl) seo.meta.image = imageUrl;
                }
            }
            SEO.set(seo);
        }
    });

    var timeline = null;
    template.autorun(function() {
        var containerHeight = partupDetailLayout.containerHeight.get();

        if (containerHeight > 0) {
            Meteor.defer(function() {
                if (!timeline) timeline = template.find('.pu-sub-timelineline');
                if (!timeline) return;

                timeline.style.height = containerHeight + 'px';
            });
        }
    });
});

Template.app_partup.onRendered(function() {
    var tpl = this;

    tpl.autorun(function(computation) {
        var partup = Partups.findOne({_id: tpl.data.partupId});
        if (!partup) return;

        // Wait for the dom to be rendered according to the changed 'subscriptionsReady'
        Meteor.defer(function() {
            partupDetailLayout.init.apply(partupDetailLayout);
        });
    });
});

Template.app_partup.helpers({

    partup: function() {
        return Partups.findOne({_id: this.partupId});
    },

    subscriptionsReady: function() {
        return Template.instance().partupSubscription.ready();
    }

});

var getScrollTop = function() {
    return window.scrollY;
};
var partupDetailLayout = {

    HEADER_HEIGHT: 60,
    SCROLL_DEBOUNCE: 100,

    init: function() {

        this.container = document.querySelector('[data-layout-container]');
        if (!this.container) return console.warn('partup scroll logic error: could not find container');

        this.left = this.container.querySelector('[data-layout-left]');
        this.right = this.container.querySelector('[data-layout-right]');
        if (!this.left || !this.right) return console.warn('partup scroll logic error: could not find left and/or right side');

        this.bound = {
            onResize: mout.function.bind(this.onResize, this),
            onScrollStart: mout.function.debounce(mout.function.bind(this.onScrollStart, this), this.SCROLL_DEBOUNCE, true),
            onScrollEnd: mout.function.debounce(mout.function.bind(this.onScrollEnd, this), this.SCROLL_DEBOUNCE)
        };

        var self = this;
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 992) {
                self.attach();
            } else {
                self.detach();
            }
        });

        if (window.innerWidth >= 992) {
            this.attach();
        }
    },

    attach: function() {
        if (this.attached) return;
        this.attached = true;
        this.setContainerHeight();
        this.preScroll();
        this.checkScroll();

        window.addEventListener('resize', this.bound.onResize);
        window.addEventListener('scroll', this.bound.onScrollStart);
        window.addEventListener('scroll', this.bound.onScrollEnd);

        var self = this;
        this.interval = setInterval(function() {
            self.setContainerHeight();
            self.preScroll();
            self.checkInterval();
        }, 250);
    },

    detach: function() {
        if (!this.attached) return;
        this.attached = false;

        this.container.style.height = '';
        this.left.style.position = '';
        this.left.style.top = '';
        this.right.style.position = '';
        this.right.style.top = '';

        window.removeEventListener('resize', this.bound.onResize);
        window.removeEventListener('scroll', this.bound.onScrollStart);
        window.removeEventListener('scroll', this.bound.onScrollEnd);

        clearInterval(this.interval);
    },

    onResize: function() {
        this.setContainerHeight();
        this.preScroll();
    },

    onScrollStart: function() {
        this.setContainerHeight();
        this.preScroll();
        this.scrolling = true;
        this.checkInterval();
    },

    onScrollEnd: function() {
        this.checkInterval();
        this.scrolling = false;
    },

    getRects: function() {
        var lr = this.left.getBoundingClientRect();
        var rr = this.right.getBoundingClientRect();

        if (!lr.width) lr.width = lr.right - lr.left;
        if (!lr.height) lr.height = lr.bottom - lr.top;
        if (!rr.width) rr.width = rr.right - rr.left;
        if (!rr.height) rr.height = rr.bottom - rr.top;

        return {left: lr, right: rr};
    },

    setContainerHeight: function() {
        var r = this.getRects();
        var height = Math.max(r.left.height, r.right.height);
        this.container.style.height = height + 'px';
        this.containerHeight.set(height);
    },

    containerHeight: new ReactiveVar(0),

    checkInterval: function() {
        var self = this;
        requestAnimationFrame(function() {
            self.checkScroll();
            if (self.scrolling) self.checkInterval();
        });
    },

    preScroll: function() {
        var r = this.getRects();
        var br = document.body.getBoundingClientRect();
        var scol;
        var lcol;

        if (r.left.height > r.right.height) {
            scol = 'right';
            lcol = 'left';
        } else {
            scol = 'left';
            lcol = 'right';
        }

        this.lastScrollTop = getScrollTop();
        this.maxScroll =  r[lcol].height - window.innerHeight;
        this.maxPos = this.containerHeight.get() - r[scol].height;
    },

    checkScroll: function() {
        this.lastDirection = this.lastDirection || 'down';
        var scrollTop = getScrollTop();
        var r = this.getRects();
        var br = document.body.getBoundingClientRect();
        var iH = window.innerHeight;
        var direction = (scrollTop === this.lastScrollTop) ? this.lastDirection : scrollTop > this.lastScrollTop ? 'down' : 'up';
        var top;
        var pos;
        var scol;
        var lcol;

        // First we have to detemine which column is shorter
        if (r.left.height > r.right.height) {
            scol = 'right';
            lcol = 'left';
        } else {
            scol = 'left';
            lcol = 'right';
        }

        // Going in the same direction as our previous scroll
        if (direction === this.lastDirection) {
            //  Going down and short column bottom is smaller than viewport height
            if (direction === 'down' && r[scol].bottom < iH) {
                pos = 'fixed';
                // Short column height is smaller than viewport
                if (r[scol].height < iH) {
                    top = 0;
                // Anchor bottom to viewport bottom
                } else {
                    top = iH - r[scol].height;
                }
            // Going up and short column top is larger than initial position on page
            } else if (direction === 'up' && r[scol].top > this.HEADER_HEIGHT) {
                pos = 'fixed';
                top = this.HEADER_HEIGHT;
            }
        } else {
            pos = 'absolute';
            top = scrollTop + r[scol].top - this.HEADER_HEIGHT;
        }

        if (scrollTop >= this.maxScroll) {
            pos = 'absolute';
            top = this.maxPos;
        }

        // This fixes very short columns
        //
        // 1. short column height is smaller than viewport height minus initial top position
        // 2. short column bottom has to be smaller than long column bottom
        // 3. short column bottom is inside viewport
        // 4. short column top is larger than initial pos
        if (
            (r[scol].height < iH - this.HEADER_HEIGHT) && // 1
            (
                (
                    (r[scol].bottom < r[lcol].bottom) && // 2
                    (r[scol].bottom < iH) // 3
                ) ||
                (
                    (r[scol].top > this.HEADER_HEIGHT) // 4
                )
            )
        ) {
            pos = 'fixed';
            top = 0;
        }

        if (pos === 'fixed' && top === 0) {
            top = this.HEADER_HEIGHT;
        }

        this[scol].style.position = pos;
        this[scol].style.top = top + 'px';

        this[lcol].style.position = 'absolute';
        this[lcol].style.top = 0 + 'px';

        this.lastDirection = direction;
        this.lastScrollTop = scrollTop;
    }
};
