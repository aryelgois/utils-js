/**
 * This Software is part of aryelgois\utils-js and is provided "as is".
 *
 * @see LICENSE
 */

/**
 * Tracks keyboard keys
 *
 * @author Aryel Mota Góis
 * @license MIT
 * @link https://www.github.com/aryelgois/utils-js
 *
 * @param object context aryelgois.utils.keyboard
 */
(function (context) {
    /**
     * Holds currently pressed keys as key_code => event
     */
    var keys = {};

    /**
     * Initializes event listeners
     */
    function init() {
        window.addEventListener('keydown', keydown, true);
        window.addEventListener('keyup', keyup, true);
    }

    /**
     * Checks if a key combination is currently pressed
     *
     * @param string[] codes Multiple key codes to be verified
     * @param boolean  reset If the keys list should be cleared, useful when the
     *                       hotkey or the after code unfocus the window
     *
     * @return false If hotkey is not currently pressed or true if it is
     */
    function hotkey(codes, reset) {
        for (let code of codes) {
            if (!keys.hasOwnProperty(code)) {
                return false;
            }
        }
        if (reset) {
            context.keys = {};
        }
        return true;
    }

    /**
     * When a key is pressed
     *
     * @param object event Keyboard event
     */
    function keydown(event) {
        keys[event.code] = event;
    }

    /**
     * When a key is released
     *
     * @param object event Keyboard event
     */
    function keyup(event) {
        delete keys[event.code];
    }

    /*
     * Initialize events and bind public properties
     */
    init();
    context.hotkey = hotkey;
    context.keys = keys;
})(getNamespace('aryelgois.utils.keyboard'));
