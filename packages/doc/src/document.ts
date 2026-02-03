import { Attributes, Node, id } from "./node";

export class Document {
    id: id = crypto.randomUUID();
    
    _order: id[] = [];
    attributes?: Attributes
    constructor(){}

    get order(){
        const order: Node[] = [];
        this._order.forEach(id =>{
            const node = Node.registry.get(id);
            if(node) order.push(node)
    })
        return order;
    }


}