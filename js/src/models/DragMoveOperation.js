

export class DragMoveOperation{

    stage
    node
    offsetLeft
    offsetTop

    constructor(){
        this.init();
    }

    init(){
        this.stage = "init";
        this.node = null;
        this.offsetLeft = 0;
        this.offsetTop = 0;
    }

    dragStart(node, offsetLeft, offsetTop){
        this.stage = "dragging";
        this.node = node;
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop
    }

    dragEnd(){
        this.init();
    }
}