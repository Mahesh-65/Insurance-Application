const express = require('express');
const { getDashboard } = require('../controllers/adminController');
const { approveApplication, rejectApplication } = require('../controllers/applicationController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { reviewSchema } = require('../validators/applicationValidator');
const { roles } = require('../utils/constants');

const router = express.Router();

router.use(protect, authorize(roles.ADMIN));
router.get('/dashboard', getDashboard);
router.put('/application/:id/approve', validateRequest(reviewSchema), approveApplication);
router.put('/application/:id/reject', validateRequest(reviewSchema), rejectApplication);

module.exports = router;
