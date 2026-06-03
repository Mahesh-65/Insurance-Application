const crypto = require('crypto');
const asyncHandler = require('../middlewares/asyncHandler');
const { uploadBuffer, deleteBlob } = require('../services/blobService');

const uploadDocument = asyncHandler(async (req, res) => {
  const file = req.file;
  const docName = req.body.name || file.originalname;
  const blobName = `${req.user._id}/${Date.now()}-${crypto.randomBytes(6).toString('hex')}-${file.originalname}`;
  const uploaded = await uploadBuffer({
    buffer: file.buffer,
    blobName,
    contentType: file.mimetype
  });

  res.status(201).json({
    success: true,
    document: {
      name: docName,
      fileName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      url: uploaded.url,
      blobName: uploaded.blobName
    }
  });
});

const removeDocument = asyncHandler(async (req, res) => {
  await deleteBlob(req.params.blobName);
  res.json({ success: true, message: 'Blob deleted' });
});

module.exports = {
  uploadDocument,
  removeDocument
};
