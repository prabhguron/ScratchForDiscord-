import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'



//from what i understand type=source outpint type=target input
export function ActionNodeComponent({ id }: NodeProps) {

  const [response, setResponse] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div style={{
      background: '#E6F1FB',
      border: '1px solid #85B7EB',
      borderRadius: '8px',
      padding: '12px 16px',
      minWidth: '180px'
                      }}>
      <Handle type="target" isConnectableStart={false} position={Position.Top}/>
      <p style={{ fontSize: '12px', color: '#185FA5', margin: '0 0 8px', fontWeight: 500 }}>Response Message</p>
      <input
        value={response}
        required
        onChange={(e) => {
          setResponse(e.target.value)
          updateNodeData(id, { response: e.target.value })
        }}
        placeholder="Type response"
      />

        
      <Handle type="source" isConnectableEnd={false} position={Position.Bottom} />
    </div>
  )
}