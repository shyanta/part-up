var sidebarDebugger = new Partup.client.Debugger({
    enabled: false,
    namespace: 'sidebar-scroller'
});

var Subs = new SubsManager({
    cacheLimit: 1,
    expireIn: 10
});

Template.app_partup.onCreated(function() {
    var tpl = this;

    tpl.partupId = new ReactiveVar();

    var partup_sub;

    tpl.autorun(function() {
        var id = Template.currentData().partupId;
        partup_sub = Meteor.subscribe('partups.one', id); // subs manager fails here
        Subs.subscribe('activities.from_partup', id);
        Subs.subscribe('updates.from_partup', id);
    });

    tpl.autorun(function() {
        if (!partup_sub.ready()) return;

        var partup = Partups.findOne(tpl.data.partupId);
        if (!partup) return Router.pageNotFound('partup');

        var userId = Meteor.userId();
        if (!partup.isViewableByUser(userId)) return Router.pageNotFound('partup-closed');

        tpl.partupId.set(partup._id);

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
                var imageUrl = image.url().substr(1);
                if (imageUrl) seo.meta.image = encodeURIComponent(Meteor.absoluteUrl() + imageUrl);
            }
        }
        SEO.set(seo);
    });

    var timeline = null;
    tpl.autorun(function() {
        var reactiveContainerHeight = partupDetailLayout.reactiveContainerHeight.get();

        if (reactiveContainerHeight > 0) {
            Meteor.defer(function() {
                if (!timeline) timeline = tpl.find('.pu-sub-timelineline');
                if (!timeline) return;

                timeline.style.height = reactiveContainerHeight + 'px';
            });
        }
    });
});

Template.app_partup.onRendered(function() {
    var tpl = this;

    tpl.autorun(function() {
        if (!Partups.findOne(tpl.data.partupId)) return;

        Meteor.defer(function() {
            if (!Partup.client.isMobile.any()) {
                partupDetailLayout.init.apply(partupDetailLayout);
            }
        });
    });
});

Template.app_partup_updates.helpers({
    containerHeightVar: function() {
        return partupDetailLayout.reactiveContainerHeight;
    }
});

var getScrollTop = function() {
    return window.scrollY ? window.scrollY : document.documentElement.scrollTop;
};

