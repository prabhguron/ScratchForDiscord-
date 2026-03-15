import { BaseNode } from './BaseNode'


export class ConditionNode extends BaseNode<{ checkType: string, value: string, left?: BaseNode<any>, right?: BaseNode<any> }> {

    constructor(id: string, label: string, version: number, data: { checkType: string, value: string, left?: BaseNode<any>, right?: BaseNode<any> }) {

        super(id, label, version, data)
    }

    generateCode(): string {
        console.log(this.data.left, this.data.right);
        if (this.data.left == undefined) {
            return '';
        }

        let code = `if ((interaction.member as GuildMember).roles.cache.map(r => r.name).includes('${this.data.value}')) {`;
        code += `\n${this.data.left.generateCode()}\n}`;
        if (this.data.right != undefined) {
            code += `else {\n${this.data.right.generateCode()}\n}\n`
        }

        return code;

    }


}
