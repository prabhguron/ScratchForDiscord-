import {BaseNode} from './BaseNode'


//well oop doesnt let actionNode know /baby
export class ConditionNode extends BaseNode<{ checkType: string, value: string }>{

       constructor(id: string, label: string, version: number, data: { checkType: string, value: string })
 {
  
    super(id, label, version, data)  
}

    generateCode(): string {
            
        
    return `if ((interaction.member as GuildMember).roles.cache.map(r => r.name).includes('${this.data.value}')) {`;


    }


}
 