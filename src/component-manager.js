const registeredComponents = {};

/**
 * Register a component class with the specified name.
 *
 * @export
 * @param {string} name
 * @param {any} componentClass
 */
export function registerComponent(name, componentClass) {
	registeredComponents[name.toLowerCase()] = componentClass;
}

/**
 * Retreive a component class with the specified name.
 * Return null if no component was registered under that name.
 *
 * @export
 * @param {string} name
 * @returns {Object|null}
 */
export function getComponent(name) {
	const lcName = name.toLowerCase();

	return Object.prototype.hasOwnProperty.call(registeredComponents, lcName) ? registeredComponents[lcName] : null;
}
