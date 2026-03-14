import { useState, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, type Connection } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { EventNodeComponent } from './Ui/EventNodeComponent'
import { ActionNodeComponent } from './Ui/ActionNodeComponent';
import { CodeGenerator } from "./codeGenerator/CodeGenerator"
import { getOrderedChain } from './codeGenerator/getConnectedChains';

//nodeTypes tells React Flow which component to use for each node type
// key must match the 'type' field on the node object
const nodeTypes = {
  eventNode: EventNodeComponent,
  actionNode: ActionNodeComponent
}

function isValidConnection(connection: Connection): boolean {
  return connection.source !== connection.target
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

  const addActionNode = () => {
    const newNode = {
      id: crypto.randomUUID(),
      type: 'actionNode',
      position: { x: 100, y: 100 },
      data: { response: '' }
    }
    setNodes((prev) => [...prev, newNode])
    console.log('nodes after add:', nodes.length)
  }
  const generator = CodeGenerator.getInstance();
  const showCode = () => {
    generator.generateBotCode(nodes, edges)
    const boilerplate = CodeGenerator.getInstance().getDiscordBoilerplateCode()
    window.alert(boilerplate)
    console.log(getOrderedChain(nodes, edges))
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
        <button onClick={addActionNode}>+ Action Node</button>
        <button onClick={showCode}>Show Code</button>
        <button onClick={generator.testSave}>Save Project</button>
      </div>

      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          fitView
        />
      </div>
    </ReactFlowProvider>

  )
}