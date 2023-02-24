import { observer } from "mobx-react-lite"
import React from 'react';

const blankImgBase64 = "data:image/png;base64,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";

const ImageNode = observer(({node}) => {
    const defaultStyle = {
        whiteSpace: 'pre-line',
        userSelect: 'none',
    };

    const { width, height, img } = node.value;

    const style = {
        ...defaultStyle,
        ...{
            width: `${width}px`,
            height: `${height}px`,
        }
    }

    const imgUrl = img && img.length > 0 && img[0].url

    return imgUrl ? <img draggable={false} style={style} crossOrigin="anonymous" src={imgUrl} /> : <img style={style} draggable={false} src={blankImgBase64} />
})

ImageNode.propertySchema = [
    {
        title: '图片',
        name: 'img',
        component: 'ImageUpload',
        decorate: 'FormItem',
        props: {
            onChange: (node, res) => {
                node.setValue({ ...node.value, ...{img: res}});
            },
            defaultFileList: []
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
        title: '宽度',
        name: 'width',
        component: 'Input',
        decorate: 'FormItem',
        props: {
            onChange: (node, text) => {
                node.setValue({ ...node.value, ...{width: text}})
            },
            value: 50
        }
    },
    {
        title: '高度',
        name: 'height',
        component: 'Input',
        decorate: 'FormItem',
        props: {
            onChange: (node, text) => {
                node.setValue({ ...node.value, ...{height: text}})
            },
            value: 50
        }
    },
]


ImageNode.setWrapStyle = (node) => {
    const { top, left } = node.value;
    return {
        position: 'absolute',
        top: `${top}px`,
        left: `${left}px`
    }
}

ImageNode.valueMap = {
    img: 'defaultFileList'
}

ImageNode.resize = true;

export const Image = {
    Thumb: ({id}) => {
        return <div className="qs-poster-node-thumb" id={id} draggable={true}>
            <svg t="1676876094287" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2793">
                <path d="M216.327 223.774h616.465q27.01 0 46.076 19.066t19.066 46.076v467.115q0 27.01-19.066 46.076t-46.076 19.066H216.327q-26.216 0-46.076-19.066-19.066-19.066-19.066-46.076V591.587v-47.665-30.982-45.282-178.743q0-27.01 19.066-46.076 19.86-19.066 46.076-19.066z m0 631.559h616.465q41.31 0 69.908-28.599 27.804-28.599 27.804-69.114V289.71q0-40.515-27.804-69.114-28.599-28.599-69.908-28.599H216.327q-40.515 0-69.114 28.599-28.599 28.599-28.599 69.114V757.619q0 39.721 28.599 68.32 28.599 29.393 69.114 29.393z m46.076-429.778q0 28.599 19.86 48.459 20.655 20.655 49.254 20.655 28.599 0 49.254-20.655 19.86-19.86 19.86-48.459 0-28.599-19.86-48.459-20.655-20.655-49.254-20.655-28.599 0-49.254 20.655t-19.86 48.459z m32.571 0q0-15.094 11.122-26.216 10.327-10.327 25.421-10.327t25.421 10.327q11.122 11.122 11.122 26.216 0 15.094-11.122 26.216-10.327 10.327-25.421 10.327-14.299 0-25.421-10.327t-11.122-26.216z m368.608 67.526L835.97 665.469q5.561 5.561 5.561 11.122 0 6.355-5.561 11.916-5.561 6.355-11.916 6.355-5.561 0-11.122-6.355L640.544 516.119q-8.739-8.739-22.244-8.739-14.299 0-23.832 8.739-46.076 46.076-138.228 137.434-19.066 19.066-46.87 19.066-27.01 0-46.87-19.066-7.15-7.15-21.449-22.244-9.533-8.739-23.832-8.739-13.505 0-22.244 8.739l-57.198 57.198q-11.122 11.916-23.038 0-5.561-5.561-5.561-11.122t5.561-11.916l57.198-57.198q19.066-19.066 46.87-19.066 27.01 0 46.87 19.066 7.15 7.15 21.449 22.244 8.739 8.739 22.244 8.739 14.299 0 23.832-8.739 45.282-46.076 136.639-137.434 19.86-19.066 47.665-19.066 27.01 0 46.076 19.066z" p-id="2794">
                </path>
            </svg>
            <span className="drag-title">图片</span>
        </div>
    },
    Node: ImageNode,
    //区分Poster这种非纯正的node组件
    pure: true
}