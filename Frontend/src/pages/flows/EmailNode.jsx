// import React,{ useState, useEffect } from "react";
// import { Handle, Position } from "reactflow";

// function EmailNode({ id, data }) {
//   const [selectedTemplate, setSelectedTemplate] = useState(data.selectedTemplate);
//   const [delay, setDelay] = useState(data.delay || 0);
//   const [delayUnit, setDelayUnit] = useState(data.delayUnit || 'minutes');

//   useEffect(() => {
//     setSelectedTemplate(data.selectedTemplate);
//     setDelay(data.delay || 0);
//   }, [data.selectedTemplate, data.delay]);

//   const handleTemplateChange = (e) => {
//     const value = e.target.value;
//     setSelectedTemplate(value);
//     data.onChange(id, { selectedTemplate: value });
//   };

//   const handleDelayChange = (e) => {
//     const value = Number.parseInt(e.target.value) || 0;
//     setDelay(value);
//     data.onChange(id, { delay: value });
//   };

//   const handleDelayUnitChange = (e) => {
//     setDelayUnit(e.target.value);
//     data.onChange(id, { delayUnit: e.target.value });
//   };

//   const getSelectedTemplateName = () => {
//     if (!selectedTemplate) return "Select a template";
//     const template = data.templates.find(t => t._id === selectedTemplate);
//     return template ? template.title : "Select a template";
//   };

//   return (
//     <div className="p-4 w-[280px] bg-white rounded-lg border border-gray-200 shadow-sm">
//       <Handle type="target" position={Position.Top} className="w-3 h-3" />

//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Email Template
//         </label>
//         <select
//           value={selectedTemplate || ""}
//           onChange={handleTemplateChange}
//           className="w-full p-2 border border-gray-300 rounded-md text-sm"
//         >
//           <option value="">Select a template</option>
//           {data.templates.map((template) => (
//             <option key={template._id} value={template._id}>
//               {template.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-700 mb-1">
//           Delay Before Sending
//         </label>
//         <div className="flex items-center">
//           <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden">
//             <div className="p-2 bg-gray-50 border-r border-gray-300">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//               </svg>
//             </div>
//             <input
//               type="number"
//               min="0"
//               value={delay}
//               onChange={handleDelayChange}
//               className="flex-1 p-2 border-none focus:ring-0 text-sm"
//             />
//           </div>
//           <select
//             value={delayUnit}
//             onChange={handleDelayUnitChange}
//             className="ml-2 p-2 border border-gray-300 rounded-md text-sm"
//           >
//             <option value="minutes">Minutes</option>
//             <option value="hours">Hours</option>
//             <option value="days">Days</option>
//           </select>
//         </div>
//       </div>

//       <div className="text-xs text-gray-500 mt-2">
//         {selectedTemplate ? (
//           <>
//             <div className="font-medium text-gray-700">{getSelectedTemplateName()}</div>
//             <div>Will be sent {delay > 0 ? `after ${delay} ${delayUnit}` : "immediately"}</div>
//           </>
//         ) : (
//           <div className="text-amber-600">Please select an email template</div>
//         )}
//       </div>

//       <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
//     </div>
//   );
// }

// export default EmailNode;


// import React,{ useState, useEffect } from "react"
// import { Handle, Position } from "reactflow"

// function EmailNode({ id, data }) {
//   const [selectedTemplate, setSelectedTemplate] = useState(data.selectedTemplate)
//   const [delay, setDelay] = useState(data.delay || 0)
//   const [delayUnit, setDelayUnit] = useState(data.delayUnit || "minutes")

//   useEffect(() => {
//     setSelectedTemplate(data.selectedTemplate)
//     setDelay(data.delay || 0)
//     setDelayUnit(data.delayUnit || "minutes")
//   }, [data.selectedTemplate, data.delay, data.delayUnit])

//   const handleTemplateChange = (e) => {
//     const value = e.target.value
//     setSelectedTemplate(value)
//     data.onChange(id, { selectedTemplate: value })
//   }

//   const handleDelayChange = (e) => {
//     const value = Number.parseInt(e.target.value) || 0
//     setDelay(value)
//     data.onChange(id, { delay: value })
//   }

