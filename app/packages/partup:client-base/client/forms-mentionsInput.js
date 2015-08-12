/**
 * Mentions suggestions while typing
 *
 * @param {Element} input
 */
var MentionsInput = function(input) {
    if (!(this instanceof MentionsInput)) {
        return new MentionsInput(input);
    }

    this.input = input;
    this.mentions = {};
    this._build();
    this._setEvents();
};

/**
 * Build required elements
 */
MentionsInput.prototype._build = function() {
    if (this.wrap) return;

    var wrap = document.createElement('div');
    wrap.classList.add('pu-input-mentions-wrap');

    this.input.parentNode.insertBefore(wrap, this.input);
    wrap.appendChild(this.input);

    var suggestionsEl = document.createElement('div');
    suggestionsEl.classList.add('pu-input-mentions-suggestions');
    wrap.appendChild(suggestionsEl);

    this.suggestionsEl = suggestionsEl;
    this.wrap = wrap;
};

/**
 * Set required events on the input
 */
MentionsInput.prototype._setEvents = function() {
    var self = this;

    self.input.addEventListener('keydown', function(e) {
        if (!self.isSuggestionsShown || [38, 40, 13].indexOf(e.keyCode) === -1) {
            return;
        }

        e.preventDefault();

        switch (e.keyCode) {
            case 38: // arrow up
                self.highlight(self.selectedIndex - 1);
            break;
            case 40: // arrow down
                self.highlight(self.selectedIndex + 1);
            break;
            case 13: // enter
                self.select(self.selectedIndex);
            break;
        }
    });

    self.input.addEventListener('input', function(e) {
        self.checkCaretPosition();
    });

    self.suggestionsEl.addEventListener('click', function(e) {
        self.select(self.btns.indexOf(e.target));
    });
};

/**
 * Select an item in the list by index
 */
MentionsInput.prototype.select = function(index) {
    var suggestion = this.suggestions[index];
    if (!suggestion) return;

    var substr = this.input.value.substr(0, this.input.selectionStart);
    var match = substr.match(/@([^\s@]+)$/);

    if (!match) return;

    this.mentions[suggestion.profile.name] = suggestion._id;

    var value = this.input.value;
    var start = substr.length - match[1].length;
    var pre = value.substring(0, start);
    var post = value.substring(this.input.selectionStart, value.length);
    this.input.value = pre + suggestion.profile.name + post;

    this.input.selectionStart = this.input.selectionEnd = (pre + suggestion.profile.name).length;
    this.input.focus();
    this.hideSuggestions();
};

/**
 * Highlight an item in the list by index
 */
MentionsInput.prototype.highlight = function(index) {
    if (!this.btns[index]) return;

    if (this.selectedIndex > -1) {
        this.btns[this.selectedIndex].classList.remove('pu-state-highlight');
    }

    this.btns[index].classList.add('pu-state-highlight');
    this.selectedIndex = index;
};

/**
 * Show the suggestion list
 */
MentionsInput.prototype.showSuggestions = function() {
    this.suggestionsEl.classList.add('pu-state-visible');
    this.isSuggestionsShown = true;
};

/**
 * Hide the suggestion list
 */
MentionsInput.prototype.hideSuggestions = function() {
    this.suggestionsEl.classList.remove('pu-state-visible');
    this.isSuggestionsShown = false;
    this.lastQuery = null;
    this.selectedIndex = -1;
};

/**
 *
 */
MentionsInput.prototype.checkCaretPosition = function() {
    var substr = this.input.value.substr(0, this.input.selectionStart);
    var match = substr.match(/(?:^|\s+)@([^\s@]{3,})$/);

    if (!match) {
        this.hideSuggestions();
        return;
    }

    this.showSuggestions();

    var query = match[1];
    if (query === this.lastQuery) return;

    var self = this;
    Meteor.call('users.autocomplete', query, function(error, users) {
        if (error) {
            console.error(error);
            return;
        }

        self.suggestions = users;

        self.lastQuery = query;
        self.suggestionsEl.innerHTML = '';
        self.btns = [];

        var suggestion;
        var btn;
        for (var i = 0; i < self.suggestions.length; i++) {
            suggestion = self.suggestions[i];
            btn = document.createElement('button');
            btn.type = 'button';
            btn.dataset.id = suggestion._id;
            btn.textContent = suggestion.profile.name;
            self.btns.push(btn);
            self.suggestionsEl.appendChild(btn);
        }

        self.highlight(0);
    });
};

/**
 *
 */
MentionsInput.prototype.getValue = function() {
    var mentions = lodash.map(this.mentions, function(value, key) {
        return {_id: value, name: key};
    });
    return Partup.helpers.mentions.encode(this.input.value, mentions);
};

Partup.client.forms.MentionsInput = MentionsInput;
