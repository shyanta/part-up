var getScrollTop = function() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

var partupDetailLayout = {

    init: function() {
        this.container = document.querySelector('.pu-app .pu-sub-pagecontainer');
        if (!this.container) return;

        this.left = this.container.querySelector('.pu-sub-partupdetail-left');
        this.right = this.container.querySelector('.pu-sub-partupdetail-right');
        if (!this.left || !this.right) return;

        this.bound = {
            onResize: mout.function.bind(this.onResize, this),
            onScrollStart: mout.function.debounce(mout.function.bind(this.onScrollStart, this), 100, true),
            onScrollEnd: mout.function.debounce(mout.function.bind(this.onScrollEnd, this), 100)
        };

        var r = this.getRects();
        var br = document.body.getBoundingClientRect();
        this.initialTop = r.left.top - br.top;

        var self = this;
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 962) {
                self.attach();
            } else {
                self.detach();
            }
        });

        if (window.innerWidth >= 962) {
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
        this.container.style.height = Math.max(r.left.height, r.right.height) + 'px';
    },

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
        this.constrainScroll = [
            0,
            r[lcol].bottom - br.top - window.innerHeight
        ];
        this.constrainPos = [
            this.initialTop,
            r[lcol].bottom - br.top - r[scol].height
        ];
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
                // Short column height is smaller than viewport height minus initial top
                if (r[scol].height < (iH - this.initialTop)) {
                    top = this.initialTop;
                } else {
                    top = iH - r[scol].height;
                }
            // Going up and short column top is larger than initial position on page
            } else if (direction === 'up' && r[scol].top > this.initialTop) {
                pos = 'fixed';
                top = this.initialTop;
            }
        } else {
            pos = 'absolute';
            top = r[scol].top - br.top;
        }

        if (scrollTop >= this.constrainScroll[1]) {
            pos = 'absolute';
            top = this.constrainPos[1];
        }

        // This fixes very short columns
        //
        // 1. short column height is smaller than viewport height minus initial top position
        // 2. short column bottom has to be smaller than long column bottom
        // 3. short column bottom is inside viewport
        // 4. short column top is larger than initial pos
        if (
            (r[scol].height < iH - this.initialTop) && // 1
            (
                (
                    (r[scol].bottom < r[lcol].bottom) && // 2
                    (r[scol].bottom < iH) // 3
                ) ||
                (
                    (r[scol].top > this.initialTop) // 4
                )
            )
        ) {
            pos = 'fixed';
            top = this.initialTop;
        }

        this[scol].style.position = pos;
        this[scol].style.top = top + 'px';

        this[lcol].style.position = 'absolute';
        this[lcol].style.top = this.initialTop + 'px';

        this.lastDirection = direction;
        this.lastScrollTop = scrollTop;
    }
};

/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.app_partup_sidebar.onRendered(function() {
    var template = this;

    partupDetailLayout.init();

    template.autorun(function() {
        var partup = template.data.partup();
        if (!partup) return;

        var image = Images.findOne({_id: partup.image});
        if (!image) return;

        var focuspointElm = template.find('[data-partupcover-focuspoint]');
        template.focuspoint = new Focuspoint.View(focuspointElm, {
            x: image.focuspoint.x,
            y: image.focuspoint.y
        });
    });
});

/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.app_partup_sidebar.helpers({

    prettyEndDate: function helperPrettyEndDate() {
        var partup = this.partup();
        if (!partup) return '...';
        return moment(partup.end_date).format('LL'); // see: helpers/dateFormatters.js -> partupDateNormal
    },

    prettyVisibility: function helperPrettyVisibility() {
        var partup = this.partup();
        if (!partup) return '...';
        return __('partup-detail-visibility-' + partup.visibility);
    },

    numberOfSupporters: function helperNumberOfSupporters() {
        var partup = this.partup();
        if (!partup) return '...';
        return partup.supporters ? partup.supporters.length : '0';
    },

    isSupporter: function helperIsSupporter() {
        var partup = this.partup();
        var user = Meteor.user();
        if (!partup || !partup.supporters || !user) return false;
        return partup.supporters.indexOf(Meteor.user()._id) > -1;
    },

    isUpperInPartup: function helperIsUpperInPartup() {
        var partup = this.partup();
        var user = Meteor.user();
        if (!partup || !partup.uppers || !user) return false;
        return partup.uppers.indexOf(user._id) > -1;
    }

});

/*************************************************************/
/* Partial events */
/*************************************************************/
Template.app_partup_sidebar.events({

    'click [data-joinsupporters]': function clickJoinSupporters() {
        Meteor.call('partups.supporters.insert', Router.current().params._id);
    },

    'click [data-leavesupporters]': function clickLeaveSupporters() {
        Meteor.call('partups.supporters.remove', Router.current().params._id);
    },

    'click [data-share-facebook]': function clickShareFacebook() {
        var url = Router.current().location.get().href;
        var facebookUrl = Partup.client.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var url = Router.current().location.get().href;
        var message = template.data.partup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.client.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin() {
        var url = Router.current().location.get().href;
        var linkedInUrl = Partup.client.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-mail]': function clickShareMail() {
        var url = Router.current().location.get().href;
        var body = 'Check out this Part-up!\n' + url;
        var subject = '';
        window.location.href = 'mailto:?body=' + encodeURIComponent(body) + '&subject=' + encodeURIComponent(subject);
    },

    'click [data-open-takepart-popup]': function clickOpenTakepartPopup() {
        Partup.client.popup.open('take-part', function(open_new_message_popup) {
            if (open_new_message_popup) {
                Partup.client.popup.open('new-message');
            }
        });
    }

    // 'click [data-invite]': function clickInvite(event, template) {
    //     var partup = template.data.partup();
    //     Partup.client.intent.go({
    //         route: 'partup-invite',
    //         params: {_id: partup._id}
    //     }, function() {
    //         Router.go('partup', {_id: partup._id});
    //     });
    // }

});
