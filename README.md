# qs-cusform 自定义海报

可通过拖拉形式让用户零代码定义自己的海报

## 效果


## 安装

```shell
composer require quansitech/qs-cusposter
```

## 使用

+ 海报设计生成器

通过海报设计工作台，用户可自定义海报的背景图，显示的文字，组合图片，定义动态变量等构建想要的海报效果，保存即可提交海报的json数据

```php
// $this->view 为视图对象，一般是Controller类绑定的 view对象
$builder = new \QsCusPoster\CusPosterDesignBuilder\CusPosterDesignBuilder($this->view);
// 和ListBuilder的setNIDByNode方法一样，设置当前高亮的菜单
$builder->setNIDByNode("admin", "poster", "index")
//设置海报数据提交到的接口地址
->setPostUrl(U("/admin/poster/save"))
//是否要启动oss上传模块
->setOss(true)
//设置图片上传地址，如果启动oss，则填写上传策略的获取地址
->setUploadAction(U("/extends/aliyunOss/policyGet"))
//如果要编辑已有的海报，则需要通过这个方法传入海报数据
->setPosterData($posterData)
//添加自定义变量组件，第一个参数为变量键名， 第二个参数为展示名称， 第三个参数是预览用例
->addVarComponent('companyName', '公司名称', '全思科技')
->addVarComponent('companyType', '公司性质', '民营企业')
//生成海报设计生成器页面
->build()
```

+ 海报生成器

根据海报数据，生成海报的canvas图片，如果有自定义动态变量，要先设置变量值

```php
//传入海报数据，注意是数组格式
$builder = new \QsCusPoster\CusPosterBuilder($posterData);
//假如有使用自定义变量组件，通过该方法来设定变量值
$builder->setVarValue("companyName", "张三")
->setVarValue("companyType", "民营企业")
->build();
```

+ 前端通过js调用海报生成器

跟前面的php生成器接管了所有的生成操作不同，前端js调用则需要自己加载js组件，决定如何生成海报,灵活性更高

```php
<div id="poster"></div>
// 扩展自动将该js映射到/public/cusposter/poster-render.js，如没有特殊改动，则是直接使用该地址即可获取到js文件
<script src="/Public/cusposter/poster-render.js"></script>
<script>
    // $posterData可以用 CusPosterBuilder类的genData方法来生成
    var posterData = <?php echo json_encode($posterData, JSON_PRETTY_PRINT);?>;
    
    posterRender(document.getElementById('{$gid}'), posterData);
```


## 如何开发

+ 准备环境

node 16+ (更低的版本没有测试，最好使用16版本开发)

pnpm

+ 安装依赖
```shell
pnpm install
```

+ 开发新的海报组件

在src/components/nodes/目录下面新增组件，并且在index.js添加import

可参照其他的组件开发

自定义组件接口说明

```javascript
const newCompNode = observer(({node}) => {
    // 自定义组件的代码
});

newCompNode.propertySchema = {
    // 自定义组件属性的内容
    // 可参考已有的组件
};

newCompNode.setWrapStyle = (node) => {
    // 自定义wrap元素的属性
    // 可参考已有的组件
}

newCompNode.defaultValue = (node) => {
    // 往海报新增组件时, 给node对象的value属性添加的默认值
    // 如果propertySchema中有默认值，也会自动增加到node.value中
    // 该方法适用于需要动态设置的情况
}

newCompNode.resizeCallback = (node, width, height) => {
    // 组件大小改变时的回调
}

newCompNode.valueMap = {
    //属性组件一般采用value参数作为传值属性
    //但也有一些特殊的组件会采用其他的属性名称，例如 ImageUpload组件则是'defaultFileList'，这时就需要定义valueMap告诉程序其映射关系
    //img: 'defaultFileList'
}

//指定组件能否通过拖拉改变大小，默认是false
newCompNode.resize = true;



export const newComp = {
    // id 组件id号， label 值可以通过 options的nodeComponents[0].title定义
    Thumb: ({id, label}) => {
        return <div className="qs-poster-node-thumb" id={id} draggable={true}>
            // 此处放缩略图的 svg内容
            <span className="drag-title">{label}</span>
        </div>
    },
    Node: newCompNode,
    //像Var这种需要根据业务场景进行外部定义的组件，则需要设置成true
    custom: true,
    //自定义组件都需要设置成true，仅Poster这种系统组件才是false
    pure: true
}
```

