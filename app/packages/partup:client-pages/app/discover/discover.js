/**
 * Custom select with support for filtering etc
 *
 * @param {Element} el   The element to replace
 * @param {Object} options
 */
var CustomSelect = function(el, options) {
    if (!(this instanceof CustomSelect)) return new CustomSelect(el, options);

    this.el = el;
    this.options = options || {};
    this.build();
    this.update();
    this.setEvents();
    this.setValue(this.el.value);
};

/**
 * Build up required dom structure
 */
CustomSelect.prototype.build = function() {
    if (this.wrap) return;

    var wrap = document.createElement('div');
    wrap.classList.add('pu-custom-select');

    var current = document.createElement('button');
    current.type = 'button';
    current.classList.add('pu-sub-current');
    wrap.appendChild(current);

    var valueWrap = document.createElement('div');
    valueWrap.classList.add('pu-sub-value-wrap');
    wrap.appendChild(valueWrap);

    if (this.options.showFilter) {
        var filterWrap = document.createElement('div');
        filterWrap.classList.add('pu-sub-filter-wrap');
        valueWrap.appendChild(filterWrap);

        var filter = document.createElement('input');
        filter.classList.add('pu-input');
        filter.type = 'search';
        filterWrap.appendChild(filter);

        var filterList = document.createElement('ul');
        filterList.classList.add('pu-sub-filter-list');
        filterWrap.appendChild(filterList);

        this.filter = filter;
        this.filterList = filterList;
    }

    var suggestions = this.options.suggestions;
    if (suggestions && suggestions.length) {
        if (this.options.suggestionsLabel) {
            var suggestionsHeading = document.createElement('h3');
            suggestionsHeading.classList.add('pu-sub-suggestion-heading');
            suggestionsHeading.textContent = this.options.suggestionsLabel;
            valueWrap.appendChild(suggestionsHeading);
        }

        var suggestionList = document.createElement('ul');
        suggestionList.classList.add('pu-sub-suggestion-list');

        var  li;
        for (var i = 0; i < suggestions.length; i++) {
            li = document.createElement('li');
            li.dataset.value = suggestions[i].value;
            li.textContent = suggestions[i].label;
            suggestionList.appendChild(li);
        }

        valueWrap.appendChild(suggestionList);
        this.suggestionList = suggestionList;
    }

    this.wrap = wrap;
    this.valueWrap = valueWrap;
    this.current = current;

    this.el.parentNode.replaceChild(wrap, this.el);
};

/**
 * Set required events
 */
CustomSelect.prototype.setEvents = function() {
    var self = this;

    this.current.addEventListener('click', function() {
        self.toggle();
    });

    var checkValue = function(e) {
        if (e.target.dataset.value) {
            self.setValue(e.target.dataset.value);
        }
    };

    if (this.filter) {
        var done = function() {
            self.checkFilter();
        };

        var checkFilter = function() {
            if (mout.lang.isFunction(self.options.onFilter)) {
                self.options.onFilter.call(self, self.filter.value, done);
            } else {
                done();
            }
        };

        this.filter.addEventListener('input', checkFilter);
        this.filterList.addEventListener('click', checkValue);
        this.filter.addEventListener('focus', function() {
            self.filterList.classList.add('pu-state-expanded');
        });
        this.filter.addEventListener('blur', mout.function.debounce(function() {
            self.filterList.classList.remove('pu-state-expanded');
        }, 50));
        checkFilter();
    }

    if (this.suggestionList) {
        this.suggestionList.addEventListener('click', checkValue);
    }
};

CustomSelect.prototype.checkFilter = function() {
    var li;
    var opt;

    while (this.filterList.firstChild) {
        this.filterList.removeChild(this.filterList.firstChild);
    }

    var matched = 0;
    for (var i = 0; i < this.availableOptions.length; i++) {
        opt = this.availableOptions[i];
        if (opt.value && new RegExp(this.filter.value, 'i').test(opt.label)) {
            li = document.createElement('li');
            li.dataset.value = opt.value;
            li.textContent = opt.label;
            this.filterList.appendChild(li);
            matched ++;
        }
    }
};

/**
 * Update the select's options
 */
CustomSelect.prototype.update = function(options) {
    if (!options) {
        var opts = this.el.querySelectorAll('option');
        options = [];

        for (var i = 0; i < opts.length; i++) {
            options.push({
                value: opts[i].value,
                label: opts[i].textContent
            });
        }
    }

    var labels = {};
    for (var i = 0; i < options.length; i++) {
        labels[options[i].value] = options[i].label;
    }

    this.availableOptions = options;
    this.labels = labels;
};

/**
 * Set the select's current value
 *
 * @param {String} value
 */
CustomSelect.prototype.setValue = function(value) {
    if (!this.labels[value]) return;

    this.el.value = value;
    this.current.textContent = this.labels[value];
};

/**
 * Show values
 */
CustomSelect.prototype.open = function() {
    this.valueWrap.classList.add('pu-state-expanded');
};

/**
 * Hide values
 */
CustomSelect.prototype.hide = function() {
    this.valueWrap.classList.remove('pu-state-expanded');
};

