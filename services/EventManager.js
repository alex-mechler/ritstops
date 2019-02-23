const moment = require('moment');
const events = require('../data/events');
const _ = require('lodash');

/**
 * Manages time-based in-game events
 *
 * @author Alexander Shuey <alex@alexshuey.com>
 */
module.exports = class EventManager {
    /**
     * Instantiates a new copy of the event manager, and parses the event file for current events
     */
    constructor() {
        this._allEvents = _.map(events, event => {
            event['startTime'] = moment.unix(event['start']);
            event['endTime'] = moment.unix(event['end']);

            return event;
        });

        this.refresh();
    }

    refresh() {
        const now = moment();

        // Find which events are current
        this._currentEvents = _.filter(this._allEvents, event => {
            return now.isBetween(event.startTime, event.endTime, '[)');
        });

        // Find the first instance of show_default being false
        const showDefaultFalseIndex = _.findIndex(this._currentEvents, event => {
            return event['show_default'] === false
        });

        // If no instances are found (showDefaultFalseIndex = -1) then includeDefault is set to true. Otherwise, false.
        this._includeDefault = (showDefaultFalseIndex === -1);
    }

    /**
     * Gets all current events
     *
     * @returns {string} Array of current event keys
     */
    currentEventKeys() {
        return _.map(this._currentEvents, event => {
            return event['key'];
        });
    }

    /**
     * Returns whether or not to include default quests, unassociated with an event.
     *
     * This value is calculated upon class instantiation. If any single event calls for default quests to be hidden,
     * they will be.
     *
     * @returns {boolean}
     */
    get includeDefault() {
        return this._includeDefault;
    }
}