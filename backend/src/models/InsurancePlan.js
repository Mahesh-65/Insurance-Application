const mongoose = require('mongoose');

const insurancePlanSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true, trim: true },
    planType: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    minimumAge: { type: Number, required: true },
    maximumAge: { type: Number, required: true },
    basePremium: { type: Number, required: true },
    coverageAmount: { type: Number, required: true },
    requiredDocuments: [{ type: String, required: true }],
    activeStatus: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('InsurancePlan', insurancePlanSchema);
