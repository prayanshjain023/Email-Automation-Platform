import React,{ useEffect, useState, useCallback, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReactFlow, { Background, Controls, MiniMap, addEdge, useNodesState, useEdgesState, Panel } from "reactflow"
import "reactflow/dist/style.css"
import { getTemplates } from "../../api/templateApi"
import { createFlow } from "../../api/flowApi"
import EmailNode from "../flows/EmailNode"
import CustomEdgeComponent from "../../components/edges/CustomEdge"

const nodeTypes = {
  emailNode: EmailNode,
}

const edgeTypes = {
  customEdge: CustomEdgeComponent,
}

function NewFlowPage() {
  const navigate = useNavigate()
  const [templates, setTemplates] = useState([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates()
      setTemplates(data)
      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch templates:", error)
      setError("Failed to load templates. Please try again.")
      setLoading(false)
    }
  }

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges],
  )

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = "move"
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      if (!reactFlowWrapper.current || !reactFlowInstance) return

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      })

      const newNode = {
        id: `email-${Date.now()}`,
        type: "emailNode",
        position,
        data: {
          templates,
          selectedTemplate: null,
          delay: 0,
          label: "Email Node",
          onChange: (nodeId, data) => {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === nodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      ...data,
                    },
                  }
                }
                return node
              }),
            )
          },
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance, templates, setNodes],
  )

  const addNewNode = useCallback(() => {
    const position = { x: 100, y: 100 }

    // If we have nodes, position the new one below the last one
    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1]
      position.x = lastNode.position.x
      position.y = lastNode.position.y + 150
    }

    const newNode = {
      id: `email-${Date.now()}`,
      type: "emailNode",
      position,
      data: {
        templates,
        selectedTemplate: null,
        delay: 0,
        label: "Email Node",
        onChange: (nodeId, data) => {
          setNodes((nds) =>
            nds.map((node) => {
              if (node.id === nodeId) {
                return {
                  ...node,
                  data: {
                    ...node.data,
                    ...data,
                  },
                }
              }
              return node
            }),
          )
        },
      },
    }

    setNodes((nds) => nds.concat(newNode))
  }, [nodes, templates, setNodes])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) {
      setError("Flow title is required")
      return
    }

    if (nodes.length === 0) {
      setError("Your flow must contain at least one email node")
      return
    }

    setSaving(true)

    try {
      // Prepare nodes for saving (remove onChange function)
      const nodesToSave = nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: undefined,
          templates: undefined,
        },
      }))

      await createFlow({
        title,
        nodes: nodesToSave,
        edges,
      })

      navigate("/flows")
    } catch (err) {
      setError(err.message || "Failed to save flow. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/flows" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-3xl font-bold">Create Flow</h1>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          {saving ? "Saving..." : "Save Flow"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <div className="mb-6">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Flow Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Onboarding Sequence"
          />
        </div>

        <div className="h-[600px] border border-gray-200 rounded-lg" ref={reactFlowWrapper}>
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
            edgeTypes={edgeTypes}
            fitView
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="top-right">
              <button
                onClick={addNewNode}
                className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Node
              </button>
            </Panel>
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}

export default NewFlowPage

