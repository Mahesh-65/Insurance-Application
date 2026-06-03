const express = require('express');
const { getPlans, getPlanById, createPlan, updatePlan, deletePlan } = require('../controllers/planController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const { planSchema } = require('../validators/planValidator');
const { roles } = require('../utils/constants');

const router = express.Router();

router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/', protect, authorize(roles.ADMIN), validateRequest(planSchema), createPlan);
router.put('/:id', protect, authorize(roles.ADMIN), validateRequest(planSchema), updatePlan);
router.delete('/:id', protect, authorize(roles.ADMIN), deletePlan);

module.exports = router;
