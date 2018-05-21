'use strict';
import moment from 'moment';
let currentTime = moment();


export default function handleTime(createdAtPre) {
    let createdAt = moment(createdAtPre);

    let time;
    let seconds = (currentTime.diff(createdAt, 'seconds'));
    let minutes = (currentTime.diff(createdAt, 'minutes'));
    let hours = (currentTime.diff(createdAt, 'hours'));
    let days = (currentTime.diff(createdAt, 'days'));
    let years = (currentTime.diff(createdAt, 'years'));
    if (seconds <= 60) {
        if (seconds === 1 || seconds < 0) {
            time = `a second ago`;
        } else {
            time = `${seconds} seconds ago`;
        }
        return time;
    } else if (minutes <= 60) {
        if (minutes === 1) {
            time = `${minutes} minute ago`;
        } else {
            time = `${minutes} minutes ago`;
        }
        return time;
    } else if (hours <= 24) {
        if (hours === 1) {
            time = `${hours} hour ago`;
        } else {
            time = `${hours} hours ago`;
        }
        return time;
    } else if (days <= 365) {
        if (days === 1) {
            time = `${days} day ago`;
        } else {
            time = `${days} days ago`;
        }
        return time;
    } else if (years <= 100) {
        if (years === 1) {
            time = `${years} year ago`;
        } else {
            time = `${years} years ago`;
        }
        return time;
    }
}
