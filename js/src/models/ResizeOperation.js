export class ResizeOperation{

    stage
    node
    offsetLeft
    offsetTop
    originWidth
    originHeight
    maxWidth
    maxHeight

    constructor(){
        this.init();
    }

    init(){
        this.stage = "init";
        this.node = null;
        this.offsetLeft = 0;
        this.offsetTop = 0;
    }

    resizeStart(node, offsetLeft, offsetTop, workbenchNode){
        this.stage = "resizing";
        this.node = node;
        this.offsetLeft = offsetLeft;
        this.offsetTop = offsetTop
        this.originHeight = node.value.height;
        this.originWidth = node.value.width;

        const workbenchDom = document.getElementById(workbenchNode.id);
        const workbenchRect = workbenchDom.getBoundingClientRect();
        this.maxWidth = workbenchRect.width - node.value.left;
        this.maxHeight = workbenchRect.height - node.value.top;
    }

    resizeEnd(){
        this.init();
    }

    resizeMove(x,y){
        if(this.stage === 'resizing'){
            const offsetWidth = x - this.offsetLeft;
            const offsetHeight = y - this.offsetTop;
            let newWidth = parseFloat(this.originWidth) + parseFloat(offsetWidth);
            let newHeight = parseFloat(this.originHeight) + parseFloat(offsetHeight);
            newWidth = newWidth < 0 ? 0 : newWidth;
            newHeight = newHeight < 0 ? 0 : newHeight;
            newWidth = newWidth > this.maxWidth ? this.maxWidth : newWidth;
            newHeight = newHeight > this.maxHeight ? this.maxHeight : newHeight;
            this.node.setValue({...this.node.value, ...{width: newWidth, height: newHeight}});
        }
    }
}