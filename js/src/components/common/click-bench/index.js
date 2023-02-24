import React from "react"
import { DeleteOutlined } from "@ant-design/icons"
import { NodeFactory } from "../node-factory"
import { observer } from "mobx-react-lite"
import "./index.scss"

export const ClickBench = observer(({node}) => {

    const style = node?.component?.setWrapStyle ? node?.component?.setWrapStyle(node) : {};

    let clickBenchClassName = "qs-poster-click-bench";
    if(node?.component?.workbench !== true){
        clickBenchClassName += " draggable";
    }

    let wrapClassName = "qs-poster-node-wrap";
    if(node?.component?.workbench !== true && !node?.selected ){
        wrapClassName += " pointer";
    }

    const renderResize = () => {
        if(node?.component?.resize === true && node?.selected){
            return <>
                <div className="qs-poster-node-resize resize-icon resize" >
                    <svg t="1676946487512" className="resize" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3763">
                        <path className="resize" d="M319.20128 974.56128L348.16 1003.52l655.36-655.36-28.95872-28.95872-655.36 655.36zM675.84 1003.52l327.68-327.68-28.95872-28.95872-327.68 327.68L675.84 1003.52z" fill="#000000" p-id="3764">
                        </path>
                    </svg>
                </div>
            </>
        }
        else{
            return <></>
        }
    }
    

    const handleDelete = () => {
        node.delete();
    }

    const renderNode = (disableStyle) => {
        if(node?.component){
            return <NodeFactory disableStyle={disableStyle} node={node} className={wrapClassName}>
                { renderResize() }
            </NodeFactory>
        }
        else{
            return <></>
        }
    }

    return node?.selected ? <div style={style} className={clickBenchClassName}>
        <DeleteOutlined onClick={handleDelete} />
        {renderNode(true)}
    </div> : renderNode(false)
})