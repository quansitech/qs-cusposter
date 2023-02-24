import { useRef, useEffect } from "react"
import { useUpdate } from "@/hooks"
import { NodeComponent } from "@/models/NodeComponent"
import { ComponentStudio } from "@/models/ComponentStudio"

export const useComponentStudio = (designer, components) => {
    const update = useUpdate();
    const componentStudio = useRef();

    useEffect(() => {
        const nodeComponents = Object.keys(components).map((k) => {
            const component = components[k];
            if(!component.custom){
                const nodeComponent = new NodeComponent(component, k);
                return nodeComponent;
            }
            
        }).filter(nodeComponent => nodeComponent);

        designer?.options?.nodeComponents.forEach(nodeComponentOption => {
            nodeComponents.push(new NodeComponent(nodeComponentOption.nodeComponent,nodeComponentOption.nodeComponent, nodeComponentOption));
        })

        componentStudio.current = new ComponentStudio(designer, nodeComponents);
        update();
    }, []);

    return componentStudio.current;
}