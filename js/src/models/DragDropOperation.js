
export class DragDropOperation{

    stage
    nodeComponent

    constructor(){
        this.init();
    }

    init(){
        this.stage = "init";
        this.nodeComponent = null;
    }

    dragStart(nodeComponent){
        this.stage = "dragging";
        this.nodeComponent = nodeComponent;
    }

    dragOverDesigner(target){
        
        if( this.stage === "dragging" && target.className === 'qs-poster-img' ){
            this.stage = "draggable";
        }
        if( this.stage === "draggable" && target.className !== 'qs-poster-img' ){
            this.stage = "dragging";
        }
    }
}