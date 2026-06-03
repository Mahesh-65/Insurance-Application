const Application = require('../models/Application');
const InsurancePlan = require('../models/InsurancePlan');
const asyncHandler = require('../middlewares/asyncHandler');
const ApiError = require('../utils/ApiError');
const { calculatePremium } = require('../services/premiumCalculator');
const { createAuditLog } = require('../services/auditService');

const createApplication = asyncHandler(async (req, res) => {
  const plan = await InsurancePlan.findById(req.body.planId);
  if (!plan || !plan.activeStatus) {
    throw new ApiError(404, 'Active plan not found');
  }
  if (req.body.age < plan.minimumAge || req.body.age > plan.maximumAge) {
    throw new ApiError(400, 'Applicant age is outside plan limits');
  }

  const premium = calculatePremium(plan.basePremium, req.body.age);
  const application = await Application.create({
    userId: req.user._id,
    planId: plan._id,
    age: req.body.age,
    premium,
    documents: req.body.documents
  });

  res.status(201).json({ success: true, application });
});

const getApplications = asyncHandler(async (req, res) => {
  const query = req.user.role === 'ADMIN' ? {} : { userId: req.user._id };
  const applications = await Application.find(query)
    .populate('userId', 'name email phone')
    .populate('planId')
    .sort({ createdAt: -1 });
  res.json({ success: true, applications });
});

const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate('userId', 'name email phone').populate('planId');
  if (!application) {
    throw new ApiError(404, 'Application not found');
  }
  if (req.user.role !== 'ADMIN' && String(application.userId._id) !== String(req.user._id)) {
    throw new ApiError(403, 'Access denied');
  }
  res.json({ success: true, application });
});

const reviewApplication = (status, action) =>
  asyncHandler(async (req, res) => {
    const application = await Application.findById(req.params.id).populate('userId planId');
    if (!application) {
      throw new ApiError(404, 'Application not found');
    }

    application.status = status;
    application.adminComments = req.body.adminComments || '';
    await application.save();

    await createAuditLog({
      action,
      description: `${application.planId.planName} application ${status.toLowerCase()}`,
      performedBy: req.user._id
    });

    res.json({ success: true, application });
  });

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  approveApplication: reviewApplication('Approved', 'Application Approved'),
  rejectApplication: reviewApplication('Rejected', 'Application Rejected')
};
