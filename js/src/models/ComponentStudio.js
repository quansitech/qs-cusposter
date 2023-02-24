import { makeAutoObservable } from "mobx"
import { DragDropOperation } from "./DragDropOperation"
import { calcRelateOffset } from "@/utils"
import { Node } from "./Node"

const getNodeDefaultValue = (node, component) => {
    const defaultValue = {};
    component.propertySchema.forEach(item => {
        const valueKey = (component?.valueMap  && component.valueMap[item.name]) || 'value';
        defaultValue[item.name] = item?.props[valueKey];
    })
    let rtValue = {};
    Object.keys(defaultValue).forEach(key => {
        if(defaultValue[key]){
            rtValue[key] = defaultValue[key];
        }
    })

    if(component?.defaultValue){
        rtValue = {...rtValue, ...component.defaultValue(node)};
    }

    return rtValue;
}

export class ComponentStudio{

    id
    designer
    nodeComponents

    constructor(designer, nodeComponents){
        makeAutoObservable(this)
        this.designer = designer;
        this.nodeComponents = nodeComponents;
        this.addDragListener();
    }

    addDragListener(){
        const dragDropOperation = new DragDropOperation();
        const designer = this.designer;

        this.designer.rootDom.addEventListener('dragstart', (e) => {
            
            if(designer.mode !== 'design'){
                return;
            }

            const closestId = e.target.closest("[id]").id;
            const nodeComponent = this.findNodeComponentBId(closestId);
            if(nodeComponent){
                dragDropOperation.dragStart(nodeComponent);
            }
        });

        this.designer.rootDom.addEventListener('dragover', (e) => {
            if(designer.mode !== 'design'){
                return;
            }
            e.preventDefault()
            dragDropOperation.dragOverDesigner(e.target);
        });

        this.designer.rootDom.addEventListener('dragend', (e) => {
            if(designer.mode !== 'design'){
                return;
            }

            if(dragDropOperation.stage === "draggable"){
                const nodeComponent = dragDropOperation.nodeComponent;

                const node = new Node(nodeComponent);

                const defaultValue = getNodeDefaultValue(node, nodeComponent.component['Node']);

                const {left, top} = calcRelateOffset(document.getElementsByClassName('qs-poster-img')[0], e);

                node.setValue({ ...defaultValue, ...{left, top}});
                this.designer.insertNode(node);
            }
            dragDropOperation.init();
        });
    }

    findNodeComponentBId(id){
        return this.nodeComponents.find(nodeComponent => nodeComponent.id === id)
    }
}