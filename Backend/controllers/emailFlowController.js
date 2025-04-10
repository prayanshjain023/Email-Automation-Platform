const EmailFlow = require("../models/emailFlowSchema");
const EmailTemplate = require("../models/emailTemplate");
const { scheduleEmail } = require("../utils/scheduleEmail");

const createFlow = async (req, res) => {
  const { title, nodes, edges } = req.body;
  const userId = req.user._id;

  try {
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

const updateFlow = async (req, res) => {
  const { id } = req.params;
  const { title, nodes, edges } = req.body;
  const userId = req.user._id;

  try {
    const updatedFlow = await EmailFlow.findOneAndUpdate(
      { _id: id, userId },
      { title, nodes, edges },
      { new: true }
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

const getFlows = async (req, res) => {
  const userId = req.user._id;
  try {
    const flows = await EmailFlow.find({ userId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, flows });
  } catch (err) {
    console.error("Error getting flows:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getFlowById = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  try {
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

const deleteFlow = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    await EmailFlow.findOneAndDelete({ _id: id, userId });
    res
      .status(200)
      .json({ success: true, message: "Flow deleted successfully" });
  } catch (err) {
    console.error("Error deleting flow:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const runFlow = async (req, res) => {
  const { flowId, recipientEmail } = req.body;
  const userId = req.user._id;

  try {
    if (!recipientEmail) {
      return res.status(400).json({ success: false, message: "Lead email is required" });
    }

    if (!flowId) {
      return res.status(400).json({ success: false, message: "Flow ID is required" });
    }

    const flow = await EmailFlow.findOne({ _id: flowId, userId });

    if (!flow) {
      return res.status(404).json({ success: false, message: "Flow not found" });
    }

    const { nodes } = flow;


    let delayInMinutes = 0;

    for (const node of nodes) {
      if (node.type === "delayNode") {
        delayInMinutes += Number(node.data.delay) || 0;
      }

      if (node.type === "emailNode") {
        const templateId = node.data.selectedTemplate;

        const template = await EmailTemplate.findOne({
          _id: templateId,
          userId,
        });

        if (!template) {
          console.warn(`Template not found for ID: ${templateId}`);
          continue;
        }

        const scheduledTime = new Date(Date.now() + delayInMinutes * 60 * 1000);

        await scheduleEmail({
          userId,
          flowId,
          templateId,
          sendTo: recipientEmail,
          sendTime: scheduledTime, // ✅ CORRECT field name
        })
        
        
      }
    }

    res.status(200).json({ success: true, message: "Emails scheduled successfully" });
  } catch (error) {
    console.error("Error running flow:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


module.exports = {
  createFlow,
  updateFlow,
  getFlows,
  getFlowById,
  deleteFlow,
  runFlow,
};
