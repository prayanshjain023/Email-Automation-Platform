import React from "react";
import { Handle, Position } from "reactflow"

function LeadSourceNode({ id, data, selected }) {
  // Remove local state and use data from props directly

  const handleSourceNameChange = (e) => {
    const value = e.target.value
    data.onChange(id, { sourceName: value })
  }

  const handleDescriptionChange = (e) => {
    const value = e.target.value
    data.onChange(id, { description: value })
  }

  return (
    <div
      className={`p-4 w-[280px] bg-white rounded-lg border ${
        selected ? "border-blue-500 shadow-md" : "border-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center mb-3">
        <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Lead Source</div>
      </div>

      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Source Name</label>
        <input
          type="text"
          value={data.sourceName || ""}
          onChange={handleSourceNameChange}
          placeholder="e.g., Website, LinkedIn, Referral"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data.description || ""}
          onChange={handleDescriptionChange}
          placeholder="Add details about this lead source..."
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
          rows={3}
        />
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export default LeadSourceNode
