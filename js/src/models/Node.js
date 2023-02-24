import { makeAutoObservable } from "mobx"
import { uid, clonePropertySchema } from "@/utils"

export class Node{

    id
    designer
    selected = false
    value = {}
    nodeComponent
    component
    componentName
    propertySchema

    constructor(nodeComponent, id, value){
        makeAutoObservable(this)

        this.id = id || uid();

        this.nodeComponent = nodeComponent;
        this.component = this.nodeComponent.component.pure ? this.nodeComponent.component['Node'] : this.nodeComponent.component;
        this.componentName = this.nodeComponent.componentName;
        this.propertySchema = this.component?.propertySchema ? clonePropertySchema(this.component?.propertySchema) : [];

        this.setValue(value || {});
        
    }

    bindDesigner(designer){
        this.designer = designer;
    }

    setSelected(){
        this.selected = true;
    }

    unSelected(){
        this.selected = false;
    }

    setValue(value){
        const valMap = {};
        Object.keys(value).map(k => {
            if(this.component?.valueMap && this.component?.valueMap[k]){
                valMap[k] = this.component?.valueMap[k];
            }
            else{
                valMap[k] = 'value';
            }
        })

        this.propertySchema = this.propertySchema.map(item => {
            if(valMap[item.name]){
                item.props[valMap[item.name]] = value[item.name];
            }
            return item;
        });
        this.value = value;
    }

    delete(){
        if(this.component?.delete){
            this.component.delete(this);
        }
        else{
            this.designer.clear(this.id);
        }
    }

    toJSON(){
        return {
            id: this.id,
            component: this.componentName,
            value: this.value
        }
    }


}