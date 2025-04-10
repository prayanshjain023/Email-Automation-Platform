export function cleanNodeData(node) {
    // Create a base cleaned node with common properties
    const cleanedNode = {
      id: node.id,
      type: node.type,
      position: node.position,
      data: {},
    }
  
    // Add type-specific data
    switch (node.type) {
      case "emailNode":
        cleanedNode.data = {
          selectedTemplate: node.data.selectedTemplate,
          delay: node.data.delay || 0,
          delayUnit: node.data.delayUnit || "minutes",
        }
        break
      case "delayNode":
        cleanedNode.data = {
          delay: node.data.delay || 0,
          delayUnit: node.data.delayUnit || "minutes",
        }
        break
      case "leadSourceNode":
        cleanedNode.data = {
          sourceName: node.data.sourceName || "",
          description: node.data.description || "",
        }
        break
      default:
        // Copy all data except UI-specific properties
        Object.keys(node.data).forEach((key) => {
          if (key !== "onChange" && key !== "templates") {
            cleanedNode.data[key] = node.data[key]
          }
        })
    }
  
    // If there are any other essential properties you need to keep, add them here
    if (node.parentNode) {
      cleanedNode.parentNode = node.parentNode
    }
  
    if (node.extent) {
      cleanedNode.extent = node.extent
    }
  
    return cleanedNode
  }
  
  /**
   * Cleans edge data by removing any UI-specific properties
   */
  export function cleanEdgeData(edge) {
    // Create a new object with only the essential properties
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      // Include any other essential edge properties here
      ...(edge.animated && { animated: edge.animated }),
      ...(edge.style && { style: edge.style }),
      ...(edge.type && { type: edge.type }),
      ...(edge.label && { label: edge.label }),
    }
  }
  
  /**
   * Prepares the entire flow data for saving to the backend
   */
  export function prepareFlowForSave(title, nodes, edges) {
    // Deep clone to avoid modifying the original objects
    return {
      title,
      nodes: nodes.map(cleanNodeData),
      edges: edges.map(cleanEdgeData),
    }
  }
  
  /**
   * Validates flow data before saving
   * Returns an error message if invalid, or null if valid
   */
  export function validateFlow(title, nodes) {
    if (!title.trim()) {
      return "Flow title is required"
    }
  
    if (nodes.length === 0) {
      return "Your flow must contain at least one node"
    }
  
    // Check if all email nodes have a template selected
    const invalidEmailNodes = nodes.filter((node) => node.type === "emailNode" && !node.data.selectedTemplate)
  
    if (invalidEmailNodes.length > 0) {
      return `${invalidEmailNodes.length} email node(s) are missing a template selection`
    }
  
    return null
  }
  
  /**
   * Creates a node of the specified type
   */
  export function createNode(type, position, templates, onChangeHandler) {
    const id = `${type}-${Date.now()}`
  
    const baseNode = {
      id,
      type,
      position,
    }
  
    switch (type) {
      case "emailNode":
        return {
          ...baseNode,
          data: {
            templates,
            selectedTemplate: "",
            delay: 0,
            delayUnit: "minutes",
            onChange: onChangeHandler,
          },
        }
      case "delayNode":
        return {
          ...baseNode,
          data: {
            delay: 60, // Default 60 minutes
            delayUnit: "minutes",
            onChange: onChangeHandler,
          },
        }
      case "leadSourceNode":
        return {
          ...baseNode,
          data: {
            sourceName: "",
            description: "",
            onChange: onChangeHandler,
          },
        }
      default:
        return baseNode
    }
  }
  