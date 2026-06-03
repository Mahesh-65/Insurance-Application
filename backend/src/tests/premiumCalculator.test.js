const { calculatePremium } = require('../services/premiumCalculator');

describe('premium calculator', () => {
  it('calculates age based premium', () => {
    expect(calculatePremium(1000, 24)).toBe(1050);
    expect(calculatePremium(1000, 42)).toBe(1200);
    expect(calculatePremium(1000, 68)).toBe(1600);
  });
});
