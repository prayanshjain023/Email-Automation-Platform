const express = require('express');
const router = express.Router();
const {
  createTemplate,
  getAllTemplates,
  updateTemplate,
  deleteTemplate,
  getTemplateById
} = require('../controllers/emailTemplateController');
const { authUser } = require('../middleware/auth');

router.post('/create',authUser, createTemplate);
router.get('/',authUser, getAllTemplates);
router.put('/:id',authUser, updateTemplate);
router.delete('/:id',authUser, deleteTemplate);
router.get('/:id',authUser, getTemplateById);

module.exports = router;
