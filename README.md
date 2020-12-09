A fix for duplicate Switch Pro pads over BT on macOS

## Problem

Switch Pro controllers over BT on Chrome & macOS have issues in Stadia. It detects 2 controllers instead of 1 and in-game controls will "flicker" (on Hitman, ...) and some buttons simply do not work which can be game breaking.

## Fix

The fix basically patches the `navigator.getGamepads()` browser API used by Stadia and filters out the undesirable Gamepad entries.

Stadia will now correctly detect a single controller and button hints no longer flicker between layouts and all controls work as expected :)

## Install

1. Install the [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) chrome extension
2. Open Tampermonkey's Dashboard
3. Go to Utilities > Install from URL
4. Paste https://github.com/AaronO/stadia-switch-pro-fix/raw/main/patch.js
5. Hit Install
6. Refresh your Stadia tab and voilà !
