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

        this.filter.addEventListener('keydown', function(e) {
            if ([13, 38, 40].indexOf(e.keyCode) === -1) return;

            e.preventDefault();

            var selected = self.filterList.querySelector('.pu-state-selected');

            // enter
            if (e.keyCode === 13) {
                if (selected) {
                    self.setValue(selected.dataset.value);
                }

                return;
            }

            var index = -1;
            if (selected) {
                index = mout.array.indexOf(self.filterList.children, selected);
            }

            // up
            if (e.keyCode === 38) {
                var nextIndex = index - 1;
                if (nextIndex === -1) {
                    nextIndex = self.filterList.children.length - 1;
                }
            }

            // down
            if (e.keyCode === 40) {
                var nextIndex = index + 1;
                if (nextIndex === self.filterList.children.length) {
                    nextIndex = 0;
                }
            }

            if (selected) {
                selected.classList.remove('pu-state-selected');
            }

            self.filterList.children[nextIndex].classList.add('pu-state-selected');
        });
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

/**
 * Discover constants
 */
var STARTING_LIMIT = 8;
var INCREMENT = 4;

/**
 * Discover created
 */
Template.app_discover.onCreated(function() {
    var tpl = this;

    // Current partups (for reference when determining the added partups)
    tpl.partups = [];

    // Subscription handle
    tpl.handle;

    // Subscribe (and re-subscribe when the options change)
    tpl.options = new ReactiveVar({}, function(a, b) {
        var options = b;
        options.limit = tpl.resetLimit();

        tpl.handle = tpl.subscribe('partups.discover', options);

        Meteor.autorun(function whenSubscriptionIsReady(computation) {
            if (tpl.handle.ready()) {
                computation.stop();

                Tracker.nonreactive(function replacePartups() {
                    tpl.partups = Partups.find().fetch();
                    tpl.handle.stop();

                    tpl.cleanPartups();
                    tpl.addPartups(tpl.partups);
                });
            }
        });
    });

    // Re-subscribe when the limit changes
    tpl.limit = new ReactiveVar(STARTING_LIMIT, function(a, b) {
        var resetting = b === STARTING_LIMIT;
        if (resetting) return;

        var options = tpl.options.get();
        options.limit = tpl.limit.get();

        tpl.handle = tpl.subscribe('partups.discover', options);

        Meteor.autorun(function whenSubscriptionIsReady(computation) {
            if (tpl.handle.ready()) {
                computation.stop();

                Tracker.nonreactive(function addPartups() {
                    var newPartups = mout.array.filter(Partups.find().fetch(), function(partup) {
                        return !mout.array.find(tpl.partups, function(_partup) {
                            return partup._id === _partup._id;
                        });
                    });
                    tpl.handle.stop();

                    tpl.addPartups(newPartups);

                    tpl.partups = tpl.partups.concat(newPartups);
                });
            }
        });
    });

    // Limit functions
    tpl.increaseLimit = function() {
        var limit = tpl.limit.get() + INCREMENT;
        tpl.limit.set(limit);
        return limit;
    };
    tpl.resetLimit = function() {
        var limit = STARTING_LIMIT;
        tpl.limit.set(limit);
        return limit;
    };
});

/**
 * Discover rendered
 */
Template.app_discover.onRendered(function() {
    var tpl = this;

    Partup.client.scroll.onBottomOffset({
        autorunTemplate: tpl,
        debounce: 500,
        offset: $(window).height(),
    }, tpl.increaseLimit);

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

/**
 * Discover helpers
 */
Template.app_discover.helpers({
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

    totalNumberOfPartups: function() {
        var count =  Counts.get('partups');
        if (count) {
            return count;
        } else {
            return '...';
        }
    },
    addPartupsHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.addPartups = callback;
        };
    },
    cleanPartupsHook: function() {
        var tpl = Template.instance();

        return function registerCallback(callback) {
            tpl.cleanPartups = callback;
        };
    }
});

/**
 * Discover events
 */
Template.app_discover.events({
    'click [data-search]': function(event, template) {
        event.preventDefault();
        var form = event.currentTarget.form;
        var search_query = lodash.find(form, {name: 'keywords'}).value;

        template.options.set({
            limit: STARTING_LIMIT,
            query: search_query
        });
    },
    'submit [data-discover-search]': function(event, template) {
        event.preventDefault();
    }
});
