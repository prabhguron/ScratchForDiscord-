import {BaseNode} from './BaseNode'


//well oop doesnt let actionNode know /baby
export class ConditionNode extends BaseNode<{ checkType: string, value: string }>{

       constructor(id: string, label: string, version: number, data: { checkType: string, value: string })
 {
  
    super(id, label, version, data)  
}

    generateCode(): string {
            
        
    return `if (interaction.member.roles.cache.some(role => role.name === '${this.data.value}')) {`


    }


}
 