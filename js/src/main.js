import React from "react"
import ReactDOM from 'react-dom/client'
import { Button, message } from "antd"
import { Designer } from "@/models/Designer"
import { ComponentStudio, PosterDesigner, PropertyStudio } from "@/components"
import { Text, Var, Image } from "@/components/nodes"
import { registerNodeComponent } from "@/core"
import { Poster } from "@/components/poster-designer/poster"
import "./main.scss"

registerNodeComponent({
    Poster,
    Text,
    Var,
    Image
})

message.config({
    top: 100
  });

const App = ({dom, options, nodes}) => {
    const [loading, setLoading] = React.useState(false);
    const [designer, setDesigner] = React.useState(new Designer(dom, nodes, options, 'design'));


    const handleSave = async () => {
        const res = designer.nodes.map(node => {
            return node.toJSON();
        })

        setLoading(true);
        const postRes = await fetch(options.postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-REQUESTED-WITH': 'xmlhttprequest'
            },
            body: JSON.stringify(res)
        })

        const resJson = await postRes.json();
        if(resJson.status){
            message.success(resJson.info, 2, () => {
                if(resJson?.url){
                    window.location.href = resJson.url;
                }
            });
        }
        else{
            message.error(resJson.info);
        }
        setLoading(false);
    }

    return (
        <div className="qs-poster-main-panel">
            <div className="qs-poster-main-panel-header">
                <Button loading={loading} type="primary" onClick={handleSave}>保存</Button>
            </div>
            <div className="qs-poster-workbench">
                <ComponentStudio designer={designer} />
                <PosterDesigner designer={designer} />
                <PropertyStudio designer={designer} />
            </div>
        </div>
    )
}

// var options = {
//     "postUrl": "\/admin\/levelCard\/editCert\/level_card_id\/5.html",
//     "oss": true,
//     "uploadAction": "\/extends\/aliyunOss\/policyGet\/type\/image.html",
//     "nodeComponents": [
//         {
//             "name": "publishDate",
//             "nodeComponent": "Var",
//             "title": "\u53d1\u8bc1\u65e5\u671f",
//             "example": "\u4e8c\u96f6\u4e8c\u4e09\u5e74\u56db\u6708"
//         },
//         {
//             "name": "editionLevel",
//             "nodeComponent": "Var",
//             "title": "\u5c4a\u522b\u548c\u7b49\u7ea7",
//             "example": "\u7b2c\u4e8c\u5c4a\u5e38\u52a1\u7406\u4e8b\u5355\u4f4d"
//         },
//         {
//             "name": "companyName",
//             "nodeComponent": "Var",
//             "title": "\u516c\u53f8\u540d\u79f0",
//             "example": "\u5e7f\u5dde\u5168\u601d\u4fe1\u606f\u79d1\u6280\u6709\u9650\u516c\u53f8"
//         }
//     ]
// };
//     var nodes = [
//     {
//         "id": "2p7ceb769n0",
//         "component": "Poster",
//         "value": {
//             "background": [
//                 {
//                     "status": "done",
//                     "fileId": "158",
//                     "name": "cert_template.png",
//                     "url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230223\/63f772e2551ca.png"
//                 }
//             ]
//         }
//     },
//     {
//         "id": "l7pckkaxbit",
//         "component": "Var",
//         "value": {
//             "fontSize": "14",
//             "align": "middle",
//             "fontWeight": "unset",
//             "fontStyle": "unset",
//             "text": "#publishDate",
//             "left": "492.515625",
//             "top": "362.28125",
//             "referWidth": "64.9375"
//         }
//     },
//     {
//         "id": "otmathbn72n",
//         "component": "Image",
//         "value": {
//             "img": [
//                 {
//                     "status": "done",
//                     "fileId": "159",
//                     "name": "cer.png",
//                     "url": "https:\/\/quansi-test.oss-cn-shenzhen.aliyuncs.com\/Uploads\/image\/20230223\/63f772f2bd524.png",
//                     "uid": "__AUTO__1677161209626_0__"
//                 }
//             ],
//             "width": "100",
//             "height": "100",
//             "left": "474.515625",
//             "top": "294.28125"
//         }
//     },
//     {
//         "id": "gwgslezcgak",
//         "component": "Var",
//         "value": {
//             "fontSize": "16",
//             "align": "middle",
//             "fontWeight": "bold",
//             "fontStyle": "unset",
//             "text": "#companyName",
//             "left": "298.515625",
//             "top": "225.28125",
//             "referWidth": "74.25"
//         }
//     },
//     {
//         "id": "ddzt0eiuph2",
//         "component": "Var",
//         "value": {
//             "fontSize": "16",
//             "align": "middle",
//             "fontWeight": "bold",
//             "fontStyle": "unset",
//             "text": "#editionLevel",
//             "left": "292.515625",
//             "top": "263.28125",
//             "referWidth": "90.25",
//             "color": "#e70d0d"
//         }
//     }
// ];

// const root = ReactDOM.createRoot(document.getElementById('qs-poster-app'));
// root.render(<App dom={document.getElementById('qs-poster-app')} options={options} nodes={nodes} />);

window['posterDesigner'] = (dom, options, nodes) => {
    ReactDOM.createRoot(dom).render(<App dom={dom} options={options} nodes={nodes} />)
}