import { UploadOutlined } from '@ant-design/icons'
import { Upload, Button } from "antd"
import React from "react"


const CommonImageUpload = ({onChange, defaultFileList, maxCount, node}) => {
    const [fileList, setFileList] = React.useState(defaultFileList || []);

    React.useEffect(() => {
        setFileList(defaultFileList);
    }, [defaultFileList])

    const action = node.designer?.options?.uploadAction;

    const handleChange = (info) => {

        if(info.file?.response?.status == 0){
            const file = {
                uid: info.file.uid,
                name: info.file.name,
                status: 'error',
                response: info.file.response.info
            }
            setFileList([file]);
            onChange && onChange(node, [file]);
        }
        else{
            setFileList(info.fileList);

            if (info.file.status === 'done') {
                onChange && onChange(node, [{ status: 'done' ,fileId: info.file.response.file_id, name: info.file.response.title, url: info.file.response.url }]);
            }

            if(info.file.status === 'removed'){
                onChange && onChange(node, []);
            }
        }

    };

    return <Upload 
        action={action}
        onChange={handleChange}
        fileList={ fileList }
        maxCount={maxCount || 1}
    >
        <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
};

const OssImageUpload = ({onChange, defaultFileList, maxCount, node}) => {
    const [fileList, setFileList] = React.useState(defaultFileList || []);
    const [ossData, setOssData] = React.useState();

    React.useEffect(() => {
        setFileList(defaultFileList);
    }, [defaultFileList])

    const init = async (title) => {
        const url = !!title ? `${node.designer.options.uploadAction}?title=${encodeURIComponent(title)}` : node.designer.options.uploadAction;
        const res = await fetch(url);
        const data = await res.json();
        setOssData(data);
    }

    React.useEffect(() => {
        init();
    }, []);

    const beforeUpload = async (file) => {
        
        if(!ossData){
            return false;
        } 
        await init(file.name);

        const suffix = file.name.slice(file.name.lastIndexOf('.'));
        file.url = ossData.host + '/' + ossData.dir + suffix;
        file.key = ossData.dir + suffix;
        return file;
    }

    const handleChange = (info) => {

        if(info.file?.response?.status == 0){
            const file = {
                uid: info.file.uid,
                name: info.file.name,
                status: 'error',
                response: info.file.response.info
            }
            setFileList([file]);
            onChange && onChange(node, [file]);
        }
        else{
            setFileList(info.fileList);

            if (info.file.status === 'done') {
                onChange && onChange(node, [{ status: 'done' ,fileId: info.file.response.file_id, name: info.file.originFileObj.name, url: info.file.response.file_url }]);
            }

            if(info.file.status === 'removed'){
                onChange && onChange(node, []);
            }
        }

        
    };

    const getExtraData = file => {
        const extra = {
          key: file.key,
          OSSAccessKeyId: ossData.accessid,
          policy: ossData.policy,
          Signature: ossData.signature,
          success_action_status: 200,
          callback: ossData.callback
        };
    
        if(ossData.callback_var){
            const var_obj = JSON.parse(ossData.callback_var);
            for (let key in var_obj) {
              extra[key] = var_obj[key];
            }
        }
        if (ossData.oss_meta) {
          const meta_obj = JSON.parse(ossData.oss_meta);
          for (let meta in meta_obj) {
            extra[meta] = meta_obj[meta];
          }
        }
    
        return extra;
    };

    const uploadProps = {
        name: 'file',
        fileList,
        action: ossData?.host,
        maxCount: maxCount || 1,
        onChange: handleChange,
        data: getExtraData,
        beforeUpload,
    };

    return !!ossData && <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>上传</Button>
    </Upload>
}


export const ImageUpload = ({onChange, defaultFileList, maxCount, node}) => {
    
    const render = () => {
        if(node.designer?.options?.oss){
            return <OssImageUpload onChange={onChange} defaultFileList={defaultFileList} maxCount={maxCount} node={node}></OssImageUpload>
        }
        else{
            return <CommonImageUpload onChange={onChange} defaultFileList={defaultFileList} maxCount={maxCount} node={node}></CommonImageUpload>
        }
    }

    return render();
}
