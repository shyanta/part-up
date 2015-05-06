var getScrollTop = function(){
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};

var partupDetailLayout = {

    init: function(){
        this.container = document.querySelector('.pu-sub-pagecontainer');
        if (!this.container) return;

        this.left = this.container.querySelector('.pu-sub-partupdetail-left');
        this.right = this.container.querySelector('.pu-sub-partupdetail-right');
        if (!this.left || !this.right) return;

        this.initialRect = this.getRects();
        this.setContainerHeight();
        this.preScroll(); // actually needs to be called ONCE on scroll start
        this.checkScroll();
        this.setEvents();
    },

    setEvents: function(){
        var self = this;
        window.addEventListener('resize', function(){
            self.setContainerHeight();
            self.preScroll();
        });

        // fake onscrollstart
        window.addEventListener('scroll', mout.function.debounce(function(){
            self.setContainerHeight();
            self.preScroll();
            self.scrolling = true;
            self.checkInterval();
        }, 100, true));

        // fake onscrollend
        window.addEventListener('scroll', mout.function.debounce(function(){
            self.scrolling = false;
        }, 100));
    },

    getRects: function(){
        var lr = this.left.getBoundingClientRect();
        var rr = this.right.getBoundingClientRect();

        if (!lr.width) lr.width = lr.right - lr.left;
        if (!lr.height) lr.height = lr.bottom - lr.top;
        if (!rr.width) rr.width = rr.right - rr.left;
        if (!rr.height) rr.height = rr.bottom - rr.top;

        return { left: lr, right: rr };
    },

    setContainerHeight: function(){
        var r = this.getRects();
        this.container.style.height = Math.max(r.left.height, r.right.height) + 'px';
    },

    checkInterval: function(){
        var self = this;
        requestAnimationFrame(function(){
            self.checkScroll();
            if (self.scrolling) self.checkInterval();
        });
    },

    preScroll: function(){
        var r = this.getRects();
        var br = document.body.getBoundingClientRect();
        var scol, lcol;

        if (r.left.height > r.right.height){
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
            this.initialRect[scol].top,
            r[lcol].bottom - br.top - r[scol].height
        ];

        if (r[scol].height < window.innerHeight - r[scol].top){
            this.constrainScroll[1] += (window.innerHeight - r[scol].height - r[scol].top);
        }
    },

    checkScroll: function(){
        var scrollTop = getScrollTop();
        var r = this.getRects();
        var br = document.body.getBoundingClientRect();
        var iH = window.innerHeight;
        var direction = scrollTop > this.lastScrollTop ? 'down' : 'up';
        var top, pos, scol, lcol;

        if (r.left.height > r.right.height){
            scol = 'right';
            lcol = 'left';
        } else {
            scol = 'left';
            lcol = 'right';
        }

        if (direction === this.lastDirection){
            if (direction === 'down' && r[scol].bottom - iH < 0){
                pos = 'fixed';
                if (r[scol].height < (iH - this.initialRect[scol].top)){
                    top = this.initialRect[scol].top;
                } else {
                    top = iH - r[scol].height;
                }
            } else if (direction === 'up' && r[scol].top > this.initialRect[scol].top){
                pos = 'fixed';
                top = this.initialRect[scol].top;
            }
        } else {
            pos = 'absolute';
            top = r[scol].top - br.top;
        }

        if (scrollTop >= this.constrainScroll[1]){
            pos = 'absolute';
            top = this.constrainPos[1];
        }

        this[scol].style.position = pos;
        this[scol].style.top = top + 'px';

        this.lastDirection = direction;
        this.lastScrollTop = scrollTop;
    }
};


/*************************************************************/
/* Partial rendered */
/*************************************************************/
Template.PartialsPartupDetailSidebar.rendered = function () {
    partupDetailLayout.init();
};


/*************************************************************/
/* Partial helpers */
/*************************************************************/
Template.PartialsPartupDetailSidebar.helpers({

    prettyEndDate: function helperPrettyEndDate() {
        var partup = this.partup();
        if (!partup) return '...';
        return moment(partup.end_date).format('LL'); // see: helpers/dateFormatters.js -> partupDateNormal
    },

    prettyVisibility: function helperPrettyVisibility() {
        var partup = this.partup();
        if (!partup) return '...';
        return TAPi18n.__('partup-detail-visibility-' + partup.visibility);
    },

    numberOfSupporters: function helperNumberOfSupporters() {
        var partup = this.partup();
        if (!partup) return '...';
        return partup.supporters ? partup.supporters.length : '0';
    },

    isSupporter: function helperIsSupporter() {
        var partup = this.partup();
        if (!partup || !partup.supporters) return false;
        var currentUserId = Meteor.user()._id;
        return partup.supporters.indexOf(currentUserId) > -1;
    },

    isUpperInPartup: function helperIsUpperInPartup() {
        var partup = this.partup();
        return partup.uppers.indexOf(Meteor.user()._id) > -1;
    }

});


/*************************************************************/
/* Partial events */
/*************************************************************/
Template.PartialsPartupDetailSidebar.events({

    'click [data-joinsupporters]': function clickJoinSupporters() {
        Meteor.call('partups.supporters.insert', Router.current().params._id);
    },

    'click [data-leavesupporters]': function clickLeaveSupporters() {
        Meteor.call('partups.supporters.remove', Router.current().params._id);
    },

    'click [data-share-facebook]': function clickShareFacebook() {
        var url = Router.current().location.get().href;
        var facebookUrl = Partup.ui.socials.generateFacebookShareUrl(url);
        window.open(facebookUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-twitter]': function clickShareTwitter(event, template) {
        var url = Router.current().location.get().href;
        var message = template.data.partup().name;
        // TODO: I18n + wording
        var twitterUrl = Partup.ui.socials.generateTwitterShareUrl(message, url);
        window.open(twitterUrl, 'pop', 'width=600, height=400, scrollbars=no');
    },

    'click [data-share-linkedin]': function clickShareLinkedin() {
        var url = Router.current().location.get().href;
        var linkedInUrl = Partup.ui.socials.generateLinkedInShareUrl(url);
        window.open(linkedInUrl, 'pop', 'width=600, height=400, scrollbars=no');
    }

});
