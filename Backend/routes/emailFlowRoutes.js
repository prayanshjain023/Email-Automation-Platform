const express = require('express');
const router = express.Router();
const { createFlow, getFlows, getFlowById, deleteFlow, runFlow, updateFlow  } = require('../controllers/emailFlowController');
const { authUser } = require('../middleware/auth');

router.post('/create', authUser, createFlow)
router.put('/:id', authUser, updateFlow)
router.get('/', authUser, getFlows)
router.get('/:id', authUser, getFlowById)
router.delete('/delete/:id', authUser, deleteFlow)
router.post('/runflow', authUser, runFlow)

module.exports = router;
