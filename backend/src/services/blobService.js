const { BlobServiceClient } = require('@azure/storage-blob');
const env = require('../config/env');

const getClient = () => {
  if (!env.azureStorageConnectionString) {
    return null;
  }
  const serviceClient = BlobServiceClient.fromConnectionString(env.azureStorageConnectionString);
  return serviceClient.getContainerClient(env.azureContainerName);
};

const ensureContainer = async () => {
  const client = getClient();
  if (!client) return null;
  await client.createIfNotExists({ access: 'blob' });
  return client;
};

const uploadBuffer = async ({ buffer, blobName, contentType }) => {
  const container = await ensureContainer();
  if (!container) {
    return {
      blobName,
      url: `https://local-storage.invalid/${blobName}`
    };
  }
  const blockBlobClient = container.getBlockBlobClient(blobName);
  await blockBlobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: contentType }
  });
  return {
    blobName,
    url: blockBlobClient.url
  };
};

const deleteBlob = async (blobName) => {
  const container = await ensureContainer();
  if (!container) return;
  await container.deleteBlob(blobName);
};

module.exports = {
  uploadBuffer,
  deleteBlob
};
