import {BaseNode} from './BaseNode'


//well oop doesnt let actionNode know /baby
export class ActionNode extends BaseNode<{response:string}>{

       constructor(id: string, label: string, version: number, data: { response: string }) {
  
    super(id, label, version, data)  
}

    generateCode(): string {
        if (this.data.response.length == 0) {}
        return `await interaction.reply('${this.data.response}');`

    }


}
