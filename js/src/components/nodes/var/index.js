import React from 'react';
import { observer } from 'mobx-react-lite';
import { genFontSizeOptions } from "@/utils";

const VarNode = observer(({node}) => {
    const defaultStyle = {
        whiteSpace: 'pre-line',
        userSelect: 'none',
    };

    const { position, left, top, align, text, referWidth, ...style} = node.value;

    const getText = () => {
        if(node.designer.mode === 'preview'){
            return node.nodeComponent.option?.example;
        }
        else if(node.designer.mode === 'design'){
            return `#${node.nodeComponent.option?.title}`
        }
        else{
            return node?.value?.text
        }
    }

    return <span style={{...defaultStyle, ...style}}>{ getText() }</span>
})

VarNode.propertySchema = [
    {
        title: 'top',
        name: 'top',
        component: 'Input',
        decorate: 'FormItem',
        props: {
            onChange: (node, text) => {
                node.setValue({ ...node.value, ...{top: text}})
            },
            value: 0
        }
    },
    {
        title: 'left',
        name: 'left',
        component: 'Input',
        decorate: 'FormItem',
        props: {
            onChange: (node, text) => {
                node.setValue({ ...node.value, ...{left: text}})
            },
            value: 0
        }
    },
    {
        title: '字体大小',
        name: 'fontSize',
        component: 'Select',
        decorate: 'FormItem',
        props: {
            onChange: (node, val) => {
                node.setValue({ ...node.value, ...{fontSize: val}})
            },
            value: 14,
            options: genFontSizeOptions()
        }
    },
    {
        title: '颜色',
        name: 'color',
        component: 'Input',
        decorate: 'FormItem',
        props: {
            onChange: (node, val) => {
                node.setValue({ ...node.value, ...{color: val}})
            },
            type: 'color',
            value: '#fffff'
        }
    },
    {
        title: '对齐',
        name: 'align',
        component: 'Align',
        decorate: 'FormItem',
        props: {
            onChange: (node, val) => {
                node.setValue({ ...node.value, ...{align: val}})
            },
            value: 'left'
        }
    },
    {
        title: '粗体',
        name: 'fontWeight',
        component: 'IconCheckbox',
        decorate: 'FormItem',
        props: {
            onChange: (node, val) => {
                node.setValue({ ...node.value, ...{fontWeight: val}})
            },
            icon: 'BoldOutlined',
            value: 'unset',
            valueOption: {
                unset: false,
                bold: true
            }
        }
    },
    {
        title: '斜体',
        name: 'fontStyle',
        component: 'IconCheckbox',
        decorate: 'FormItem',
        props: {
            onChange: (node, val) => {
                node.setValue({ ...node.value, ...{fontStyle: val}})
            },
            icon: 'ItalicOutlined',
            value: 'unset',
            valueOption: {
                unset: false,
                italic: true
            }
        }
    }
]

VarNode.setWrapStyle = (node) => {
    const {align, left, top, referWidth} = node.value;
    let style = {};

    if(node.designer.mode !== 'design'){
        const alignTransformMap = {
            left: () => {
                return {};
            },
            middle: (left, referWidth) => {
                return {
                    left: Number(left) + referWidth / 2,
                    transform: 'translate(-50%)'
                }
            },
            right: (left, referWidth) => {
                return {
                    left: Number(left) + Number(referWidth),
                    transform: 'translate(-100%)'
                }
            }
        }
        style = alignTransformMap[align](left, referWidth);
    }


    return {
        ...{
            position: 'absolute',
            top: `${top}px`,
            left: `${left}px`
        },
        ...style
    }
}

VarNode.defaultValue = (node) => {
    return {
        text: `#${node.nodeComponent.option.name}`
    }
}

VarNode.resizeCallback = (node, width) => {
    node.setValue({ ...node.value, ...{referWidth: width}})
}

export const Var = {
    Thumb: ({id, label}) => {
        return <div className="qs-poster-node-thumb" id={id} draggable={true}>
            <svg t="1676627251289" className="thumb-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2753">
                <path d="M596.32 263.392c18.048 6.56 27.328 26.496 20.8 44.512l-151.04 414.912a34.72 34.72 0 1 1-65.28-23.744l151.04-414.912a34.72 34.72 0 0 1 44.48-20.768zM220.64 192H273.6v55.488H233.024c-26.112 0-38.464 14.4-38.464 44.544v134.304c0 42.496-19.936 71.264-59.104 85.664 39.168 16.448 59.104 44.544 59.104 85.664v134.976c0 28.8 12.352 43.84 38.464 43.84H273.6V832H220.672c-30.24 0-53.6-10.272-70.08-29.44-15.136-17.856-22.72-42.496-22.72-72.64v-128.832c0-19.872-4.096-34.24-12.352-43.2-9.6-10.944-26.784-16.416-51.52-17.792v-56.192c24.736-1.376 41.92-7.52 51.52-17.824 8.256-9.6 12.384-24 12.384-43.168V294.784c0-30.848 7.552-55.488 22.688-73.312C167.04 201.6 190.4 192 220.672 192z m529.792 0h52.896c30.24 0 53.6 9.6 70.08 29.44 15.136 17.856 22.72 42.496 22.72 73.344v128.128c0 19.2 4.096 34.24 13.024 43.84 8.96 9.6 26.112 15.776 50.848 17.152v56.192c-24.736 1.376-41.92 6.848-51.52 17.824-8.256 8.896-12.384 23.296-12.384 43.168v128.8c0 30.176-7.552 54.816-22.688 72.64-16.48 19.2-39.84 29.472-70.08 29.472h-52.896v-55.488h40.544c25.408 0 38.464-15.104 38.464-43.84v-135.04c0-41.088 19.232-69.184 59.104-85.632-39.872-14.4-59.104-43.168-59.104-85.664V292.032c0-30.144-13.056-44.544-38.464-44.544H750.4V192z" fill="#333333" p-id="2754">
                </path>
            </svg>
            <span className="drag-title">{label}</span>
        </div>
    },
    Node: VarNode,
    //供用户客制化的组件
    custom: true,
    pure: true
}
