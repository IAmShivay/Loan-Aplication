const path = require("path");
const DataUriParser = require("datauri/parser");

const getDataUri = (file) => {
  if (!file || !file[0] || !file[0].originalname) {
    throw new Error('File object or originalname property is missing or undefined.');
  }

  const parser = new DataUriParser();
  
  // Get the original name of the file
  const originalName = file[0].originalname;
  console.log("Original Name:", originalName);
  
  // Get the extension of the file
  const extName = path.extname(originalName);
  console.log("Extension Name:", extName);
  
  // Format and return the Data URI
  return parser.format(extName, file[0].buffer);
};

module.exports = getDataUri;
