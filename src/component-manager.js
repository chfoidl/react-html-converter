const registeredComponents = {};

export const registerComponent = (name, componentClass) => {
	registeredComponents[name.toLowerCase()] = componentClass;
}

export const getComponent = name => {
	const lcName = name.toLowerCase();

	return Object.prototype.hasOwnProperty.call(registeredComponents, lcName) ? registeredComponents[lcName] : null;
}
