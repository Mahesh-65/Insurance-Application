const getAgeFactor = (age) => {
  if (age <= 25) return 0.05;
  if (age <= 35) return 0.1;
  if (age <= 45) return 0.2;
  if (age <= 55) return 0.3;
  if (age <= 65) return 0.4;
  return 0.6;
};

const calculatePremium = (basePremium, age) => {
  const ageFactor = getAgeFactor(age);
  return Math.round(basePremium + basePremium * ageFactor);
};

module.exports = {
  calculatePremium,
  getAgeFactor
};
