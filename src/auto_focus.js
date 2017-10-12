/**
 * This Software is part of aryelgois\utils-js and is provided "as is".
 *
 * @see LICENSE
 */

/**
 * Auto focus a field element on keydown
 *
 * NOTES:
 * - Use only one per page, or only one enabled at time
 *
 * @author Aryel Mota Góis
 * @license MIT
 * @link https://www.github.com/aryelgois/utils-js
 *
 * @param object context aryelgois.utils.auto_focus
 */
(function (context) {
    /**
     * Selector for inputs which disable/re-enable the auto focus
     */
    var inputs = 'input, textarea, select';

    /**
     * Creates a new auto_focus Handler
     *
     * @param jQuery parent Element containing the field (e.g. the form element)
     * @param jQuery field  Target field element (child of parent)
     * @param jQuery root   Root element (where the auto focus is enabled)
     *
     * @return object With methods to enable/disable the auto focus
     */
    function init(parent, field, root) {
        if (typeof root === 'undefined') {
            var root = $(document);
        }

        var closure = {
            handler: function () {
                autoFocus(parent);
            },
            disable: function () {
                disableAutoFocus(parent);
            },
            enable: function () {
                enableAutoFocus(parent);
            }
        };

        root.on('keydown', closure.handler);

        parent.data('auto-focus-enabled', true)
              .data('auto-focus-field', field)
              .on('focus', inputs, closure.disable)
              .on('blur', inputs, closure.enable);

        return {
            disable: closure.disable,
            enable: closure.enable,
        };
    }

    /**
     * Sets focus to field element
     *
     * @param jQuery parent
     */
    function autoFocus(parent) {
        if (parent.data('auto-focus-enabled')) {
            parent.data('auto-focus-field').focus();
        }
        disableAutoFocus(parent);
    }

    /**
     * Disables the auto focus
     *
     * @param jQuery parent
     */
    function disableAutoFocus(parent) {
        parent.data('auto-focus-enabled', false);
    }

    /**
     * Enables the auto focus
     *
     * @param jQuery parent
     */
    function enableAutoFocus(parent) {
        if (parent.find(inputs).filter(filterNotEmpty).length === 0) {
            parent.data('auto-focus-enabled', true);
        }
    }

    /**
     * Filter for jQuery.filter to find fields with any value
     */
    function filterNotEmpty() {
        return this.value.length !== 0;
    }

    /*
     * Public properties
     */
    context.init = init;
})(getNamespace('aryelgois.utils.auto_focus'));