var partupDetailLayout = {

    HEADER_HEIGHT: 60,
    SCROLL_DEBOUNCE: 100,

    scrolling: false,

    init: function() {
        sidebarDebugger.log('init');

        this.container = document.querySelector('[data-layout-container]');
        if (!this.container) return console.warn('partup scroll logic error: could not find container');

        this.left = this.container.querySelector('[data-layout-left]');
        this.right = this.container.querySelector('[data-layout-right]');
        if (!this.left || !this.right) return console.warn('partup scroll logic error: could not find left and/or right side');

        var self = this;
        this.onWindowResize = function() {
            if (window.innerWidth >= 992) {
                self.attach();
            } else {
                self.detach();
            }
        };
        this.scrollTimer;
        this.onScroll = function() {
            if (!self.scrolling) {
                self.scrolling = true;
                $(window).trigger('pu:scrollstart');
            }
            clearTimeout(self.scrollTimer);
            self.scrollTimer = setTimeout(function() {
                self.scrolling = false;
                $(window).trigger('pu:scrollend');
            }, 100);
        };

        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('resize', this.onResize);

        $(window).on('scroll', this.onScroll);
        $(window).on('pu:scrollstart', self.onScrollStart);

        if (window.innerWidth >= 992) {
            this.attach();
        }
    },

    attach: function() {
        sidebarDebugger.log('attach');
        if (this.attached) return;
        this.attached = true;
        this.setContainerHeight();
        this.preScroll();
        this.checkScroll();

        var self = this;
        var onReRender = function() {
            self.setContainerHeight();
            self.preScroll();
            self.checkInterval();
        };
        this.debouncedScrollChecker = lodash.debounce(onReRender, 500, true);
        $(window).on('pu:componentRendered', this.debouncedScrollChecker);

        this.onScrollStart = function() {
            $(window).on('pu:scrollend', self.onScrollEnd);
            $(window).off('pu:scrollstart', self.onScrollStart);
            self.setContainerHeight();
            self.preScroll();
            self.checkInterval();
        };

        this.onScrollEnd = function() {
            $(window).on('pu:scrollstart', self.onScrollStart);
            $(window).off('pu:scrollend', self.onScrollEnd);
            self.checkInterval();
        };
        $(window).on('pu:scrollstart', self.onScrollStart);
    },

    detach: function() {
        sidebarDebugger.log('detach');
        if (!this.attached) return;
        this.attached = false;

        this.container.style.height = '';
        this.left.style.position = '';
        this.left.style.top = '';
        this.right.style.position = '';
        this.right.style.top = '';
        $(window).off('pu:scrollend', this.onScrollEnd);
        $(window).off('pu:scrollstart', this.onScrollStart);
        $(window).off('pu:componentRendered', this.debouncedScrollChecker);
        this.scrolling = false;
    },

    onResize: function() {
        sidebarDebugger.log('onResize');
        this.setContainerHeight();
        this.preScroll();
    },

    getRects: function() {
        if (!this.left) return;
        var lr = this.left.getBoundingClientRect();
        if (!this.right) return;
        var rr = this.right.getBoundingClientRect();

        if (!lr.width) lr.width = lr.right - lr.left;
        if (!lr.height) lr.height = lr.bottom - lr.top;
        if (!rr.width) rr.width = rr.right - rr.left;
        if (!rr.height) rr.height = rr.bottom - rr.top;

        return {left: lr, right: rr};
    },

    setContainerHeight: function() {
        var r = this.getRects();
        if (!r || !r.left || !r.right) return;
        var height = Math.max(r.left.height, r.right.height);
        this.container.style.height = height + 'px';
        this.containerHeight = height;
        this.reactiveContainerHeight.set(height);
    },
    reactiveContainerHeight: new ReactiveVar(0),
    containerHeight: 0,

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

        if (!r || !r.left || !r.right) return;
        if (r.left.height > r.right.height) {
            scol = 'right';
            lcol = 'left';
        } else {
            scol = 'left';
            lcol = 'right';
        }

        this.lastScrollTop = getScrollTop();
        this.maxScroll =  r[lcol].height - window.innerHeight + this.HEADER_HEIGHT;
        this.maxPos = this.containerHeight - r[scol].height;
    },

    checkScroll: function() {

        this.lastDirection = this.lastDirection || 'down';
        var scrollTop = getScrollTop();
        var columns = this.getRects();
        var br = document.body.getBoundingClientRect();
        var windowHeight = window.innerHeight;
        var direction = (scrollTop === this.lastScrollTop) ? this.lastDirection : scrollTop > this.lastScrollTop ? 'down' : 'up';
        var top;
        var pos;
        var smallColumn;
        var largeColumn;
        var headerHeight = this.HEADER_HEIGHT;

        // First we have to detemine which column is shorter
        if (!columns || !columns.left || !columns.right) return;
        if (columns.left.height > columns.right.height) {
            smallColumn = 'right';
            largeColumn = 'left';
        } else {
            smallColumn = 'left';
            largeColumn = 'right';
        }

        // column vars
        var smallColumnHeight = columns[smallColumn].height;
        var smallColumnTop = columns[smallColumn].top;
        var smallColumnBottom = columns[smallColumn].bottom;
        var largeColumnBottom = columns[largeColumn].bottom;
        // Going in the same direction as our previous scroll
        if (direction === this.lastDirection) {
            //  Going down and short column bottom is smaller than viewport height
            if (direction === 'down' && smallColumnBottom < windowHeight) {
                pos = 'fixed';
                // Short column height is smaller than viewport
                if (smallColumnHeight < windowHeight) {
                    top = 0;
                // Anchor bottom to viewport bottom
                } else {
                    top = windowHeight - smallColumnHeight;
                }
            // Going up and short column top is larger than initial position on page
            } else if (direction === 'up' && smallColumnTop > headerHeight) {
                pos = 'fixed';
                top = headerHeight;
            }
        } else {
            pos = 'absolute';
            top = scrollTop + smallColumnTop - headerHeight;
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
            (smallColumnHeight < windowHeight - headerHeight) && // 1
            (
                (
                    (smallColumnBottom < largeColumnBottom) && // 2
                    (smallColumnBottom < windowHeight) // 3
                ) ||
                (
                    (smallColumnTop > headerHeight) // 4
                )
            )
        ) {
            pos = 'fixed';
            top = 0;
        }

        if (pos === 'fixed' && top === 0) {
            top = headerHeight;
        }
        this[smallColumn].style.position = pos;
        this[smallColumn].style.top = top + 'px';

        this[largeColumn].style.position = 'absolute';
        this[largeColumn].style.top = 0 + 'px';

        this.lastDirection = direction;
        this.lastScrollTop = scrollTop;

        // this.checkingScroll = false;
    },
    destroy: function() {
        sidebarDebugger.log('destroy');
        var self = partupDetailLayout;
        window.removeEventListener('resize', self.onWindowResize);
        window.removeEventListener('resize', self.onResize);
        $(window).off('scroll', self.onScroll);
        $(window).off('pu:scrollstart', self.onScrollStart);
        $(window).off('pu:scrollend', self.onScrollEnd);
        $(window).off('pu:componentRendered', self.debouncedScrollChecker);
        self.attached = undefined;
        self.scrolling = undefined;
        self.lastDirection = undefined;
        self.lastScrollTop = undefined;
        self.maxScroll = undefined;
        self.maxPos = undefined;
        self.container = undefined;
        self.right = undefined;
        self.left = undefined;
        self.containerHeight = 0;
        self.reactiveContainerHeight.set(0);
    }
};

Template.app_partup.onDestroyed(function() {
    partupDetailLayout.destroy();
});
