import React from "react"
import { createNode } from "@/core"
import { Button } from "antd"
import { observer } from "mobx-react-lite"
import { DesignerContext } from "@/context"
import "./index.scss"

export const PosterDesigner = observer(({designer}) => {

    const renderNodes = (nodes) => {
        return nodes.map(node => {
            return createNode(node.id, node.id)
        })
    }


    return <div id={designer.id} className="qs-poster-studio">
        <div className="action-group">
            <Button disabled={designer.mode === 'design'} onClick={() => { designer.setMode('design') }}>设计</Button>
            <Button disabled={designer.mode === 'preview' } onClick={() => { designer.setMode('preview') }}>预览</Button>
        </div>
        <DesignerContext.Provider value={designer}>
            <div className="qs-poster-workbench">
                
                { renderNodes(designer.nodes) }
            </div>
        </DesignerContext.Provider>
    </div>
})

