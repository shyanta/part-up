/*************************************************************/
/* Application routing */
/*************************************************************/
Router.route('/', {
    name: 'home',
    controller: 'HomeController',
    action: 'action',
    where: 'client'
});

Router.route('/startpartup', {
    name: 'startpartup',
    controller: 'StartPartupController',
    action: 'action',
    where: 'client'
});

Router.route('/startpartup/details', {
    name: 'startpartup-details',
    controller: 'StartPartupDetailsController',
    action: 'action',
    where: 'client'
});

Router.route('/partups/:id', {
    name: 'partup-detail',
    controller: 'PartupDetailController',
    action: 'action',
    where: 'client'
});

Router.route('/register', {
    name: 'register',
    controller: 'RegisterController',
    action: 'action',
    where: 'client'
});