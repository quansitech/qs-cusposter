import React from "react"
import {Collapse} from "../common/collapse"
import {Text, Var, Image} from "@/components/nodes"
import { useComponentStudio } from "@/hooks"
import "./index.scss"

export const ComponentStudio = ({designer}) => {
    const components = {
        Text,
        Var,
        Image
    }

    const componentStudio = useComponentStudio(designer, components);

    const renderThumb = () => {
        if(componentStudio?.nodeComponents.length > 0){
            return componentStudio.nodeComponents.map(nodeCompnent => {
                const Component = nodeCompnent.component['Thumb'];
                let props = { id: nodeCompnent.id };
                if(nodeCompnent?.option?.title){
                    props = {...props, ...{ label: nodeCompnent.option.title }}
                }
                return <div className="qs-poster-component-studio-item" key={nodeCompnent.id}>
                    {React.createElement(Component, props)}
                </div>
            })
        }
        else{
            return <></>
        }

       
    }

    return <Collapse title="组件">
        <div className="qs-poster-component-studio-wrap">
            <div className="qs-poster-component-studio-body">
                    {renderThumb()}
            </div>
        </div>
    </Collapse>
}