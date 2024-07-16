const multer = require('multer');

const storage = multer.memoryStorage({});

const upload = multer({
  storage: storage,
});

module.exports = upload;



// const multer = require('multer');

// const storage = multer.memoryStorage({});

// const upload = multer({
//   storage
// }).fields([
//   { name: 'idProof', maxCount: 1 },
//   { name: 'incomeProof', maxCount: 1 },
//   { name: 'addressProof', maxCount: 1 }
// ]);

// module.exports = upload;
