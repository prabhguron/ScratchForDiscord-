import { Handle, Position, useNodeConnections, useReactFlow, type NodeConnection, type NodeProps } from '@xyflow/react'
import { useEffect, useState } from 'react'
import { createNodeInstance } from '../codeGenerator/nodeFactory'

//from what i understand type=source output type=target input
export function ConditionNodeComponent({ data, id }: NodeProps) {

  const [checkType, setCheckType] = useState(data.checkType ?? '')
  const [value, setValue] = useState(data.value ?? '')
  const { updateNodeData, getNode } = useReactFlow()

  const leftConnections: NodeConnection[] = useNodeConnections({ handleType: 'source', handleId: 'left' })
  const rightConnections: NodeConnection[] = useNodeConnections({ handleType: 'source', handleId: 'right' })

  useEffect(() => {
    if (leftConnections && leftConnections.length > 0 && leftConnections[0].target) {
      const leftNode = getNode(leftConnections[0].target)
      updateNodeData(id, { left: leftNode ? createNodeInstance(leftNode) : undefined })
    } else {
      updateNodeData(id, { left: undefined })
    }
  }, [leftConnections, getNode, id, updateNodeData])

  useEffect(() => {
    if (rightConnections && rightConnections.length > 0 && rightConnections[0].target) {
      const rightNode = getNode(rightConnections[0].target)
      updateNodeData(id, { right: rightNode ? createNodeInstance(rightNode) : undefined })
    } else {
      updateNodeData(id, { right: undefined })
    }
  }, [rightConnections, getNode, id, updateNodeData])

  useEffect(() => {
    // Keep local state in sync with node data when the node is initially created or data is loaded.
    setCheckType(data.checkType ?? '')
    setValue(data.value ?? '')
  }, [data.checkType, data.value])

  return (
    <div style={{
      background: '#FAEEDA',
      border: '1px solid #EF9F27',
      borderRadius: '8px',
      padding: '12px 16px',
      minWidth: '180px'
    }}>
      <Handle type="target" position={Position.Top} id="top" />
      <p style={{ fontSize: '12px', color: '#854F0B', margin: '0 0 8px', fontWeight: 500 }}>Check condition Conditional Statements choose</p>
      <select value={`${checkType}`} onChange={(e) => {
        setCheckType(e.target.value)
        updateNodeData(id, { checkType: e.target.value })
      }}>
        <option value="role">Role</option>
        <option value="server">Server</option>
      </select>
      <input
        value={`${value}`}
        onChange={(e) => {
          setValue(e.target.value)
          updateNodeData(id, { value: e.target.value })
        }} />

      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  )
}