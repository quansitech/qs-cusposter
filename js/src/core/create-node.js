import React from "react"
import { ClickBench } from "@/components/common/click-bench"
import { NodeFactory } from "@/components/common/node-factory"
import { useNode } from "@/hooks"

const InnerNode = ({id}) => {
    const node = useNode(id);

    const render = () => {
        if(node?.designer.mode !== 'design'){
            return <NodeFactory node={node}></NodeFactory>
        }
        else{
            return <ClickBench node={node}></ClickBench>
        }
    }
    
    return render();
}

export const createNode = (id, key) => {
    return <InnerNode id={id} key={key} />
}