import { observer } from "mobx-react-lite"
import React from 'react';
import { genFontSizeOptions } from "@/utils";

const TextNode = observer(({node}) => {
    const defaultStyle = {
        whiteSpace: 'pre-line',
        userSelect: 'none',
    };

    const { position, left, top, ...style} = node.value;

    return <span style={{...defaultStyle, ...style}}>{node?.value?.text || '固定文本'}</span>
})

TextNode.propertySchema = [
    {
        title: '文本',
        name: 'text',
        component: 'TextArea',
        decorate: 'FormItem',
        props: {
            onChange: (node, text) => {
                node.setValue({ ...node.value, ...{text}});
            },
            value: ''
        }
    },
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
            value: '#000000'
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


TextNode.setWrapStyle = (node) => {
    const { top, left } = node.value;
    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`
    }
}

export const Text = {
    Thumb: ({id}) => {
        return <div className="qs-poster-node-thumb" id={id} draggable={true}>
            <svg t="1676464805862" className="thumb-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2804">
                <path d="M853.333333 170.666667H170.666667a42.666667 42.666667 0 0 0-42.666667 42.666666v128a42.666667 42.666667 0 0 0 85.333333 0V256h256v554.666667H384a42.666667 42.666667 0 0 0 0 85.333333h256a42.666667 42.666667 0 0 0 0-85.333333h-85.333333V256h256v85.333333a42.666667 42.666667 0 0 0 85.333333 0V213.333333a42.666667 42.666667 0 0 0-42.666667-42.666666z" p-id="2805">
                </path>
            </svg>
            <span className="drag-title">固定文本</span>
        </div>
    },
    Node: TextNode,
    //区分Poster这种非纯正的node组件
    pure: true
}