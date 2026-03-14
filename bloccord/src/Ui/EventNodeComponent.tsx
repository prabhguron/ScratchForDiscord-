import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

//from what i understand type=source outpint type=target input
export function EventNodeComponent({ data, id }: NodeProps) {

const [keyword, setKeyword] = useState('')
const { updateNodeData } = useReactFlow()


  
    return (
        
    <div>
        
            <p>Data Event Please type your keyword command</p>
            <input 
                value={keyword}
                onChange={(e) => {
                setKeyword(e.target.value)
                updateNodeData(id, { keyword: e.target.value })
                }}
                placeholder="Type command e.g. /baby" 
                />
        
        
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
}