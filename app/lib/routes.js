/*************************************************************/
/* Application routing */
/*************************************************************/
Router.route('/', {
    name: 'home',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: { 
        'PagesHome': { to: 'page' },
    }
});

Router.route('/startpartup', {
    name: 'startpartup',
    where: 'client',
    layoutTemplate: 'LayoutsFullpage',
    yieldRegions: {
        'PagesStartPartup': { to: 'page' },
        'PagesStartPartupDetails': { to: 'start-partup-page' }
    }
});

Router.route('/partups/:id', {
    name: 'partup-detail',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailUpdates': { to: 'partup-page' }
    }
});

Router.route('/partups/:id/activities', {
    name: 'partup-detail-activities',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesPartupDetail': { to: 'page' },
        'PagesPartupDetailActivities': { to: 'partup-page' }
    }
});

Router.route('/register', {
    name: 'register',
    where: 'client',
    layoutTemplate: 'LayoutsApp',
    yieldRegions: {
        'PagesRegister': { to: 'page' }
    }
});