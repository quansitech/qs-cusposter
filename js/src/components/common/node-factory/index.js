import React from "react"

import { observer } from "mobx-react-lite"

export const NodeFactory = observer(({node,className, disableStyle, children}) => {
    const wrapRef = React.useRef(null);
    const innerClassName = className || "qs-poster-node-wrap";

    React.useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if(node.designer.mode !== 'design') return;

            if (!Array.isArray(entries) || !entries.length) {
                return;
            }

            for(let entry of entries){
                node.component.resizeCallback(node, entry.contentRect.width, entry.contentRect.height);
            }
        });

        node?.designer.mode === 'design' && node?.component?.resizeCallback && wrapRef.current && resizeObserver.observe(wrapRef.current);
        return () => {
            node?.designer.mode === 'design' && node?.component?.resizeCallback && wrapRef.current && resizeObserver.unobserve(wrapRef.current);
        }
    }, [])
    
    const style = () => {
        if(disableStyle){
            return {};
        }
        else{
            return node?.component?.setWrapStyle ? node?.component?.setWrapStyle(node) : {};
        }
       
    }
    
    const renderWrap = (pStyle) => {
        if(node?.component){
            return <div ref={wrapRef} id={node?.id} style={pStyle} className={innerClassName}>
                { React.createElement(node.component, { node }) }
                { children }
            </div>
        }
        else{
            return <></>
        }
    }


    return renderWrap(style())
})