/**
 * This namespace contains router helpers etc
 * @namespace Router
 */
/*************************************************************/
/* Configurations */
/*************************************************************/
Router.configure({
    layoutTemplate: 'main',
    state: function() {
        return {
            type: 'default'
        };
    }
});

/*************************************************************/
/* Home */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_home': {to: 'app'}
    }
});

/*************************************************************/
/* Discover */
/*************************************************************/
Router.route('/discover', {
    name: 'discover',
    where: 'client',
    yieldRegions: {
        'app':          {to: 'main'},
        'app_discover': {to: 'app'}
    }
});

/*************************************************************/
/* Profile */
/*************************************************************/
Router.route('/profile', {
    name: 'profile',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'},
        'app_profile': {to: 'app'},
        'app_profile_upper_partups': {to: 'app_profile'}
    },
    onBeforeAction: function() {
        if (!this.params._id) {
            this.params._id = Meteor.userId();
        }
        this.next();
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

Router.route('/profile/:_id', {
    name: 'profile-upper-partups',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'},
        'app_profile': {to: 'app'},
        'app_profile_upper_partups': {to: 'app_profile'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

Router.route('/profile/:_id/supporter', {
    name: 'profile-supporter-partups',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'},
        'app_profile': {to: 'app'},
        'app_profile_supporter_partups': {to: 'app_profile'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

/*************************************************************/
/* Profile settings modal */
/*************************************************************/
Router.route('/profile/:_id/settings', {
    name: 'profile-settings',
    where: 'client',
    yieldRegions: {
        'modal':              {to: 'main'},
        'modal_profile_settings': {to: 'modal'},
        'modal_profile_settings_account': {to: 'modal_profile_settings'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

Router.route('/profile/:_id/settings/details', {
    name: 'profile-settings-details',
    where: 'client',
    yieldRegions: {
        'modal':              {to: 'main'},
        'modal_profile_settings': {to: 'modal'},
        'modal_profile_settings_details': {to: 'modal_profile_settings'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

Router.route('/profile/:_id/settings/email', {
    name: 'profile-settings-email',
    where: 'client',
    yieldRegions: {
        'modal':              {to: 'main'},
        'modal_profile_settings': {to: 'modal'},
        'modal_profile_settings_email': {to: 'modal_profile_settings'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

/*************************************************************/
/* Networks */
/*************************************************************/
Router.route('/tribes/create', {
    name: 'create-network',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_create_network':    {to: 'modal'}
    }
});

Router.route('/tribes/:_id', {
    name: 'network-detail',
    where: 'client',
    yieldRegions: {
        'app':                      {to: 'main'},
        'app_network':              {to: 'app'},
        'app_network_partups':      {to: 'app_network'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/tribes/:_id/uppers', {
    name: 'network-uppers',
    where: 'client',
    yieldRegions: {
        'app':                  {to: 'main'},
        'app_network':          {to: 'app'},
        'app_network_uppers':   {to: 'app_network'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/tribes/:_id/invite', {
    name: 'network-invite',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_network_invite':    {to: 'modal'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

/*************************************************************/
/* Network admin */
/*************************************************************/
Router.route('/tribes/:_id/settings', {
    name: 'network-settings',
    where: 'client',
    yieldRegions: {
        'modal':                          {to: 'main'},
        'modal_network_settings':         {to: 'modal'},
        'modal_network_settings_details': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/tribes/:_id/settings/uppers', {
    name: 'network-settings-uppers',
    where: 'client',
    yieldRegions: {
        'modal':                         {to: 'main'},
        'modal_network_settings':        {to: 'modal'},
        'modal_network_settings_uppers': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

Router.route('/tribes/:_id/settings/requests', {
    name: 'network-settings-requests',
    where: 'client',
    yieldRegions: {
        'modal':                           {to: 'main'},
        'modal_network_settings':          {to: 'modal'},
        'modal_network_settings_requests': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkId: this.params._id
        };
    }
});

/*************************************************************/
/* Partup detail */
/*************************************************************/
Router.route('/partups/:_id', {
    name: 'partup',
    where: 'client',
    yieldRegions: {
        'app':                {to: 'main'},
        'app_partup':         {to: 'app'},
        'app_partup_updates': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    onRun: function() {
        Meteor.call('partups.analytics.click', this.data().partupId);
        this.next();
    }
});

Router.route('/partups/:_id/updates/:update_id', {
    name: 'partup-update',
    where: 'client',
    yieldRegions: {
        'app':               {to: 'main'},
        'app_partup':        {to: 'app'},
        'app_partup_update': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: this.params._id,
            updateId: this.params.update_id
        };
    }
});

Router.route('/partups/:_id/activities', {
    name: 'partup-activities',
    where: 'client',
    yieldRegions: {
        'app':                   {to: 'main'},
        'app_partup':            {to: 'app'},
        'app_partup_activities': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    }
});

Router.route('/partups/:_id/invite-for-activity/:activity_id', {
    name: 'partup-activity-invite',
    where: 'client',
    yieldRegions: {
        'modal':                    {to: 'main'},
        'modal_invite_to_activity': {to: 'modal'},
    },
    data: function() {
        return {
            partupId: this.params._id,
            activityId: this.params.activity_id
        };
    }
});

Router.route('/partups/:_id/settings', {
    name: 'partup-settings',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_partup_settings': {to: 'modal'},
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    }
});

/*************************************************************/
/* Create Partup */
/*************************************************************/
Router.route('/start', {
    name: 'create',
    where: 'client',
    yieldRegions: {
        'modal':              {to: 'main'},
        'modal_create_intro': {to: 'modal'}
    }
});

Router.route('/start/details', {
    name: 'create-details',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_create':         {to: 'modal'},
        'modal_create_details': {to: 'modal_create'}
    }
});

Router.route('/start/:_id/activities', {
    name: 'create-activities',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_create':            {to: 'modal'},
        'modal_create_activities': {to: 'modal_create'}
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    action: function() {
        if (Meteor.isClient) {
            Session.set('partials.create-partup.current-partup', this.params._id);
        }
        this.render();
    }
});

Router.route('/start/:_id/promote', {
    name: 'create-promote',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_create':         {to: 'modal'},
        'modal_create_promote': {to: 'modal_create'}
    },
    data: function() {
        return {
            partupId: this.params._id
        };
    },
    action: function() {
        if (Meteor.isClient) {
            Session.set('partials.create-partup.current-partup', this.params._id);
        }
        this.render();
    }
});

/*************************************************************/
/* Login flow */
/*************************************************************/
Router.route('/login', {
    name: 'login',
    where: 'client',
    yieldRegions: {
        'modal':       {to: 'main'},
        'modal_login': {to: 'modal'}
    }
});

/*************************************************************/
/* Password reset */
/*************************************************************/
Router.route('/forgot-password', {
    name: 'forgot-password',
    where: 'client',
    yieldRegions: {
        'modal':                {to: 'main'},
        'modal_forgotpassword': {to: 'modal'}
    }
});

Router.route('/reset-password/:token', {
    name: 'reset-password',
    where: 'client',
    yieldRegions: {
        'modal':               {to: 'main'},
        'modal_resetpassword': {to: 'modal'}
    }
});

/*************************************************************/
/* Verify Account */
/*************************************************************/
Router.route('/verify-email/:token', {
    name: 'verify-email',
    where: 'client',
    yieldRegions: {
        'app': {to: 'main'}
    },
    onBeforeAction: function() {
        Router.go('discover'); // todo: < change to profile when we have that page

        Accounts.verifyEmail(this.params.token, function(error) {
            if (error) {
                Partup.client.notify.warning(TAPi18n.__('notification-verify-mail-warning'));
            } else {
                Partup.client.notify.success(TAPi18n.__('notification-verify-mail-success'));
            }
        });
    }
});

/*************************************************************/
/* Register flow */
/*************************************************************/
Router.route('/register', {
    name: 'register',
    where: 'client',
    yieldRegions: {
        'modal':                 {to: 'main'},
        'modal_register':        {to: 'modal'},
        'modal_register_signup': {to: 'modal_register'}
    }
});

Router.route('/register/details', {
    name: 'register-details',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_register':         {to: 'modal'},
        'modal_register_details': {to: 'modal_register'}
    }
});

/*************************************************************/
/* Close window route */
/*************************************************************/
Router.route('/close', {
    name: 'close',
    where: 'client',
    onBeforeAction: function() {
        window.close();
    }
});

Router.route('/(.*)', {
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_notfound': {to: 'app'}
    }
});

/*************************************************************/
/* Route protection */
/*************************************************************/
Router.onBeforeAction(function(req, res, next) {
    if (!Meteor.userId()) {
        Intent.go({route: 'login'}, function(user) {
            if (user) next();
            else this.back();
        });
    } else {
        next();
    }
}, {
    where: 'client',
    only: [
        'create',
        'create-details',
        'create-activities',
        'create-contribute',
        'create-promote',
        'register-details',
        'network-invite'
    ]
});

// reset create-partup id to reset the create partup flow
Router.onBeforeAction(function(req, res, next) {
    Session.set('partials.create-partup.current-partup', undefined);
    next();
}, {
    where: 'client',
    except: [
        'create-details',
        'create-activities',
        'create-contribute',
        'create-promote'
    ]
});

/*************************************************************/
/* Miscellaneous */
/*************************************************************/
if (Meteor.isClient) {

    Router.onBeforeAction(function() {
        window.scrollTo(0, 0);
        Partup.client.focuslayer.disable();
        var currentPopup = Partup.client.popup.current.curValue;
        if (currentPopup) {
            Partup.client.popup.close();
        }
        this.next();
    });
    /**
     * Router helper for ernot foundror pages
     *
     * @memberof Router
     * @param type {string}           Type of 404 page (partup/network/default)
     *
     */
    Router.pageNotFound = function(type) {
        var currentRoute = this.current();

        currentRoute.state.set('type', type);
        currentRoute.render('app_notfound', {to: 'app'});
    };
    /**
     * Back method for Router
     *
     * @memberof Router
     *
     */
    Router.back = function() {
        history.back();
    };
}
