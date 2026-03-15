import { Handle, Position, useReactFlow, type NodeProps } from '@xyflow/react'
import { useState } from 'react'

//from what i understand type=source outpint type=target input
export function ConditionNodeComponent({ data, id }: NodeProps) {

  const [checkType, setCheckType] = useState('')
  const [value, setValue] = useState('')
  const { updateNodeData } = useReactFlow()
  return (
    <div style={{
              background: '#FAEEDA',
          border: '1px solid #EF9F27',
          borderRadius: '8px',
          padding: '12px 16px',
           minWidth: '180px'
            }}>
<Handle type="target" position={Position.Top}/>
      <p style={{ fontSize: '12px', color: '#854F0B', margin: '0 0 8px', fontWeight: 500 }}>Check condition Conditional Statements choose</p>
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