//   const handleDelayUnitChange = (e) => {
//     setDelayUnit(e.target.value)
//     data.onChange(id, { delayUnit: e.target.value })
//   }

//   const getSelectedTemplateName = () => {
//     if (!selectedTemplate) return "Select a template"
//     const template = data.templates.find((t) => t._id === selectedTemplate)
//     return template ? template.title : "Select a template"
//   }

//   return (
//     <div className="p-4 w-[280px] bg-white rounded-lg border border-gray-200 shadow-sm">
//       <Handle type="target" position={Position.Top} className="w-3 h-3" />

//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
//         <select
//           value={selectedTemplate || ""}
//           onChange={handleTemplateChange}
//           className="w-full p-2 border border-gray-300 rounded-md text-sm"
//         >
//           <option value="">Select a template</option>
//           {data.templates.map((template) => (
//             <option key={template._id} value={template._id}>
//               {template.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-3">
//         <label className="block text-sm font-medium text-gray-700 mb-1">Delay Before Sending</label>
//         <div className="flex items-center">
//           <div className="flex-1 flex items-center border border-gray-300 rounded-md overflow-hidden">
//             <div className="p-2 bg-gray-50 border-r border-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 text-gray-500"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="number"
//               min="0"
//               value={delay}
//               onChange={handleDelayChange}
//               className="flex-1 p-2 border-none focus:ring-0 text-sm"
//             />
//           </div>
//           <select
//             value={delayUnit}
//             onChange={handleDelayUnitChange}
//             className="ml-2 p-2 border border-gray-300 rounded-md text-sm"
//           >
//             <option value="minutes">Minutes</option>
//             <option value="hours">Hours</option>
//             <option value="days">Days</option>
//           </select>
//         </div>
//       </div>

//       <div className="text-xs text-gray-500 mt-2">
//         {selectedTemplate ? (
//           <>
//             <div className="font-medium text-gray-700">{getSelectedTemplateName()}</div>
//             <div>Will be sent {delay > 0 ? `after ${delay} ${delayUnit}` : "immediately"}</div>
//           </>
//         ) : (
//           <div className="text-amber-600">Please select an email template</div>
//         )}
//       </div>

//       <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
//     </div>
//   )
// }

// export default EmailNode



import React from "react";
import { Handle, Position } from "reactflow";


function EmailNode({ id, data, selected }) {
  // Remove local state and use data from props directly

  const handleTemplateChange = (e) => {
    const value = e.target.value
    // Call the onChange handler directly with the new value
    data.onChange(id, { selectedTemplate: value })
  }

  const handleDelayChange = (e) => {
    const value = Number.parseInt(e.target.value) || 0
    data.onChange(id, { delay: value })
  }

  const handleDelayUnitChange = (e) => {
    const unit = e.target.value
    data.onChange(id, { delayUnit: unit })
  }

  const getSelectedTemplateName = () => {
    if (!data.selectedTemplate) return "Select a template"
    const template = data.templates?.find((t) => t._id === data.selectedTemplate)
    return template ? template.title : "Select a template"
  }

  return (
    <div
      className={`p-4 w-[280px] bg-white rounded-lg border ${
        selected ? "border-blue-500 shadow-md" : "border-gray-200"
      } shadow-sm`}
    >
      <div className="flex items-center mb-3">
        <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">Cold Email</div>
      </div>

      <Handle type="target" position={Position.Top} className="w-3 h-3" />

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Email Template</label>
        <select
          value={data.selectedTemplate || ""}
          onChange={handleTemplateChange}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Select a template</option>
          {data.templates?.map((template) => (
            <option key={template._id} value={template._id}>
              {template.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">Delay Before Sending</label>
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
              min="0"
              value={data.delay || 0}
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

      <div className="text-xs text-gray-500 mt-2">
        {data.selectedTemplate ? (
          <>
            <div className="font-medium text-gray-700">{getSelectedTemplateName()}</div>
            <div>Will be sent {data.delay > 0 ? `after ${data.delay} ${data.delayUnit}` : "immediately"}</div>
          </>
        ) : (
          <div className="text-amber-600">Please select an email template</div>
        )}
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  )
}

export default EmailNode
