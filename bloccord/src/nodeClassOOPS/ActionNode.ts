import {BaseNode} from './BaseNode'


//well oop doesnt let actionNode know /baby
export class ActionNode extends BaseNode<{response:string}>{





       constructor(id: string, label: string, version: number, data: { response: string }) {
  
    super(id, label, version, data)  
}

    generateCode(): string {

        
        return `message.reply('${this.data.response}')`

    }


}
