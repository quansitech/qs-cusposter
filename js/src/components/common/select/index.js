import React from "react"
import { Select as AntSelect } from "antd"

export const Select = ({onChange, value, options, node, style}) => {
    const [ innerValue, setInnerValue ] = React.useState(value);

    React.useEffect(() => {
        setInnerValue(value);
    }, [value])

    const handleChange = (value) => {
        setInnerValue(value);
        onChange && onChange(node, value);
    }

    return <AntSelect style={{...{ width: '100%' }, ...style}} value={innerValue} options={options} onChange={handleChange} />
}