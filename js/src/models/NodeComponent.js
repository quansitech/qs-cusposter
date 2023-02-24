import {makeAutoObservable} from "mobx"
import { getRegisteredNodeComponent } from "@/core"
import {uid} from "@/utils"

export class NodeComponent{
    
    id
    component
    componentName
    option

    constructor(component, componentName, option){
        makeAutoObservable(this)
        this.id = uid();
        this.component = typeof component === 'string' ? getRegisteredNodeComponent(component) : component;
        this.componentName = componentName;
        this.option = option;
    }
}