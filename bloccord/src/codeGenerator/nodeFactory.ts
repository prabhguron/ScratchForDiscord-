import { ActionNode, EventNode, ConditionNode } from "../nodeClassOOPS"
import type { Node, Edge } from '@xyflow/react'
import { BaseNode } from "../nodeClassOOPS/BaseNode"


export function createNodeInstance(flowNode: Node): BaseNode<any> {


    if(flowNode.type == "actionNode"){

        const myThing = new ActionNode(flowNode.id, "action",1,flowNode.data as any)
            return myThing
    }

     if(flowNode.type == "eventNode"){

        const myThing = new EventNode(flowNode.id, "event", 1, flowNode.data as any)
        return myThing

    }


     if(flowNode.type == "conditionNode"){

        const myThing = new ConditionNode(flowNode.id, "conditionalNode",1,flowNode.data as any)

        return myThing
    }
    else{
 throw new Error(`Unknown node type: ${flowNode.type}`)}




}