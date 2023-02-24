import { makeAutoObservable } from "mobx"
import { Node } from "./Node"
import { uid } from "@/utils"
import { NodeComponent } from "@/models/NodeComponent"
import { DragMoveOperation } from "./DragMoveOperation"
import { ResizeOperation } from "./ResizeOperation"
import { calcRelateOffset, calcRelateNodeOffset } from "@/utils"

const findOptionByNode = (options, node) => {
    const optionMap = {};
    options.nodeComponents.forEach(nodeCompnent => {
        optionMap[`#${nodeCompnent.name}`] = nodeCompnent;
    });

    if(node.component !== 'Var'){
        return;
    }

    return optionMap[node.value.text];
}

export class Designer{

    id
    options
    mode  // design, preview, actual
    nodes = []
    selectedNode
    draggerNodes = []
    resizeNodes = []
    workbenchNode
    rootDom

    constructor(dom, nodes, options, mode){
        makeAutoObservable(this)
        this.mode = mode;
        this.rootDom = dom;
        if(mode !== 'actual'){
            this.addClickListener();
        }
        this.id = uid();
        this.options = options;

        if(Array.isArray(nodes) && nodes.length > 0){
            
            nodes.map(node => {
                
                return this.insertNode(new Node(new NodeComponent(node.component, node.component, this.options?.nodeComponents && findOptionByNode(this.options, node)), node.id, node.value));
            })
        }
        else{
            this.insertNode(new Node(new NodeComponent("Poster", "Poster")));
        }
    }

    setMode(mode){
        this.mode = mode;
    }

    insertNode(node){
        node.bindDesigner(this);
        this.nodes.push(node)
        if(node.component.resize){
            this.resizeNodes.push(node);
        }

        if(!node.component.workbench){
            this.draggerNodes.push(node);
        }
        else{
            this.workbenchNode = node;
        }
    }

    selected(id){
        const old = this.selectedNode;
        if(old){
            old.unSelected();
        }
        this.selectedNode = this.findNodeById(id);
        this.selectedNode.setSelected();
    }

    unselected(id){
        const node = this.findNodeById(id);
        node.unSelected();
        this.selectedNode = null;
    }

    unselectedAll(){
        if(this.selectedNode){
            this.selectedNode.unSelected();
            this.selectedNode = null;
        }
    }

    findNodeById(id){
        return this.nodes.find(node => node.id === id)
    }

    findDraggerNodeById(id){
        return this.draggerNodes.find(node => node.id === id)
    }

    clear(nodeId){
        this.nodes = this.nodes.filter(node => node.id !== nodeId)
    }


    addClickListener(){

        const dragMoveOperation = new DragMoveOperation();
        const resizeOperation = new ResizeOperation(this);
        let stage;
        const designer = this;


        this.rootDom.addEventListener('click', (e) => {
            if(designer.mode !== 'design'){
                return;
            }

            const closestId = e.target.closest("[id]")?.id;
            const node = this.findNodeById(closestId);
            if(node){
                this.selected(node.id);
            }
            else if(closestId === this.id){
                this.unselectedAll();
            }
        });

        const findId = (e) => {
            if(e.target.id){
                return e.target.id;
            }

            for(let i=0; i<e.target.children.length; i++){
                if(e.target.children[i].id){
                    return e.target.children[i].id;
                }
            }

            return e.target.closest("[id]").id;
        }

        const isResize = (e) => {
            return e.target.classList.contains('resize');
        }

        const dragStartHandle = (e) => {
            const node = this.findDraggerNodeById(findId(e));
            if(node && node.selected){
                const {left, top} = calcRelateNodeOffset(document.getElementById(designer.workbenchNode.id), document.getElementById(node.id));
                const {left: left2, top: top2} = calcRelateOffset(document.getElementById(designer.workbenchNode.id), e);
                dragMoveOperation.dragStart(node, left2 - left, top2 - top);
                stage = 'drag';
            }
        }

        const dragEndHandle = () => {
            dragMoveOperation.dragEnd();
            stage = '';
        }

        const dragMoveHandle = (e) => {
            if(dragMoveOperation.stage === 'dragging'){
                const workbenchDom = document.getElementById(designer.workbenchNode.id);
                const dragNodeDom = document.getElementById(dragMoveOperation.node.id);
                let {left, top} = calcRelateOffset(workbenchDom, e);
                const workbenchRect = workbenchDom.getBoundingClientRect();
                const dragNodeRect = dragNodeDom.getBoundingClientRect();
                left = left - dragMoveOperation.offsetLeft;
                top = top - dragMoveOperation.offsetTop;
                left = left < 0 ? 0 : left;
                top = top < 0 ? 0 : top;
                left = left + dragNodeRect.width > workbenchRect.width ? workbenchRect.width - dragNodeRect.width : left;
                top = top + dragNodeRect.height > workbenchRect.height ? workbenchRect.height - dragNodeRect.height : top;
                dragMoveOperation.node.setValue({...dragMoveOperation.node.value, ...{left, top}});
            }
        }

        const resizeStartHandle = (e) => {
            const node = this.findDraggerNodeById(findId(e));
            if(node && node.selected){
                resizeOperation.resizeStart(node, e.x, e.y, designer.workbenchNode);
                stage = 'resize';
            }
        }

        const resizeEndHandle = () => {
            resizeOperation.resizeEnd();
            stage = '';
        }

        const resizeMoveHandle = (e) => {
            resizeOperation.resizeMove(e.x, e.y);
        }

        this.rootDom.addEventListener('mousedown', (e) => {

            if(designer.mode !== 'design'){
                return;
            }

            if(isResize(e)){
                resizeStartHandle(e);
            }
            else{
                dragStartHandle(e);
            }
            
        })

        this.rootDom.addEventListener('mouseup', (e) => {
            if(designer.mode !== 'design'){
                return;
            }
            
            if(stage === 'resize'){
                resizeEndHandle(e);
            }
            else{
                dragEndHandle(e);
            }
        })

        this.rootDom.addEventListener('mousemove', (e) => {
            if(designer.mode !== 'design'){
                return;
            }
            
            if(stage === 'resize'){
                resizeMoveHandle(e);
            }
            else{
                dragMoveHandle(e);
            }

        })
    }
}