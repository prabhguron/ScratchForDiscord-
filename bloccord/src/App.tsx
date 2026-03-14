import { useState, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { EventNodeComponent } from './Ui/EventNodeComponent'

//nodeTypes tells React Flow which component to use for each node type
// key must match the 'type' field on the node object
const nodeTypes = {
  eventNode: EventNodeComponent
}

// empty to start nodes are added via buttons
const initialNodes: never[] = []
const initialEdges: never[] = []

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  //button when this clicked we addnos
const addEventNode = () => {
  const newNode = {
    id: crypto.randomUUID(),
    type: 'eventNode',
    position: { x: 100, y: 100 },
    data: { keyword: '' }
  }
  setNodes((prev) => [...prev, newNode])
  console.log('nodes after add:', nodes.length)
}

  const onNodesChange = useCallback(
    (changes) => setNodes((prev) => applyNodeChanges(changes, prev)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((prev) => applyEdgeChanges(changes, prev)),
    [],
  );
  const onConnect = useCallback(
    (params) => setEdges((prev) => addEdge(params, prev)),
    [],
  );

  return (
    <ReactFlowProvider>
      {/* toolbar sits above canvas using absolute positioning */}
      <div style={{ position: 'absolute', zIndex: 10, padding: '10px', display: 'flex', gap: '8px' }}>
        <button onClick={addEventNode}>+ Event Node</button>
      </div>

      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        />
      </div>
    </ReactFlowProvider>
  )
}