<?php
namespace QsCusPoster;

use Illuminate\Support\Str;

class CusPosterBuilder{

    protected array $data;
    protected array $var_map = [];

    public function __construct(array $poster_data){
        $this->data = $poster_data;
    }

    public function setVarValue(string $var_name, string $var_value) : self{
        $this->var_map[$var_name] = $var_value;
        return $this;
    }

    public function build() : string{
        $data = collect($this->data)->map(function($item){
            if($item['component'] == 'Var'){
                $var_name = substr($item['value']['text'], 1, strlen($item['value']['text']) - 1);
                $item['value']['text'] = $this->var_map[$var_name];
            }
            return $item;
        })->toArray();

        $gid = Str::uuid()->getHex();
        $nodes = json_encode($data, JSON_PRETTY_PRINT);
        $js_src = asset('cusposter/poster-render.js');
        $html = <<<html
<div id="{$gid}">
</div>
<script src="{$js_src}"></script>
<script>
    var nodes = {$nodes};
    posterRender(document.getElementById('{$gid}'), nodes);
</script>
html;
        return $html;

    }
}