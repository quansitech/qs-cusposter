import React from "react"
import { Select as AntSelect } from "antd"

export const Select = ({onChange, value, options, node}) => {
    const [ innerValue, setInnerValue ] = React.useState(value);

    React.useEffect(() => {
        setInnerValue(value);
    }, [value])

    const handleChange = (value) => {
        setInnerValue(value);
        onChange && onChange(node, value);
    }

    return <AntSelect value={innerValue} options={options} onChange={handleChange} />
}