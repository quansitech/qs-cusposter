export const calcRelateOffset = (node, e) => {
    const {left, top} = node.getBoundingClientRect();
    
    return {
        left: e.clientX - left,
        top: e.clientY - top
    }
}

export const calcRelateNodeOffset = (srcNode, targetNode) => {
    const {left: srcLeft, top: srcTop} = srcNode.getBoundingClientRect();
    const {left: targetLeft, top: targetTop} = targetNode.getBoundingClientRect();
    
    return {
        left: targetLeft - srcLeft,
        top: targetTop - srcTop
    }
}