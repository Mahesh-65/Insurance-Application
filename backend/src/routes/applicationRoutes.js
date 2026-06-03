const express = require('express');
const {
  createApplication,
  getApplications,
  getApplicationById
} = require('../controllers/applicationController');
const { protect } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { createApplicationSchema } = require('../validators/applicationValidator');

const router = express.Router();

router.use(protect);
router.post('/', validateRequest(createApplicationSchema), createApplication);
router.get('/', getApplications);
router.get('/:id', getApplicationById);

module.exports = router;
