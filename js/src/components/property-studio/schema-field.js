import React from "react"

export const SchemaField = ({components, schema, node}) => {

    const renderElement = (component, props, children) => {
        return React.createElement(component, props, children);
    }

    const component = schema.map((item, key) => {
        let comp = renderElement(components[item.component], {key, node, ...item.props});
        if(item.decorate){
            comp = renderElement(components[item.decorate], {key, label: item.title}, comp);
        }

        return comp;
    });

    return <>{component}</>
}