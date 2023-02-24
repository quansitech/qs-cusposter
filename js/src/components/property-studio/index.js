import React from "react"
import { Input } from "@/components/common/input" 
import { observer } from "mobx-react-lite"
import { Collapse, FormItem, ImageUpload, TextArea, Select, IconCheckbox, FormGrid, Align } from "@/components/common"
import { SchemaField } from "./schema-field"

import "./index.scss"

export const PropertyStudio = observer(({designer}) => {

    const components = {
        ImageUpload,
        Input,
        TextArea,
        FormItem,
        Select,
        IconCheckbox,
        FormGrid,
        Align
    };

    const schema = designer?.selectedNode?.propertySchema || [];

    return <Collapse title="属性配置">
        <div className="qs-poster-property-studio-body">
            <SchemaField 
                node={designer?.selectedNode}
                components={components}
                schema={schema}
            />
        </div>
    </Collapse>
})