import React from "react"
import { observer } from "mobx-react-lite"
import "./index.scss"

export const Poster = observer(({node}) => {

    return <div className="qs-poster">
        {
            node?.value?.background && node?.value?.background[0]?.url ? <img crossOrigin="anonymous" className="qs-poster-img" src={node.value.background[0].url} /> : <div className="qs-poster-blank"></div>
        }
    </div>;
})

Poster.propertySchema = [
    {
        title: '背景图',
        name: 'background',
        component: 'ImageUpload',
        decorate: 'FormItem',
        props: {
            onChange: (node, res) => {
                node.setValue({ background: res});
            },
            defaultFileList: []
        }
    }
];

Poster.valueMap = {
    background: 'defaultFileList'
}

Poster.delete = (node) => {
    node.setValue({ background: []})
}

Poster.resizeCallback = (node, width, height) => {
     node.setValue({ ...node.value, ...{ width, height }});
}

Poster.workbench = true;