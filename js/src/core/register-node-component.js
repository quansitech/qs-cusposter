let registeredNodeComponents = {};

export const registerNodeComponent = (nodeComponents) => {
    registeredNodeComponents = { ...registeredNodeComponents, ...nodeComponents}
}

export const getRegisteredNodeComponent = (name) => {
    return registeredNodeComponents[name];
}