const InsurancePlan = require('../models/InsurancePlan');

const plans = [
  {
    planName: 'Health Insurance Prime',
    planType: 'Health Insurance',
    description: 'Premium health coverage with inpatient, outpatient, and wellness benefits.',
    minimumAge: 18,
    maximumAge: 70,
    basePremium: 18000,
    coverageAmount: 1000000,
    requiredDocuments: ['Aadhaar', 'PAN', 'Medical Report'],
    activeStatus: true
  },
  {
    planName: 'Life Insurance Legacy',
    planType: 'Life Insurance',
    description: 'Long-term life protection designed for families and income security.',
    minimumAge: 18,
    maximumAge: 65,
    basePremium: 22000,
    coverageAmount: 2500000,
    requiredDocuments: ['Aadhaar', 'PAN', 'Income Proof'],
    activeStatus: true
  },
  {
    planName: 'Vehicle Insurance Shield',
    planType: 'Vehicle Insurance',
    description: 'Comprehensive vehicle protection for private and commercial use.',
    minimumAge: 18,
    maximumAge: 75,
    basePremium: 12000,
    coverageAmount: 700000,
    requiredDocuments: ['RC Book', 'Driving License'],
    activeStatus: true
  },
  {
    planName: 'Travel Insurance Elite',
    planType: 'Travel Insurance',
    description: 'Smart travel protection for domestic and international trips.',
    minimumAge: 18,
    maximumAge: 80,
    basePremium: 6000,
    coverageAmount: 500000,
    requiredDocuments: ['Passport', 'Travel Itinerary'],
    activeStatus: true
  },
  {
    planName: 'Home Insurance Fortress',
    planType: 'Home Insurance',
    description: 'Property and contents protection tailored for homeowners.',
    minimumAge: 21,
    maximumAge: 75,
    basePremium: 15000,
    coverageAmount: 1800000,
    requiredDocuments: ['Property Deed', 'Address Proof'],
    activeStatus: true
  }
];

const seedPlans = async () => {
  const count = await InsurancePlan.countDocuments();
  if (!count) {
    await InsurancePlan.insertMany(plans);
  }
};

module.exports = seedPlans;
