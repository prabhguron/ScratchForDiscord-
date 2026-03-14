import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'



//from what i understand type=source outpint type=target input
export function ActionNodeComponent({ data, id }: NodeProps) {

  const [keyword, setKeyword] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div>
      <Handle type="target" isConnectableStart={false} position={Position.Top}/>
      <p>Action</p>
      <input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          updateNodeData(id, { keyword: e.target.value })
        }}
        placeholder="Type keyword"
      />

        
      <Handle type="source" isConnectableEnd={false} position={Position.Bottom} />
    </div>
  )
}