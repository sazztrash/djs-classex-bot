const Messages = require('../util/Messages')
module.exports = class TimerHandler {
    constructor() {
        this.messages = Messages
        this.endAt = null
        this.startAt = null
        this.timestamp = null
        this.totalDuration = null
        this.remainingTime = null
    }
    async get(duration) {
        let roundTowardsZero = duration > 0 ? Math.floor : Math.ceil;
        // Gets days, hours, minutes and seconds
        let days = roundTowardsZero(duration / 86400000),
            hours = roundTowardsZero(duration / 3600000) % 24,
            minutes = roundTowardsZero(duration / 60000) % 60,
            seconds = roundTowardsZero(duration / 1000) % 60;
        // Increment seconds if equal to zero
        if (seconds === 0) seconds++;
        // Whether values are inferior to zero
        let isDay = days > 0,
            isHour = hours > 0,
            isMinute = minutes > 0;
        let dayUnit =
                days < 2 && (this.messages.units.days.endsWith('s'))
                    ? this.messages.units.days.substr(0, this.messages.units.days.length - 1)
                    : this.messages.units.days,
            hourUnit =
                hours < 2 && (this.messages.units.hours.endsWith('s'))
                    ? this.messages.units.hours.substr(0, this.messages.units.hours.length - 1)
                    : this.messages.units.hours,
            minuteUnit =
                minutes < 2 && (this.messages.units.minutes.endsWith('s'))
                    ? this.messages.units.minutes.substr(0, this.messages.units.minutes.length - 1)
                    : this.messages.units.minutes,
            secondUnit =
                seconds < 2 && (this.messages.units.seconds.endsWith('s'))
                    ? this.messages.units.seconds.substr(0, this.messages.units.seconds.length - 1)
                    : this.messages.units.seconds;
        // Generates a first pattern
        let pattern =
            (!isDay ? '' : `{days} ${dayUnit}, `) +
            (!isHour ? '' : `{hours} ${hourUnit}, `) +
            (!isMinute ? '' : `{minutes} ${minuteUnit}, `) +
            `{seconds} ${secondUnit}`;
        // Format the pattern with the right values
        let content = this.messages.time
            .replace('{duration}', pattern)
            .replace('{days}', days)
            .replace('{hours}', hours)
            .replace('{minutes}', minutes)
            .replace('{seconds}', seconds);
        return content;
    }

    async count(duration) {
        this.endAt = Date.now() + duration
        this.startAt = Date.now()
        this.timestamp = new Date(this.endAt).toISOString()
        this.totalDuration = this.endAt - this.startAt
        this.remainingTime = await this.endAt - Date.now();
        return this.timestamp
    }
}