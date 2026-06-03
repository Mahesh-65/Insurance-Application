const AuditLog = require('../models/AuditLog');

const createAuditLog = async ({ action, description, performedBy }) =>
  AuditLog.create({
    action,
    description,
    performedBy
  });

module.exports = {
  createAuditLog
};
