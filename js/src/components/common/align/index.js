import React from "react"
import {AlignCenterOutlined, AlignLeftOutlined, AlignRightOutlined} from "@ant-design/icons"
import { Radio } from "antd"

import "./index.scss"

export const Align = ({node, value, onChange}) => {

    const handleChange = (e) => {
        onChange && onChange(node, e.target.value);
    }


    return <div className="qs-poster-align-wrap">
      <Radio.Group value={value} size="small" buttonStyle="solid"  onChange={handleChange}>
        <Radio.Button value="left"><AlignLeftOutlined /></Radio.Button>
        <Radio.Button value="middle" ><AlignCenterOutlined /></Radio.Button>
        <Radio.Button value="right" ><AlignRightOutlined /></Radio.Button>
      </Radio.Group>
    </div>
}