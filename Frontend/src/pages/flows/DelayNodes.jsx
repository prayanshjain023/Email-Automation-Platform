import React from "react";
import { Handle, Position } from "reactflow"

function DelayNode({ id, data, selected }) {
  // Remove local state and use data from props directly

  const handleDelayChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    data.onChange(id, { delay: value })
  }

  const handleDelayUnitChange = (e) => {
    const unit = e.target.value
    data.onChange(id, { delayUnit: unit })
  }

  return (
    <div
      className={`p-4 w-[280px] bg-white rounded-lg border ${
        selected ? "border-blue-500 shadow-md" : "border-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center mb-3">
        <div className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">Wait/Delay</div>
      </div>

      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Wait Duration</label>
        <div className="flex items-center">
          <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden">
            <div className="p-2 bg-gray-50 border-r border-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-500"
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
            </div>
            <input
              type="number"
              min="1"
              value={data.delay || 60}
              onChange={handleDelayChange}
              className="flex-1 p-2 border-none focus:ring-0 text-sm"
            />
          </div>
          <select
            value={data.delayUnit || "minutes"}
            onChange={handleDelayUnitChange}
            className="ml-2 p-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
          </select>
        </div>
      </div>

      <div className="text-center mt-4 p-3 bg-purple-50 rounded-md">
        <div className="text-sm font-medium text-purple-800">
          Wait for {data.delay || 60} {data.delayUnit || "minutes"} before next step
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export default DelayNode
