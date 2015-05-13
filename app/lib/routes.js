/*************************************************************/
/* Home */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesHome': { to: 'app-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Discover */
/*************************************************************/
Router.route('/discover', {
    name: 'discover',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesDiscover': { to: 'app-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Partup detail */
/*************************************************************/
Router.route('/partups/:_id/updates', {
    name: 'partup-detail',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailUpdates': { to: 'partup-page' }
    },
    subscriptions: function () {
        var partupId = this.params._id;

        this.subscribe('notifications.user');
        this.subscribe('partups.one', partupId);
        this.subscribe('partups.one.updates', partupId);
    },
    data: function() {
        var partup = Partups.findOne({_id: this.params._id});
        if(partup) {
            var image = Images.findOne({_id: partup.image});
        }
        return {
            partup: partup,
            image: image
        }
    },
    onAfterAction: function() {
        if (!Meteor.isClient) return;

        var partup = this.data().partup;
        if (!partup) return;

        var image = this.data().image;
        var seoMetaData = {
            title: partup.name,
            meta: {
                'title': partup.name,
                'description': partup.description
            }
        };
        if(image) {
            seoMetaData.meta.image = image.url();
        }
        SEO.set(seoMetaData);
    }
});

Router.route('/partups/:_id/updates/:update_id', {
    name: 'partup-detail-update',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailUpdatesItemDetail': { to: 'partup-page' }
    },
    subscriptions: function () {
        var partupId = this.params._id;
        var updateId = this.params.update_id;

        this.subscribe('notifications.user');
        this.subscribe('partups.one', partupId);
        this.subscribe('partups.one.updates.one', updateId);

    },
    data: function() {
        var partup = Partups.findOne({_id: this.params._id});
        if(partup) {
            var image = Images.findOne({_id: partup.image});
        }
        return {
            partup: partup,
            image: image
        }
    },
});

Router.route('/partups/:_id/activities', {
    name: 'partup-detail-activities',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailActivities': { to: 'partup-page' }
    },
    subscriptions: function () {
        var partupId = this.params._id;

        this.subscribe('notifications.user');
        this.subscribe('partups.one', partupId);
        this.subscribe('partups.one.activities', partupId);
        this.subscribe('partups.one.contributions', partupId);
    }
});

Router.route('/partups/:_id/budget', {
    name: 'partup-detail-budget',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailBudget': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.one', this.params._id);
    }
});

Router.route('/partups/:_id/anticontract', {
    name: 'partup-detail-anticontract',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        // 'PagesUnderConstruction': { to: 'app-page' }
        'PagesPartupDetail': { to: 'app-page' },
        'PagesPartupDetailAnticontract': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('notifications.user');
        this.subscribe('partups.one', this.params._id);
    }
});

/*************************************************************/
/* Start Partup */
/*************************************************************/
Router.route('/start', {
    name: 'start',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartupIntro': { to: 'modal-page' }
    }
});

Router.route('/start/details', {
    name: 'start-details',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupDetails': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.one', Session.get('partials.start-partup.current-partup'));
    }
});

Router.route('/start/:_id/activities', {
    name: 'start-activities',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupActivities': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.one', this.params._id);
        this.subscribe('partups.one.activities', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/promote', {
    name: 'start-promote',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesStartPartup': { to: 'modal-page' },
        'PagesStartPartupPromote': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.one', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});


/*************************************************************/
/* Login flow */
/*************************************************************/
Router.route('/login', {
    name: 'login',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesLogin': { to: 'modal-page' }
    }
});


/*************************************************************/
/* Password reset */
/*************************************************************/
Router.route('/forgot-password', {
    name: 'forgot-password',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesForgotPassword': { to: 'modal-page' }
    }
});

Router.route('/reset-password/:token', {
    name: 'reset-password',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesResetPassword': { to: 'modal-page' }
    }
});


/*************************************************************/
/* Verify Account */
/*************************************************************/
Router.route('/verify-email/:token', {
    name: 'verify-email',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesForgotPassword': { to: 'modal-page' }
    }
});


/*************************************************************/
/* Register flow */
/*************************************************************/
Router.route('/register', {
    name: 'register',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesRegister': { to: 'modal-page' },
        'PagesRegisterRequired': { to: 'register-page' }
    },
    subscriptions: function () {
        this.subscribe('users.count');
    }
});

Router.route('/register/details', {
    name: 'register-details',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesModal': { to: 'page' },
        'PagesRegister': { to: 'modal-page' },
        'PagesRegisterOptional': { to: 'register-page' }
    }
});


/*************************************************************/
/* Styleguide */
/*************************************************************/
Router.route('/styleguide', {
    name: 'styleguide',
    where: 'client',
    layoutTemplate: 'LayoutsMain',
    yieldRegions: {
        'PagesApp': { to: 'page' },
        'PagesStyleguide': { to: 'app-page' }
    }
});


/*************************************************************/
/* Close route */
/*************************************************************/
Router.route('/close', {
    name: 'close',
    where: 'client',
    onBeforeAction: function () {
        window.close();
    }
});


/*************************************************************/
/* Route protection */
/*************************************************************/

var partupRouterHooks = {
    loginRequired: function() {
        if (!Meteor.userId()) {
            Session.set('application.return-url', this.url);
            Router.go('login');
        }
        else {
            this.next();
        }
    }
}

Router.onBeforeAction(partupRouterHooks.loginRequired, {
    only: [
        'start',
        'start-details',
        'start-activities',
        'start-contribute',
        'start-promote',
        'register-details',
    ]
});

if(Meteor.isClient) {
    Router.onBeforeAction(function() {
        window.scrollTo(0, 0);
        this.next();
    });
};
