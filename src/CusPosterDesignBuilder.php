<?php
namespace QsCusPoster;

use Qscmf\Lib\DBCont;
use Think\View;

class CusPosterDesignBuilder{

    protected $oss = false;
    protected $upload_action;
    protected $node_components = [];

    protected $poster_data = [];

    protected $post_url = '';

    protected $view;

    protected $nid;

    public function __construct(View $view){
        $this->view = $view;
    }

    public function setNIDByNode($module = MODULE_NAME, $controller = CONTROLLER_NAME, $action = 'index'){
        $module_ent = D('Node')->where(['name' => $module, 'level' => DBCont::LEVEL_MODULE, 'status' => DBCont::NORMAL_STATUS])->find();

        if(!$module_ent){
            E('setNIDByNode 传递的参数module不存在');
        }

        $controller_ent = D('Node')->where(['name' => $controller, 'level' => DBCont::LEVEL_CONTROLLER, 'status' => DBCont::NORMAL_STATUS, 'pid' => $module_ent['id']])->find();
        if(!$controller_ent){
            E('setNIDByNode 传递的参数controller不存在');
        }

        $action_ent = D('Node')->where(['name' => $action, 'level' => DBCont::LEVEL_ACTION, 'status' => DBCont::NORMAL_STATUS, 'pid' => $controller_ent['id']])->find();
        if(!$action_ent){
            E('setNIDByNode 传递的参数action不存在');
        }
        else{
            $this->nid = $action_ent['id'];
        }

        return $this;
    }

    public function addNodeComponent(string $name, string $node_component, string $title, string $example){
        $this->node_components[] = [
            'name' => $name,
            'nodeComponent' => $node_component,
            'title' => $title,
            'example' => $example
        ];
        return $this;
    }

    public function setPostUrl(string $post_url){
        $this->post_url = $post_url;
        return $this;
    }

    public function setOss(bool $oss){
        $this->oss = $oss;
        return $this;
    }

    public function setUploadAction(string $upload_action){
        $this->upload_action = $upload_action;
        return $this;
    }

    public function setPosterData(array $poster_data){
        $this->poster_data = $poster_data;
        return $this;
    }


    public function build(){
        $data = [];
        $data['postUrl'] = $this->post_url;
        $data['oss'] = $this->oss;
        $data['uploadAction'] = $this->upload_action;
        $data['nodeComponents'] = $this->node_components;

        $nodes = $this->poster_data;


        $this->view->assign('nid', $this->nid);
        $this->view->assign('options', $data);
        $this->view->assign('nodes', $nodes);
        $this->view->display(__DIR__ . '/view/cusposter.html');
    }
}