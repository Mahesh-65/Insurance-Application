const express = require('express');
const { uploadDocument, removeDocument } = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/', protect, upload.single('file'), uploadDocument);
router.delete('/:blobName', protect, removeDocument);

module.exports = router;
