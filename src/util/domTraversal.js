'use strict';

export function findAncestor (el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

export function findnextSibling (el, cls) {
    while ((el = el.nextSibling) && !el.classList.contains(cls));
    return el;
}

export function findpreviousSibling (el, cls) {
    while ((el = el.previousSibling) && !el.classList.contains(cls));
    return el;
}
