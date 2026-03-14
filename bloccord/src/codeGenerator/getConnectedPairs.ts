import type { Node, Edge } from '@xyflow/react'

export function getConnectedPairs(nodes: Node[], edges: Edge[]): { source: Node | undefined, target: Node | undefined }[] {
  return edges.map(edge => {
    const sourceNode = nodes.find(n => n.id === edge.source)
    const targetNode = nodes.find(n => n.id === edge.target)
    return { source: sourceNode, target: targetNode }
  })
}