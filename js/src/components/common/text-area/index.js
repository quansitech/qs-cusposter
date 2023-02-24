import React from "react"
import { Input as AntInput } from "antd"

export const TextArea = ({onChange, value, node}) => {

    const handleChange = (e) => {
        onChange && onChange(node, e.target.value);
    }

    return <AntInput.TextArea value={value} onChange={handleChange} />
}
