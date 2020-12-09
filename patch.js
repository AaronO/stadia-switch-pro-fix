// ==UserScript==
// @name         Stadia Switch Pro fix
// @namespace    https://github.com/AaronO
// @version      0.1
// @description  Fixes duplicate Switch Pro pads over BT on macOS
// @author       Aaron O'Mullan
// @match        https://stadia.google.com/*
// @grant        none
// ==/UserScript==

(function() {
// Detect undesirable duplicate Switch Pro pads
function isBadPad(gamepad) {
    // TODO: possibly extend matching, seems sufficient for now
    return gamepad && gamepad.id === 'Pro Controller (STANDARD GAMEPAD)';
}
const normalize = pad => !isBadPad(pad) ? pad : null;

// Original getGamepads
const getGamepads = navigator.getGamepads.bind(navigator);
// Patched version returning a proxied GamepadList filtering duplicates
navigator.getGamepads = () => {
    const pads = getGamepads();
    return new Proxy(pads, {
        has: (o, key) => Reflect.has(o, key) && !isBadPad(o[key]),
        get: (pads, key) => {
            if(key === Symbol.iterator) {
                // Return filtered iterator
                return function* () {
                    for(const p of pads) yield normalize(p);
                }
            }
            return normalize(pads[key]);
        }
    });
}
})();
