import React from "react";
import { useCallback, useRef, useState, useEffect } from "react"
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
} from "reactflow"
import "reactflow/dist/style.css"
import EmailNode from "./EmailNode"
import DelayNode from "./DelayNodes"
import LeadSourceNode from "./LeadSourceNode"
import { createNode } from "./flow-utils"

// Define node types
const nodeTypes = {
  emailNode: EmailNode,
  delayNode: DelayNode,
  leadSourceNode: LeadSourceNode,
}

function FlowCanvas({ initialNodes = [], initialEdges = [], templates = [], onSave, readOnly = false }) {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Store templates in a ref to avoid dependency changes
  const templatesRef = useRef(templates)
  useEffect(() => {
    templatesRef.current = templates
  }, [templates])

  // Handle node data changes - defined outside useEffect to avoid recreation
  const handleNodeDataChange = useCallback(
    (nodeId, newData) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            // Create a new data object with the updated values
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            }
          }
          return node
        }),
      )
    },
    [setNodes],
  )

  // Initialize nodes and edges only once when component mounts or props change
  useEffect(() => {
    // Process initial nodes to add onChange handler and templates
    const processedNodes = initialNodes.map((node) => {
      // Create a new data object to avoid mutating the original
      const newData = { ...node.data, onChange: handleNodeDataChange }

      // Add templates only to email nodes
      if (node.type === "emailNode") {
        newData.templates = templatesRef.current
      }

      return { ...node, data: newData }
    })

    setNodes(processedNodes)
    setEdges(initialEdges)
  }, [initialNodes, initialEdges, setNodes, setEdges, handleNodeDataChange])

  // Handle connection between nodes
  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges],
  )

  // Handle drag over for drag and drop functionality
  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  // Handle drop for drag and drop functionality
  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const nodeType = event.dataTransfer.getData("application/reactflow")
      if (!nodeType) return

      const newNode = createNode(nodeType, position, templatesRef.current, handleNodeDataChange)
      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, setNodes, handleNodeDataChange],
  )

  // Add a new node of specified type
  const addNewNode = useCallback(
    (nodeType) => {
      const position = { x: 100, y: 100 }

      // If we have nodes, position the new one below the last one
      if (nodes.length > 0) {
        const lastNode = nodes[nodes.length - 1]
        position.x = lastNode.position.x
        position.y = lastNode.position.y + 150
      }

      const newNode = createNode(nodeType, position, templatesRef.current, handleNodeDataChange)
      setNodes((nds) => nds.concat(newNode))
    },
    [nodes, setNodes, handleNodeDataChange],
  )

  // Handle save
  const handleSave = useCallback(() => {
    if (typeof onSave === "function") {
      onSave(nodes, edges)
    }
  }, [nodes, edges, onSave])

  // Function to start drag for node palette
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div className="flex flex-col h-[600px]">
      {!readOnly && (
        <div className="bg-gray-50 p-3 border-b border-gray-200 flex gap-2 overflow-x-auto">
          <div
            className="p-2 bg-blue-50 border border-blue-200 rounded-md cursor-move flex items-center"
            onDragStart={(e) => onDragStart(e, "emailNode")}
            draggable
          >
            <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-2">Cold Email</div>
            <span className="text-sm">Drag to add</span>
          </div>
          <div
            className="p-2 bg-purple-50 border border-purple-200 rounded-md cursor-move flex items-center"
            onDragStart={(e) => onDragStart(e, "delayNode")}
            draggable
          >
            <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
              Wait/Delay
            </div>
            <span className="text-sm">Drag to add</span>
          </div>
          <div
            className="p-2 bg-green-50 border border-green-200 rounded-md cursor-move flex items-center"
            onDragStart={(e) => onDragStart(e, "leadSourceNode")}
            draggable
          >
            <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full mr-2">
              Lead Source
            </div>
            <span className="text-sm">Drag to add</span>
          </div>
        </div>
      )}

      <div className="flex-grow border border-gray-200 rounded-lg" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode={["Backspace", "Delete"]}
          multiSelectionKeyCode={["Control", "Meta"]}
          selectionKeyCode={["Shift"]}
          readOnly={readOnly}
        >
          <Background />
          <Controls />
          <MiniMap />
          {!readOnly && (
            <Panel position="top-right" className="flex gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => addNewNode("emailNode")}
                  className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email
                </button>
                <button
                  onClick={() => addNewNode("delayNode")}
                  className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Delay
                </button>
                <button
                  onClick={() => addNewNode("leadSourceNode")}
                  className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Lead Source
                </button>
              </div>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                Save
              </button>
            </Panel>
          )}
        </ReactFlow>
      </div>
    </div>
  )
}

// Wrap component with ReactFlowProvider
export default function FlowCanvasWrapper(props) {
  return (
    <ReactFlowProvider>
      <FlowCanvas {...props} />
    </ReactFlowProvider>
  )
}
