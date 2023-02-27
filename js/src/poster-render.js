import React from "react";
import ReactDOM from 'react-dom/client'
import { createNode, registerNodeComponent } from "@/core";
import { Designer } from "@/models/Designer"
import { Text, Var, Image } from "@/components/nodes"
import { Poster } from "@/components/poster-designer/poster"
import html2canvas from 'html2canvas';
import { DesignerContext } from "@/context"

registerNodeComponent({
    Poster,
    Text,
    Var,
    Image
})

const PosterRender = ({dom, nodes, width, height}) => {
    React.useEffect(() => {
        dom.style.top = '-4000px';
        dom.style.position = "absolute";
        let {width:imgWidth, height: imgHeight} = nodes.filter(node => node.component === 'Poster')[0].value;

        dom.style.width = `${imgWidth}px`;
        dom.style.height = `${imgHeight}px`;

        let toCanvas = false;

        //将html2canvas的任务放到resize事件中，避免dom还未完全渲染完成就已经做了截图
        const resizeObserver = new ResizeObserver((entries) => {
            if (!Array.isArray(entries) || !entries.length) {
                return;
            }

            for(let entry of entries){
                
                if(entry.target.id !== dom.id) continue;

                //避免重复截图
                if(!toCanvas && entry.contentRect.width > 0 && entry.contentRect.height > 0){
                    toCanvas = true;
                    html2canvas(dom, {
                        useCORS: true,
                    }).then(canvas => {
                        if(width){
                            canvas.style.width = `${width}px`;
                        }
                        if(height){
                            canvas.style.height = `${height}px`;
                        }
                        dom.parentElement.appendChild(canvas);
                    })
                }
                
            }
        });

        resizeObserver.observe(dom);
        return () => {
            resizeObserver.unobserve(dom);
        }

        // dom.addEventListener('resize', resizeListener)

        // setTimeout(() => {
        //     html2canvas(dom, {
        //         useCORS: true,
        //     }).then(canvas => {
        //         if(width){
        //             canvas.style.width = width;
        //         }
        //         if(height){
        //             canvas.style.height = height;
        //         }
        //         dom.parentElement.appendChild(canvas);
        //     })
        // }, 1);

        // return () => {
        //     dom.removeEventListener('resize', resizeListener)
        // }
        
    }, [])

    const designer = new Designer(dom, nodes, {}, 'actual');
    const renderNodes = (nodes) => {
        return nodes.map(node => {
            return createNode(node.id, node.id)
        })
    }
    return <DesignerContext.Provider value={designer}>
        { renderNodes(designer.nodes) }
    </DesignerContext.Provider>
}

// var nodes = [
//     {
//         "id": "hc78kx721g9",
//         "component": "Poster",
//         "value": {
//             "background": [
//                 {
//                     "status": "done",
//                     "fileId": "303",
//                     "name": "cert_template.png",
//                     "url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230227\/63fc5aafddb87.png",
//                     "uid": "__AUTO__1677482680437_0__"
//                 }
//             ],
//             "width": "669",
//             "height": "468"
//         }
//     },
//     {
//         "id": "nukdr9byoge",
//         "component": "Var",
//         "value": {
//             "fontSize": "22",
//             "align": "middle",
//             "fontWeight": "bold",
//             "fontStyle": "unset",
//             "text": "\u6052\u806a\u767e\u6c47\u7f51\u7edc\u6709\u9650\u516c\u53f8",
//             "left": "296.5",
//             "top": "222.28125",
//             "referWidth": "102.09375"
//         }
//     },
//     {
//         "id": "qu82n0hkmkv",
//         "component": "Var",
//         "value": {
//             "fontSize": "20",
//             "align": "middle",
//             "fontWeight": "bold",
//             "fontStyle": "unset",
//             "text": "\u7b2c\u4e00\u5c4a\u5e38\u52a1\u7406\u4e8b\u5355\u4f4d",
//             "left": "289.5",
//             "top": "263.28125",
//             "referWidth": "112.8125",
//             "color": "#f90606"
//         }
//     },
//     {
//         "id": "rkbs4joa3lq",
//         "component": "Var",
//         "value": {
//             "fontSize": "14",
//             "align": "middle",
//             "fontWeight": "unset",
//             "fontStyle": "unset",
//             "text": "\u4e8c\u96f6\u4e00\u516d\u5e74\u4e94\u6708",
//             "left": "497.5",
//             "top": "367.28125",
//             "referWidth": "64.9375"
//         }
//     },
//     {
//         "id": "s1rj0ijo9x9",
//         "component": "Image",
//         "value": {
//             "img": [
//                 {
//                     "status": "done",
//                     "fileId": "304",
//                     "name": "cer.png",
//                     "url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230227\/63fc5afc2aa5b.png",
//                     "uid": "__AUTO__1677482755119_0__"
//                 }
//             ],
//             "width": "91",
//             "height": "89",
//             "left": "484.5",
//             "top": "309.28125"
//         }
//     }
// ]

// const root = ReactDOM.createRoot(document.getElementById('qs-poster-app'));
// root.render(<PosterRender dom={document.getElementById("qs-poster-app")} nodes={nodes} />);

window['posterRender'] = (dom, nodes, width, height) => {
    ReactDOM.createRoot(dom).render(<PosterRender dom={dom} nodes={nodes} width={width} height={height} />)
}