/**
 * Toggle values
 */
CustomSelect.prototype.toggle = function() {
    this.valueWrap.classList.toggle('pu-state-expanded');
};

/*************************************************************/
/* Page initial */
/*************************************************************/
var LIMIT_DEFAULT = 50;
var LIMIT_INCREMENT = 10;

Template.app_discover.onCreated(function() {
    var template = this;
    template.discoverSubscription = template.subscribe('partups.discover', {});
    template.filterOptions = {};

    // updates subscription with new options
    // just pass any valid option in an object {query:'jaja'} or {query:'jaja', sort:'new'}
    // it won't reset options that arent passed
    // limit is reset to the LIMIT_DEFAULT constant when this is called
    template.updateSubscriptionFilter = function(newOptions) {
        template.discoverSubscription.stop();
        var options = template.filterOptions;
        options.limit = LIMIT_DEFAULT;

        for (key in newOptions) {
            options[key] = newOptions[key];
        }
        template.filterOptions = options;

        // this fixed it jesse, sorry
        Meteor.setTimeout(function() {
            template.discoverSubscription = Meteor.subscribe('partups.discover', options);
        }, 500);
    };
    // update the subscription limit, this is seperate for infinite scroll behaviour
    template.updateSubscriptionLimit = function(limit) {
        if (template.discoverSubscription) {
            template.oldDiscoverSubscription = template.discoverSubscription;
        }
        var options = template.filterOptions;
        options.limit = limit;

        template.filterOptions = options;
        template.discoverSubscription = Meteor.subscribe('partups.discover', options);
        template.oldDiscoverSubscription.stop();
    };
    // this resets all subscription options
    template.resetSubscriptions = function() {
        template.discoverSubscription.stop();
        Meteor.setTimeout(function() {
            template.discoverSubscription = Meteor.subscribe('partups.discover', {limit:LIMIT_DEFAULT});
        }, 500);
    };

    template.limit = new ReactiveVar(LIMIT_DEFAULT, function(oldValue, newValue) {
        template.updateSubscriptionLimit(newValue);
    });

    template.filter = new ReactiveVar({}, function(oldValue, newValue) {
        template.updateSubscriptionFilter(newValue);
    });

    Session.set('refreshDate', Math.round(new Date().getTime()));
});
// page render
Template.app_discover.onRendered(function() {
    var template = this;
    Partup.client.scroll.onBottomOffset({
        autorunTemplate: template,
        debounce: 500,
        offset: $(window).height(),
    }, function() {
        Partup.client.reactiveVarHelpers.incrementNumber(template.limit, LIMIT_INCREMENT);
    });

    var keywords = document.querySelector('[data-discover-search] [name=keywords]');
    var network = document.querySelector('[data-discover-search] [name=network]');
    var city = document.querySelector('[data-discover-search] [name=city]');
    var sort = document.querySelector('[data-discover-search] [name=sort]');

    var networkToOption = function(n) {
        return {value: n._id, label: n.name};
    };

    var networks = mout.array.map(Networks.find().fetch(), networkToOption);

    new CustomSelect(network, {
        showFilter: true,
        suggestionsLabel: 'Suggesties',
        suggestions: networks,
        onFilter: function(value, done) {
            var regexp = new RegExp(value, 'i');
            var networks = mout.array.map(Networks.find({name: regexp}).fetch(), networkToOption);
            networks.unshift({value: '', label: 'Netwerk'});
            this.update(networks);
            done();
        }
    });

    new CustomSelect(city, {
        showFilter: true
    });

    new CustomSelect(sort);
});
// page destroy
Template.app_discover.onDestroyed(function() {
    var template = this;
    template.discoverSubscription.stop();
    if (template.oldDiscoverSubscription) template.oldDiscoverSubscription.stop();
});

/*************************************************************/
/* Page helpers */
/*************************************************************/
Template.app_discover.helpers({
    partups: function() {
        // var subscription = Template.instance().discoverSubscription.ready();
        // if(!subscription) return false;
        var partups = Partups.find().fetch();
        console.log(partups);
        return partups;
    },
    refreshDate: function() {
        // var filter = Session.get('filter');
        // return Math.round(new Date().getTime());
        return Session.get('refreshDate');
    },
    showProfileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return false;
        return user.completeness < 100;
    },
    profileCompletion: function() {
        var user = Meteor.user();
        if (!user) return false;
        if (!user.completeness) return '...';
        return user.completeness;
    },

    totalNumberOfPartups: function totalNumberOfPartups() {
        var count =  Counts.get('partups');
        if (count) {
            return count;
        } else {
            return '...';
        }
    }
});

/*************************************************************/
/* Page events */
/*************************************************************/
Template.app_discover.events({
    'click [data-search]': function(event, template) {
        event.preventDefault();

        if (template.discoverSubscription) {
            template.discoverSubscription.stop();
        }

        var text = template.find('[data-search-query]').value;

        template.discoverSubscription = Meteor.subscribe('partups.discover', {query: text});
    },
    'submit [data-discover-search]': function(event, template) {
        event.preventDefault();
        console.log(event);
    }
});
