import React from "react"
import { BoldOutlined, ItalicOutlined } from "@ant-design/icons"

import "./index.scss"

export const IconCheckbox = ({icon, onChange, value, valueOption, node}) => {
    const [ checked, setChecked ] = React.useState(valueOption[value]);

    const icons = {
        BoldOutlined,
        ItalicOutlined
    }

    const className = checked ? "qs-poster-icon-checkbox-checked" : "qs-poster-icon-checkbox";

    const handleChange = () => {
        setChecked(!checked);
        const realValue = Object.keys(valueOption).find(key => valueOption[key] === !checked);
        onChange && onChange(node, realValue);
    }

    return <div className={className} onClick={handleChange}>
        { React.createElement(icons[icon], {}) }
    </div>

}