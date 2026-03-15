import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

//from what i understand type=source outpint type=target input
export function ConditionNodeComponent({ data, id }: NodeProps) {

  const [checkType, setCheckType] = useState('')
  const [value, setValue] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div>
<Handle type="target" position={Position.Top}/>
      <p>Conditional Statements choose</p>
           <select value={checkType} onChange={(e) => {
                setCheckType(e.target.value)
                updateNodeData(id, { checkType: e.target.value } )
                }}>
                <option value="role">Role</option>
                <option value="server">Server</option>
            </select>
            <input
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value)
                    updateNodeData(id, { value: e.target.value })
                          }}/>
        <Handle type="source" position={Position.Bottom}/>

    </div>
  )
}