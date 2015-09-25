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
Router.route('', {
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
        'modal_profile_settings_details': {to: 'modal_profile_settings'}
    },
    data: function() {
        return {
            profileId: this.params._id
        };
    }
});

Router.route('/profile/:_id/settings/general', {
    name: 'profile-settings-account',
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
    },
    data: function() {
        return {
            token: this.params.token
        };
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
    data: function() {
        return {
            token: this.params.token
        };
    },
    onBeforeAction: function() {
        Router.go('profile');

        Accounts.verifyEmail(this.data().token, function(error) {
            if (error) {
                Partup.client.notify.warning(TAPi18n.__('notification-verify-mail-warning'));
            } else {
                Partup.client.notify.success(TAPi18n.__('notification-verify-mail-success'));
            }
        });
    }
});

/*************************************************************/
/* Unsubscribe from mailings */
/*************************************************************/
Router.route('/unsubscribe-email-all/:token', {
    name: 'unsubscribe-email-all',
    where: 'client',
    yieldRegions: {
        'modal': {to: 'main'},
        'modal_profile_settings_email_unsubscribe_all': {to: 'modal'}
    },
    data: function() {
        return {
            token: this.params.token
        };
    }
});

Router.route('/unsubscribe-email-one/:subscriptionKey/:token', {
    name: 'unsubscribe-email-one',
    where: 'client',
    yieldRegions: {
        'modal': {to: 'main'},
        'modal_profile_settings_email_unsubscribe_one': {to: 'modal'}
    },
    data: function() {
        return {
            subscriptionKey: this.params.subscriptionKey,
            token: this.params.token
        };
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
/* Partup detail */
/*************************************************************/
Router.route('/partups/:slug', {
    name: 'partup',
    where: 'client',
    yieldRegions: {
        'app':                {to: 'main'},
        'app_partup':         {to: 'app'},
        'app_partup_updates': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: Partup.client.strings.partupSlugToId(this.params.slug),
            accessToken: this.params.query.token
        };
    },
    onRun: function() {
        Meteor.call('partups.analytics.click', this.data().partupId);
        this.next();
    },
    onBeforeAction: function() {
        var partupId = this.data().partupId;
        var accessToken = this.data().accessToken;

        if (partupId && accessToken) {
            Session.set('partup_access_token', accessToken);
            Session.set('partup_access_token_for_partup', partupId);
        }

        this.next();
    }
});

Router.route('/partups/:slug/updates/:update_id', {
    name: 'partup-update',
    where: 'client',
    yieldRegions: {
        'app':               {to: 'main'},
        'app_partup':        {to: 'app'},
        'app_partup_update': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: Partup.client.strings.partupSlugToId(this.params.slug),
            updateId: this.params.update_id
        };
    }
});

Router.route('/partups/:slug/activities', {
    name: 'partup-activities',
    where: 'client',
    yieldRegions: {
        'app':                   {to: 'main'},
        'app_partup':            {to: 'app'},
        'app_partup_activities': {to: 'app_partup'}
    },
    data: function() {
        return {
            partupId: Partup.client.strings.partupSlugToId(this.params.slug)
        };
    }
});

Router.route('/partups/:slug/invite-for-activity/:activity_id', {
    name: 'partup-activity-invite',
    where: 'client',
    yieldRegions: {
        'modal':                    {to: 'main'},
        'modal_invite_to_activity': {to: 'modal'},
    },
    data: function() {
        return {
            partupId: Partup.client.strings.partupSlugToId(this.params.slug),
            activityId: this.params.activity_id
        };
    }
});

Router.route('/partups/:slug/settings', {
    name: 'partup-settings',
    where: 'client',
    yieldRegions: {
        'modal':                  {to: 'main'},
        'modal_partup_settings': {to: 'modal'},
    },
    data: function() {
        return {
            partupId: Partup.client.strings.partupSlugToId(this.params.slug)
        };
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

/*************************************************************/
/* Admin (super mega ultra admin) */
/*************************************************************/
Router.route('/admin', {
    name: 'admin-overview',
    where: 'client',
    yieldRegions: {
        'modal':                    {to: 'main'},
        'modal_admin':              {to: 'modal'},
        'modal_admin_overview':     {to: 'modal_admin'}
    }
});

Router.route('/admin/featured-partups', {
    name: 'admin-featured-partups',
    where: 'client',
    yieldRegions: {
        'modal':                            {to: 'main'},
        'modal_admin':                      {to: 'modal'},
        'modal_admin_featured_partups':     {to: 'modal_admin'}
    }
});

Router.route('/admin/tribes', {
    name: 'admin-createtribe',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_admin':             {to: 'modal'},
        'modal_create_tribe':      {to: 'modal_admin'}
    }
});

Router.route('/admin/featured-tribes', {
    name: 'admin-featured-networks',
    where: 'client',
    yieldRegions: {
        'modal':                            {to: 'main'},
        'modal_admin':                      {to: 'modal'},
        'modal_admin_featured_networks':    {to: 'modal_admin'}
    }
});
/*************************************************************/
/* Content pages */
/*************************************************************/
Router.route('/about', {
    name: 'about',
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_about': {to: 'app'}
    }
});

Router.route('/pricing', {
    name: 'pricing',
    where: 'client',
    yieldRegions: {
        'app':      {to: 'main'},
        'app_pricing': {to: 'app'}
    }
});

// Router.route('/faq', {
//     name: 'faq',
//     where: 'client',
//     yieldRegions: {
//         'app':      {to: 'main'},
//         'app_home': {to: 'app'}
//     }
// });

// Router.route('/contact', {
//     name: 'contact',
//     where: 'client',
//     yieldRegions: {
//         'app':      {to: 'main'},
//         'app_home': {to: 'app'}
//     }
// });

/*************************************************************/
/* Networks */
/*************************************************************/
Router.route('/:slug', {
    name: 'network-detail',
    where: 'client',
    yieldRegions: {
        'app':                      {to: 'main'},
        'app_network':              {to: 'app'},
        'app_network_partups':      {to: 'app_network'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug,
            accessToken: this.params.query.token
        };
    },
    onBeforeAction: function() {
        var networkSlug = this.data().networkSlug;
        var accessToken = this.data().accessToken;
        if (networkSlug && accessToken) {
            Session.set('network_access_token', accessToken);
            Session.set('network_access_token_for_network', networkSlug);
        }
        if (Meteor.userId() && networkSlug && accessToken) {
            Meteor.call('networks.convert_access_token_to_invite', networkSlug, accessToken);
        }

        this.next();
    }
});

Router.route('/:slug/uppers', {
    name: 'network-uppers',
    where: 'client',
    yieldRegions: {
        'app':                  {to: 'main'},
        'app_network':          {to: 'app'},
        'app_network_uppers':   {to: 'app_network'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

Router.route('/:slug/invite', {
    name: 'network-invite',
    where: 'client',
    yieldRegions: {
        'modal':                   {to: 'main'},
        'modal_network_invite':    {to: 'modal'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

/*************************************************************/
/* Network (admin) */
/*************************************************************/
Router.route('/:slug/settings', {
    name: 'network-settings',
    where: 'client',
    yieldRegions: {
        'modal':                          {to: 'main'},
        'modal_network_settings':         {to: 'modal'},
        'modal_network_settings_details': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

Router.route('/:slug/settings/uppers', {
    name: 'network-settings-uppers',
    where: 'client',
    yieldRegions: {
        'modal':                         {to: 'main'},
        'modal_network_settings':        {to: 'modal'},
        'modal_network_settings_uppers': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

Router.route('/:slug/settings/bulk-invite', {
    name: 'network-settings-bulkinvite',
    where: 'client',
    yieldRegions: {
        'modal':                         {to: 'main'},
        'modal_network_settings':        {to: 'modal'},
        'modal_network_settings_bulkinvite': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

Router.route('/:slug/settings/requests', {
    name: 'network-settings-requests',
    where: 'client',
    yieldRegions: {
        'modal':                           {to: 'main'},
        'modal_network_settings':          {to: 'modal'},
        'modal_network_settings_requests': {to: 'modal_network_settings'}
    },
    data: function() {
        return {
            networkSlug: this.params.slug
        };
    }
});

/*************************************************************/
/* All other routes */
/*************************************************************/
Router.route('/(.*)', {
    where: 'client',
    yieldRegions: {
        'app':          {to: 'main'},
        'app_notfound': {to: 'app'}
    }
});

/*************************************************************/
/* Route protection */
/*************************************************************/

// Shield pages for non-users
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
        'create-promote',
        'register-details',
        'network-invite',
        'profile-settings',
        'profile-settings-account',
        'profile-settings-email',
        'partup-settings',
        'admin-overview',
        'admin-featured-partups',
        'admin-createtribe',
        'network-settings',
        'network-settings-uppers',
        'network-settings-requests',
        'network-settings-bulkinvite'
    ]
});

// Shield admin pages for non admins
Router.onBeforeAction(function(req, res, next) {
    var user = Meteor.user();
    if (User(user).isAdmin()) {
        next();
    } else {
        Router.pageNotFound();
    }
}, {
    where: 'client',
    only: [
        'admin-overview',
        'admin-featured-partups',
        'admin-createtribe',
    ]
});

// Reset create-partup id to reset the create partup flow
Router.onBeforeAction(function(req, res, next) {
    if (Meteor.isClient) {
        Session.set('partials.create-partup.current-partup', undefined);
    }
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
        // Scroll to top
        window.scrollTo(0, 0);

        // Disable focuslayer (a white layer currently used with edit-activity in the start-partup-flow)
        Partup.client.focuslayer.disable();

        // Close any popups
        try {
            Partup.client.popup.close();
        } catch (err) {}

        // Proceed route change
        this.next();
    });

    /**
     * Router helper for ernot foundror pages
     *
     * @memberOf Router
     * @param {String} type          Type of 404 page (partup/network/default)
     *
     */
    Router.pageNotFound = function(type, data) {
        var currentRoute = this.current();
        if (type) currentRoute.state.set('type', type);
        if (data) currentRoute.state.set('data', data);
        currentRoute.render('app', {to: 'main'}); // this is so it also works for modals
        currentRoute.render('app_notfound', {to: 'app'});
    };
} else {
    Router.route('/dreams/:path(.*)', {
        where: 'server',
        action: function() {
            var url = 'http://blog.partup.com/dreams/' + this.params.path;
            this.response.writeHead(301, {Location: url});
            return this.response.end();
        }
    });

    Router.route('/blogs/:path(.*)', {
        where: 'server',
        action: function() {
            var url = 'http://blog.partup.com/blogs/' + this.params.path;
            this.response.writeHead(301, {Location: url});
            return this.response.end();
        }
    });

    if (mout.object.get(Meteor, 'settings.public.aws.bucket') == 'development') {
        var fs = Npm.require('fs');
        var basedir = process.cwd().replace(/\/app\/(.*)$/, '/app') + '/uploads';

        Router.route('/uploads/:path(.*)', {
            where: 'server',
            action: function() {
                var path = '/' + this.params.path;
                var file = fs.readFileSync(basedir + path);
                var ext = path.match(/\.([^.]+)/)[1];
                if (ext === 'jpg') ext = 'jpeg';

                var headers = {
                    'Content-type': 'image/' + ext,
                    'Content-Disposition': 'attachment; filename=' + path
                };

                this.response.writeHead(200, headers);
                return this.response.end(file);
            }
        });
    }
}
