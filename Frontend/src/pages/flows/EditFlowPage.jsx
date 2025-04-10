import React from "react";
import { useState, useEffect, useCallback } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getTemplates } from "../../api/templateApi"
import { getFlow, updateFlow } from "../../api/flowApi"
import FlowCanvas from "./flow-canvas"
import { prepareFlowForSave, validateFlow } from "./flow-utils"

function EditFlowPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [templates, setTemplates] = useState([])
  const [title, setTitle] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [initialNodes, setInitialNodes] = useState([])
  const [initialEdges, setInitialEdges] = useState([])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load templates first
        const templatesData = await fetchTemplates()
        setTemplates(templatesData)

        // Then load flow data
        const flowData = await fetchFlow()
        if (flowData) {
          setTitle(flowData.title)
          setInitialNodes(flowData.nodes)
          setInitialEdges(flowData.edges)
        }
      } catch (error) {
        console.error("Failed to load data:", error)
        setError("Failed to load data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [id])

  const fetchTemplates = async () => {
    try {
      const data = await getTemplates()
      return data
    } catch (error) {
      console.error("Failed to fetch templates:", error)
      throw error
    }
  }

  const fetchFlow = async () => {
    try {
      const flow = await getFlow(id)
      return flow
    } catch (error) {
      console.error("Failed to fetch flow:", error)
      throw error
    }
  }

  const handleSave = useCallback(
    async (nodes, edges) => {
      setError("")

      // Validate the flow
      const validationError = validateFlow(title, nodes)
      if (validationError) {
        setError(validationError)
        return
      }

      setSaving(true)

      try {
        // Prepare flow data for saving
        const flowData = prepareFlowForSave(title, nodes, edges)

        // Save to backend
        await updateFlow(id, flowData)
        navigate("/flows")
      } catch (err) {
        setError(err.message || "Failed to save flow. Please try again.")
      } finally {
        setSaving(false)
      }
    },
    [title, id, navigate],
  )

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
          <h1 className="text-3xl font-bold">Edit Flow</h1>
        </div>
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

        <FlowCanvas initialNodes={initialNodes} initialEdges={initialEdges} templates={templates} onSave={handleSave} />
      </div>
    </div>
  )
}

export default EditFlowPage
