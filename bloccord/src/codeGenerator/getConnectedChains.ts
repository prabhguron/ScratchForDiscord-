import type { Node, Edge } from '@xyflow/react'

export function getOrderedChain(nodes: Node[], edges: Edge[]): Node[][] {
  // find all starting points
  const eventNodes = nodes.filter(n => n.type === 'eventNode')

  // build a chain for each event node
  return eventNodes.map(startNode => {
    const chain: Node[] = [startNode]
    let currentNode = startNode

    while (true) {
      const nextEdge = edges.find(e => e.source === currentNode.id)
      if (!nextEdge) break
      const nextNode = nodes.find(n => n.id === nextEdge.target)
      if (!nextNode) break
      chain.push(nextNode)
      currentNode = nextNode
    }

    return chain
  })
}

//  how you can use chains[0].forEach(node => {
//   if (node.type === 'eventNode') {
//     // generate event code
//   } else if (node.type === 'actionNode') {
//     // generate action code  
//   } else if (node.type === 'conditionNode') {
//     // generate if/else code
//   }
// })
