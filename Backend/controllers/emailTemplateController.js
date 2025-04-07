const EmailTemplate = require('../models/emailTemplate');
const User = require('../models/userSchema');

const createTemplate = async (req, res) => {
  const { title, subject, body } = req.body;
  const userId = req.user._id;

  try {
    const template = await EmailTemplate.create({
      userId,
      title,
      subject,
      body
    });

    // Add template ID to user's emailTemplates array
    await User.findByIdAndUpdate(userId, {
      $push: { emailTemplates: template._id }
    });

    res.status(201).json({ success: true, template });
  } catch (error) {
    console.error("Create template error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllTemplates = async (req, res) => {
  const userId = req.user._id;

  try {
    const templates = await EmailTemplate.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error("Get templates error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { title, subject, body } = req.body;
  const userId = req.user._id;

  try {
    const template = await EmailTemplate.findOneAndUpdate(
      { _id: id, userId },
      { title, subject, body },
      { new: true }
    );

    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    res.status(200).json({ success: true, template });
  } catch (error) {
    console.error("Update template error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const deleteTemplate = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const template = await EmailTemplate.findOneAndDelete({ _id: id, userId });

    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    // Remove template ID from user's emailTemplates array
    await User.findByIdAndUpdate(userId, {
      $pull: { emailTemplates: template._id }
    });

    res.status(200).json({ success: true, message: "Template deleted" });
  } catch (error) {
    console.error("Delete template error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getTemplateById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const template = await EmailTemplate.findOne({ _id: id, userId });

    if (!template) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }

    res.status(200).json({ success: true, template });
  } catch (error) {
    console.error("Get template by ID error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { createTemplate, getAllTemplates, updateTemplate, deleteTemplate, getTemplateById };
