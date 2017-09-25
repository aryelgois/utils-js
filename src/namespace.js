/**
 * This Software is part of aryelgois\utils-js and is provided "as is".
 *
 * @see LICENSE
 */

/**
 * Creates a nested object from a string, preserving existent objects
 *
 * @author Aryel Mota Góis
 * @license MIT
 * @link https://www.github.com/aryelgois/utils-js
 * @see  https://www.kenneth-truyers.net/2013/04/27/javascript-namespaces-and-modules/
 *
 * @param string path Dot separated namespace
 * @param object root Where the namespace is contained
 *
 * @return object
 */
function getNamespace(path, root) {
    if (typeof root === 'undefined') {
        root = window;
    }
    var nsparts = path.split('.'),
        current = root;

    // loop through the parts and create a nested namespace when necessary
    for (let i = 0, l = nsparts.length; i < l; i++) {
        let child = nsparts[i];
        // check if the current object contains the next subnamespace declared
        // if it isn't, then create it
        if (typeof current[child] === 'undefined') {
            current[child] = {};
        }
        // get a reference to the deepest element in the hierarchy so far
        current = current[child];
    }

    // the namespace tree is now safe to be used
    return current;
}
