const pickDbUri = () => process.env.COSMOS_DB_URI || process.env.MONGODB_URI;

module.exports = pickDbUri;
