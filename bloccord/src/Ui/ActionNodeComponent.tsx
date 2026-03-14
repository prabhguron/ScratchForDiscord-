import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'



//from what i understand type=source outpint type=target input
export function ActionNodeComponent({ data, id }: NodeProps) {

  const [response, setResponse] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div>
      <Handle type="target" isConnectableStart={false} position={Position.Top}/>
      <p>Action</p>
      <input
        value={response}
        onChange={(e) => {
          setResponse(e.target.value)
          updateNodeData(id, { response: e.target.value })
        }}
        placeholder="Type keyword"
      />

        
      <Handle type="source" isConnectableEnd={false} position={Position.Bottom} />
    </div>
  )
}