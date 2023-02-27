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
        setTimeout(() => {
            html2canvas(dom, {
                useCORS: true,
            }).then(canvas => {
                if(width){
                    canvas.style.width = width;
                }
                if(height){
                    canvas.style.height = height;
                }
                dom.parentElement.appendChild(canvas);
            })
        });
        
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

// const nodes = [{
// 	"id": "2p7ceb769n0",
// 	"component": "Poster",
// 	"value": {
// 		"background": [{
// 			"status": "done",
// 			"fileId": "158",
// 			"name": "cert_template.png",
// 			"url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230223\/63f772e2551ca.png"
// 		}],
//         "width": '669',
//         "height": '468'
// 	}
// }, {
// 	"id": "l7pckkaxbit",
// 	"component": "Var",
// 	"value": {
// 		"fontSize": "14",
// 		"align": "middle",
// 		"fontWeight": "unset",
// 		"fontStyle": "unset",
// 		"text": "#publishDate",
// 		"left": "492.515625",
// 		"top": "362.28125",
// 		"referWidth": "64.9375"
// 	}
// }, {
// 	"id": "otmathbn72n",
// 	"component": "Image",
// 	"value": {
// 		"img": [{
// 			"status": "done",
// 			"fileId": "159",
// 			"name": "cer.png",
// 			"url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230223\/63f772f2bd524.png",
// 			"uid": "__AUTO__1677161209626_0__"
// 		}],
// 		"width": "100",
// 		"height": "100",
// 		"left": "474.515625",
// 		"top": "294.28125"
// 	}
// }, {
// 	"id": "gwgslezcgak",
// 	"component": "Var",
// 	"value": {
// 		"fontSize": "16",
// 		"align": "middle",
// 		"fontWeight": "bold",
// 		"fontStyle": "unset",
// 		"text": "#companyName",
// 		"left": "298.515625",
// 		"top": "225.28125",
// 		"referWidth": "74.25"
// 	}
// }, {
// 	"id": "ddzt0eiuph2",
// 	"component": "Var",
// 	"value": {
// 		"fontSize": "16",
// 		"align": "middle",
// 		"fontWeight": "bold",
// 		"fontStyle": "unset",
// 		"text": "#editionLevel",
// 		"left": "292.515625",
// 		"top": "263.28125",
// 		"referWidth": "90.25",
// 		"color": "#e70d0d"
// 	}
// }]

const root = ReactDOM.createRoot(document.getElementById('qs-poster-app'));
root.render(<PosterRender dom={document.getElementById("qs-poster-app")} nodes={nodes} width={100} />);

window['posterRender'] = (dom, nodes, width, height) => {
    ReactDOM.createRoot(dom).render(<PosterRender dom={dom} nodes={nodes} width={width} height={height} />)
}