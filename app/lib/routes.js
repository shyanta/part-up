/*************************************************************/
/* Home */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: { 
        'PagesHome': { to: 'page' }
    },
    subscriptions: function () {
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Discover */
/*************************************************************/
Router.route('/discover', {
    name: 'discover',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesDiscover': { to: 'page' }
    },
    subscriptions: function () {
        this.subscribe('partups.all');
    }
});

/*************************************************************/
/* Partup detail */
/*************************************************************/
Router.route('/partups/:_id', {
    name: 'partup-detail',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailUpdates': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/activities', {
    name: 'partup-detail-activities',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailActivities': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/budget', {
    name: 'partup-detail-budget',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailBudget': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    }
});

Router.route('/partups/:_id/anticontract', {
    name: 'partup-detail-anticontract',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailAnticontract': { to: 'partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    }
});

/*************************************************************/
/* Start Partup */
/*************************************************************/
Router.route('/start', {
    name: 'start',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesStartPartup': { to: 'page' },
        'PagesStartPartupDetails': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', Session.get('StartPartup.currentPartup'));
    }
});

Router.route('/start/:_id/activities', {
    name: 'start-activities',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesStartPartup': { to: 'page' },
        'PagesStartPartupActivities': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/contribute', {
    name: 'start-contribute',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesStartPartup': { to: 'page' },
        'PagesStartPartupContributions': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

Router.route('/start/:_id/promote', {
    name: 'start-promote',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesStartPartup': { to: 'page' },
        'PagesStartPartupPromotion': { to: 'start-partup-page' }
    },
    subscriptions: function () {
        this.subscribe('partups.detail', this.params._id);
    },
    action: function() {
        Session.set('partials.start-partup.current-partup', this.params._id);
        this.render();
    }
});

/*************************************************************/
/* Register flow */
/*************************************************************/
Router.route('/register', {
    name: 'register',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesRegister': { to: 'page' },
        'PagesRegisterRequired': { to: 'register-page' }
    }
});

Router.route('/register/details', {
    name: 'register-details',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesRegister': { to: 'page' },
        'PagesRegisterOptional': { to: 'register-page' }
    }
});