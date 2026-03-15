import { useState, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, applyNodeChanges, applyEdgeChanges, addEdge, type Connection, Background, Controls, type Edge, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { EventNodeComponent } from './Ui/EventNodeComponent'
import { ActionNodeComponent } from './Ui/ActionNodeComponent';
import { ConditionNodeComponent } from './Ui/ConditionNodeComponent';
import './App.css';
import { CodeGenerator } from "./codeGenerator/CodeGenerator"
import { getOrderedChain } from './codeGenerator/getConnectedChains';

const nodeTypes = {
  eventNode: EventNodeComponent,
  actionNode: ActionNodeComponent,
  conditionNode: ConditionNodeComponent
}

function isValidConnection(connection: Edge | Connection): boolean {
  return connection.source !== connection.target
}

const initialNodes: Node[] = []
const initialEdges: Edge[] = []

let nodeCount = 0;

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [generatedCode, setGeneratedCode] = useState('');

  const addEventNode = () => {
    nodeCount++;
    const newNode = {
      id: crypto.randomUUID(),
      type: 'eventNode',
      position: { x: 300, y: 40 + (nodeCount * 20) },
      data: { keyword: '' }
    }
    setNodes((prev) => [...prev, newNode])
  }

  const addActionNode = () => {
    nodeCount++;
    const newNode = {
      id: crypto.randomUUID(),
      type: 'actionNode',
      position: { x: 300, y: 300 + (nodeCount * 20) },
      data: { response: '' }
    }
    setNodes((prev) => [...prev, newNode])
  }

  const addConditionNode = () => {
    nodeCount++;
    const newNode = {
      id: crypto.randomUUID(),
      type: 'conditionNode',
      position: { x: 300, y: 170 + (nodeCount * 20) },
      data: { checkType: 'role', value: '' }
    }
    setNodes((prev) => [...prev, newNode])
  }

  const generator = CodeGenerator.getInstance();

  const showCode = () => {
    generator.generateBotCode(nodes, edges)
    const chains = getOrderedChain(nodes, edges)
    if (chains.length > 0 && chains[0].length > 0) {
      const files = generator.project.getSourceFiles()
      const commandFile = files.find(f => f.getFilePath().includes('/commands/'))
      if (commandFile) {
        setGeneratedCode(commandFile.getFullText())
      } else {
        const boilerplate = generator.getDiscordBoilerplateCode()
        setGeneratedCode(boilerplate)
      }
    }
  }

  const saveCode = () => {
    generator.generateBotCode(nodes, edges)
    generator.save();
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode)
  }

  const onNodesChange = useCallback(
    (changes: any) => setNodes((prev) => applyNodeChanges(changes, prev)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((prev) => applyEdgeChanges(changes, prev)),
    [],
  );
  const onConnect = useCallback(
    (params: any) => setEdges((prev) => addEdge(params, prev)),
    [],
  );

  return (
    <ReactFlowProvider>
      <div style={{ display: 'flex', height: '100vh' }}>

        {/* Sidebar */}
        <div style={{
          width: '150px',
          minWidth: '150px',
          maxWidth: '150px',
          padding: '12px',
          background: '#fff',
          borderRight: '1px solid #e5e4e7',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <p style={{ fontSize: '13px', color: '#666', margin: '0 0 4px', fontWeight: 500 }}>Nodes</p>

          <button onClick={addEventNode} style={{
            background: '#EAF3DE',
            border: '1px solid #97C459',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            color: '#27500A',
            fontWeight: 600,
            fontSize: '12px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#639922', flexShrink: 0 }}></span>
            Event trigger
          </button>

          <button onClick={addConditionNode} style={{
            background: '#FAEEDA',
            border: '1px solid #EF9F27',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            color: '#633806',
            fontWeight: 600,
            fontSize: '12px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '2px', background: '#BA7517', transform: 'rotate(45deg)', flexShrink: 0 }}></span>
            Condition
          </button>

          <button onClick={addActionNode} style={{
            background: '#E6F1FB',
            border: '1px solid #85B7EB',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            color: '#0C447C',
            fontWeight: 600,
            fontSize: '12px',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#378ADD', flexShrink: 0 }}></span>
            Action
          </button>

          <div style={{ flex: 1 }}></div>

          <button onClick={saveCode} style={{
            background: '#1a1a1a',
            border: '1px solid #1a1a1a',
            borderRadius: '8px',
            padding: '8px 10px',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 500,
            color: '#fff'
          }}>Save project</button>
        </div>

        {/* Canvas */}
        <div style={{ flex: 1 }}>
          <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            isValidConnection={isValidConnection}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>

        {/* Code Panel */}
        <div style={{
          width: '280px',
          minWidth: '280px',
          maxWidth: '280px',
          background: '#fff',
          borderLeft: '1px solid #e5e4e7',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{
            padding: '10px 14px',
            borderBottom: '1px solid #e5e4e7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <p style={{ fontSize: '13px', fontWeight: 500, margin: 0, color: '#333' }}>Generated code</p>
            <button onClick={generatedCode ? copyCode : showCode} style={{
              background: '#f4f3ec',
              border: '1px solid #d3d1c7',
              borderRadius: '6px',
              padding: '3px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              color: '#555'
            }}>{generatedCode ? 'Copy' : 'Generate'}</button>
            <button onClick={showCode} style={{
              background: '#f4f3ec',
              border: '1px solid #d3d1c7',
              borderRadius: '6px',
              padding: '3px 10px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 500,
              color: '#555',
              display: `${generatedCode ? 'block' : 'none'}`
            }}>{'Generate'}</button>
          </div>
          <div style={{
            flex: 1,
            padding: '12px 14px',
            overflow: 'auto'
          }}>
            {generatedCode ? (
              <pre style={{
                fontFamily: 'ui-monospace, Consolas, monospace',
                fontSize: '11px',
                lineHeight: '1.6',
                margin: 0,
                color: '#444',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}>{generatedCode}</pre>
            ) : (
              <p style={{ fontSize: '12px', color: '#aaa', margin: '40px 0', textAlign: 'center' }}>
                Connect nodes and click Generate to see your Discord bot code
              </p>
            )}
          </div>
        </div>

      </div>
    </ReactFlowProvider>
  )
}