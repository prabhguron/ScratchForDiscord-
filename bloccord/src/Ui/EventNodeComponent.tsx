import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

//from what i understand type=source outpint type=target input
export function EventNodeComponent({ id }: NodeProps) {

  const [keyword, setKeyword] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div style={{
  background: '#EAF3DE',
  border: '1px solid #97C459',
  borderRadius: '8px',
  padding: '12px 16px',
  minWidth: '180px'
}}>

      <p style={{ fontSize: '12px', color: '#3B6D11', margin: '0 0 8px', fontWeight: 500 }}>
        Event trigger
        Data Event Please type your keyword command
        </p>
      <input
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          updateNodeData(id, { keyword: e.target.value })
        }}
        placeholder="Type command e.g. Hi"
      />


      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}