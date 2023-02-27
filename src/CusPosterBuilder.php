<?php
namespace QsCusPoster;

use Illuminate\Support\Str;

class CusPosterBuilder{

    protected array $data;
    protected array $var_map = [];
    //0 表示不设置，保持原图大小
    protected int $width = 0;
    protected int $height = 0;


    public function __construct(array $poster_data){
        $this->data = $poster_data;
    }

    public function setVarValue(string $var_name, string $var_value) : self{
        $this->var_map[$var_name] = $var_value;
        return $this;
    }

    public function setWidth($width){
        $this->width = $width;
        return $this;
    }

    public function setHeight($height){
        $this->height = $height;
        return $this;
    }

    public function genData() : array{
        $data = collect($this->data)->map(function($item){
            if($item['component'] == 'Var'){
                $var_name = substr($item['value']['text'], 1, strlen($item['value']['text']) - 1);
                $item['value']['text'] = $this->var_map[$var_name];
            }
            return $item;
        })->toArray();
        return $data;
    }

    public function build() : string{
        $data = $this->genData();

        $gid = Str::uuid()->getHex();
        $nodes = json_encode($data, JSON_PRETTY_PRINT);
        $width = $this->width;
        $height = $this->height;
        $js_src = asset('cusposter/poster-render.js');
        $html = <<<html
<div id="{$gid}">
</div>
<script src="{$js_src}"></script>
<script>
    var nodes = {$nodes};
    var width = {$width};
    var height = {$height};
    posterRender(document.getElementById('{$gid}'), nodes, width, height);
</script>
html;
        return $html;

    }
}