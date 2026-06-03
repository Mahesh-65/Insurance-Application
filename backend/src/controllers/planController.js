const InsurancePlan = require('../models/InsurancePlan');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiError = require('../utils/ApiError');
const { createAuditLog } = require('../services/auditService');

const getPlans = asyncHandler(async (req, res) => {
  const query = req.user?.role === 'ADMIN' ? {} : { activeStatus: true };
  const plans = await InsurancePlan.find(query).sort({ createdAt: -1 });
  res.json({ success: true, plans });
});

const getPlanById = asyncHandler(async (req, res) => {
  const plan = await InsurancePlan.findById(req.params.id);
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }
  res.json({ success: true, plan });
});

const createPlan = asyncHandler(async (req, res) => {
  const plan = await InsurancePlan.create(req.body);
  await createAuditLog({
    action: 'Plan Created',
    description: `${plan.planName} created`,
    performedBy: req.user._id
  });
  res.status(201).json({ success: true, plan });
});

const updatePlan = asyncHandler(async (req, res) => {
  const plan = await InsurancePlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }
  await createAuditLog({
    action: 'Plan Updated',
    description: `${plan.planName} updated`,
    performedBy: req.user._id
  });
  res.json({ success: true, plan });
});

const deletePlan = asyncHandler(async (req, res) => {
  const plan = await InsurancePlan.findByIdAndDelete(req.params.id);
  if (!plan) {
    throw new ApiError(404, 'Plan not found');
  }
  await createAuditLog({
    action: 'Plan Deleted',
    description: `${plan.planName} deleted`,
    performedBy: req.user._id
  });
  res.json({ success: true, message: 'Plan deleted' });
});

module.exports = {
  getPlans,
  getPlanById,
  createPlan,
  updatePlan,
  deletePlan
};
