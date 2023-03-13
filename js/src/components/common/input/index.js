import React from "react"
import { Input as AntInput } from "antd"

export const Input = ({onChange, value, node, type, placeholder}) => {

    const handleChange = (e) => {
        onChange && onChange(node, e.target.value);
    }

    return <AntInput placeholder={placeholder} type={type} value={value} onChange={handleChange} />
}