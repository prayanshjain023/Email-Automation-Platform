import React from "react";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { getFlows, getFlow, runFlow } from "../../api/flowApi"

function RunFlowPage() {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const flowId = searchParams.get("id")

  const [flows, setFlows] = useState([])
  const [selectedFlowId, setSelectedFlowId] = useState(flowId || "")
  const [selectedFlow, setSelectedFlow] = useState(null)
  const [recipientEmail, setRecipientEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchFlows()
  }, [])

  useEffect(() => {
    if (selectedFlowId) {
      fetchFlowDetails(selectedFlowId)
    } else {
      setSelectedFlow(null)
    }
  }, [selectedFlowId])

  const fetchFlows = async () => {
    try {
      const data = await getFlows()
      setFlows(data)

      // If no flow is selected but we have flows, select the first one
      if (!selectedFlowId && data.length > 0) {
        setSelectedFlowId(data[0]._id)
      }

      setLoading(false)
    } catch (error) {
      console.error("Failed to fetch flows:", error)
      setError("Failed to load flows. Please try again.")
      setLoading(false)
    }
  }

  const fetchFlowDetails = async (id) => {
    try {
      const flow = await getFlow(id)
      setSelectedFlow(flow)
    } catch (error) {
      console.error("Failed to fetch flow details:", error)
      setError("Failed to load flow details. Please try again.")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!selectedFlowId) {
      setError("Please select a flow")
      return
    }

    if (!recipientEmail) {
      setError("Recipient email is required")
      return
    }

    setRunning(true)

    try {
      await runFlow(selectedFlowId, recipientEmail)
      setSuccess(true)
      setRecipientEmail("")
    } catch (err) {
      setError(err.message || "Failed to run flow. Please try again.")
    } finally {
      setRunning(false)
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
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
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
        <h1 className="text-3xl font-bold">Run Flow</h1>
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

      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-green-700 text-sm">
            Flow started successfully! Emails will be sent according to the flow schedule.
          </p>
        </div>
      )}

      {flows.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-100">
          <h3 className="text-lg font-medium text-gray-900 mb-4">No flows available</h3>
          <p className="text-gray-500 mb-6">You need to create a flow before you can run it.</p>
          <Link
            to="/flows/new"
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Create Flow
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Select Flow</h2>
            <div className="space-y-2">
              {flows.map((flow) => (
                <button
                  key={flow._id}
                  onClick={() => setSelectedFlowId(flow._id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedFlowId === flow._id
                      ? "bg-purple-100 border-purple-200 border"
                      : "hover:bg-gray-50 border border-gray-100"
                  }`}
                >
                  <div className="font-medium">{flow.title}</div>
                  <div className="text-sm text-gray-500">{flow.nodes.length} nodes</div>
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 bg-white p-6 rounded-lg border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">Run Flow</h2>

            {selectedFlow ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Selected Flow: {selectedFlow.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                  This flow contains {selectedFlow.nodes?.length || 0} email{(selectedFlow.nodes?.length || 0) !== 1 ? "s" : ""} that will be sent in sequence.
                  </p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Recipient Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="recipient@example.com"
                  />
                  <p className="text-xs text-gray-500">The email address that will receive all emails in this flow.</p>
                </div>

                <button
                  type="submit"
                  disabled={running}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {running ? "Starting Flow..." : "Run Flow"}
                </button>
              </form>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Select a flow from the list to continue</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RunFlowPage

