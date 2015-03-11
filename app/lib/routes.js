Router.configure({
    layoutTemplate: 'MasterLayout',
    loadingTemplate: 'Loading',
    notFoundTemplate: 'NotFound'
});

Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

Router.route('/register', {
    name: 'register',
    controller: 'RegisterController',
    action: 'action',
    where: 'client'
});

Router.route('/start', {
    onBeforeAction: function() {
        Router.go('/start/details')
    }
});

Router.route('/start/details', {
    name: 'startDetails',
    controller: 'StartController',
    action: 'details',
    where: 'client'
});

Router.route('/start/activities', {
    name: 'startActivities',
    controller: 'StartController',
    action: 'activities',
    where: 'client'
});