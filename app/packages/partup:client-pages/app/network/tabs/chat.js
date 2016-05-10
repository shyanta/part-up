Template.app_network_chat.helpers({
    data: function() {
        var template = Template.instance();
        return {
            network: function() {
                return Networks.findOne({slug: template.data.networkSlug});
            }
        };
    }
});
/*
'use strict';

import { throttle } from 'lodash';

export default class ReversedScroller {
    constructor(props) {

        // Setting the 'stick' flag to true/false will respectively
        // enable/disable automatic-scroll-to-bottom when a
        // new comment comes in.
        // This flag will be set to false when the user
        // starts to scroll and will be set back to true
        // when the user scrolls close to the bottom.
        this.stick = true;

        // The actual scrolling container
        this.scroller;

        // Defer and throttle _updateStickFlag
        this._updateStickFlag = throttle(this._updateStickFlag, 100);
    }

    contentPossiblyUpdated(scroller) {
        this._setScroller(scroller);

        if (this.stick) {
            this.scroller.scrollTop = this.scroller.scrollHeight;
        }
    }

    destroy() {
        if (this.scroller) {
            this.scroller.removeEventListener('scroll', this._updateStickFlag.bind(this));
            window.removeEventListener('resize', this.contentPossiblyUpdated.bind(this, this.scroller));
        }
    }

    _setScroller(scroller) {
        if (!this.scroller) {
            this.scroller = scroller;
            this.scroller.addEventListener('scroll', this._updateStickFlag.bind(this));
            window.addEventListener('resize', this.contentPossiblyUpdated.bind(this, this.scroller));
        }
    }

    _updateStickFlag() {
        const clientRect = this.scroller.getBoundingClientRect();
        const distanceToBottom = this.scroller.scrollHeight - clientRect.height - this.scroller.scrollTop;
        this.stick = distanceToBottom === 0;
    }
}
*/
