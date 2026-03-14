export abstract class BaseNode<T> {       
  id: string
  label: string
  version: number
  data: T               


//id is gonna be like node-1 that's just how react flow is 
//this is gonna be like the base Node for the rest of the nodes 
  constructor(id: string, label: string, version: number, data: T) {
    this.id = id
    this.label = label
    this.version = version
    this.data = data
  }


//this is for generating code because all nodes generate different coe
  abstract generateCode(): string

}
