// Import models and utility
const EmailFlow = require("../models/emailFlowSchema");
const EmailTemplate = require("../models/emailTemplate");
const { scheduleEmail } = require("../utils/scheduleEmail");

// Controller to create a new flow
const createFlow = async (req, res) => {
  const { title, nodes, edges } = req.body;
  const userId = req.user._id; // Get user ID from auth middleware

  try {
    // Create and save new flow to DB
    const flow = await EmailFlow.create({
      userId,
      title,
      nodes,
      edges,
    });

    res.status(200).json({ success: true, flow });
  } catch (err) {
    console.error("Error saving flow:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller to update an existing flow
const updateFlow = async (req, res) => {
  const { id } = req.params;
  const { title, nodes, edges } = req.body;
  const userId = req.user._id;

  try {
    // Update the flow by ID and user ID
    const updatedFlow = await EmailFlow.findOneAndUpdate(
      { _id: id, userId },
      { title, nodes, edges },
      { new: true } // Return updated doc
    );

    if (!updatedFlow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    res.status(200).json({ success: true, flow: updatedFlow });
  } catch (err) {
    console.error("Error updating flow:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller to get all flows for a logged-in user
const getFlows = async (req, res) => {
  const userId = req.user._id;
  try {
    // Find all flows belonging to the user, sorted by last updated
    const flows = await EmailFlow.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, flows });
  } catch (err) {
    console.error("Error getting flows:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller to get a single flow by ID
const getFlowById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Fetch flow by ID and user ID
    const flow = await EmailFlow.findOne({ _id: id, userId });

    if (!flow) {
      return res
        .status(404)
        .json({ success: false, message: "Flow not found" });
    }

    res.status(200).json({ success: true, flow });
  } catch (err) {
    console.error("Error getting flow by ID:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller to delete a flow
const deleteFlow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    // Delete flow by ID and user ID
    await EmailFlow.findOneAndDelete({ _id: id, userId });

    res
      .status(200)
      .json({ success: true, message: "Flow deleted successfully" });
  } catch (err) {
    console.error("Error deleting flow:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Controller to run a flow and schedule emails accordingly
const runFlow = async (req, res) => {
  const { flowId, recipientEmail } = req.body;
  const userId = req.user._id;

  try {
    // Validate inputs
    if (!recipientEmail) {
      return res.status(400).json({ success: false, message: "Lead email is required" });
    }

    if (!flowId) {
      return res.status(400).json({ success: false, message: "Flow ID is required" });
    }

    // Find the flow belonging to the user
    const flow = await EmailFlow.findOne({ _id: flowId, userId });

    if (!flow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    const { nodes } = flow;

    let delayInMinutes = 0;

    // Iterate through each node in the flow
    for (const node of nodes) {
      // If the node is a delay, increase the delay counter
      if (node.type === "delayNode") {
        delayInMinutes += Number(node.data.delay) || 0;
      }

      // If the node is an email node, fetch the selected template
      if (node.type === "emailNode") {
        const templateId = node.data.selectedTemplate;

        const template = await EmailTemplate.findOne({
          _id: templateId,
          userId,
        });

        // Skip if template not found
        if (!template) {
          console.warn(`Template not found for ID: ${templateId}`);
          continue;
        }

        // Calculate time to send the email based on delays
        const scheduledTime = new Date(Date.now() + delayInMinutes * 60 * 1000);

        // Use Agenda to schedule the email
        await scheduleEmail({
          userId,
          flowId,
          templateId,
          sendTo: recipientEmail,
          sendTime: scheduledTime,
        });
      }
    }

    res.status(200).json({ success: true, message: "Emails scheduled successfully" });
  } catch (error) {
    console.error("Error running flow:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Export all flow controllers
module.exports = {
  createFlow,
  updateFlow,
  getFlows,
  getFlowById,
  deleteFlow,
  runFlow,
};
