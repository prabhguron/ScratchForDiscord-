import { BaseNode } from './BaseNode'

export class EventNode extends BaseNode<{ keyword: string }> {

    //calls  BaseNode
    //Justice if you could please use a formatter mine doesnt work
    constructor(id: string, label: string, version: number, data: { keyword: string }) {

        super(id, label, version, data)
    }

    //if like the user types /baby this and we can later pass this into action node 
    generateCode() {
        return this.data.keyword;
    }





}