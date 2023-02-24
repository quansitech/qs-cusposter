import React from "react"
import { Input as AntInput } from "antd"

export const Input = ({onChange, value, node, type}) => {

    const handleChange = (e) => {
        onChange && onChange(node, e.target.value);
    }

    return <AntInput type={type} value={value} onChange={handleChange} />
}