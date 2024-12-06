const multer = require("multer");
const path = require("node:path");

const storageConfig = multer.diskStorage({
	destination: path.join(__dirname, "../uploads"),    // destinations is uploads folder  under the project directory
	filename: (req, file, res) => {
		// file name is prepended with current time
		// in milliseconds to handle duplicate file names
		res(null, Date.now() + "-" + file.originalname);
	},
});

// file filter for filtering only images
const fileFilterConfig = function(req, file, cb) {
	if (file.mimetype === "image/jpeg"
		|| file.mimetype === "image/png") {
		
		cb(null, true);
	} else {
		// false to indicate not to store the file
		cb(null, false);
	}
};



const upload = multer({
	// applying storage and file filter
	storage: storageConfig,
	limits: {
		// limits file size to 5 MB
		fileSize: 1024 * 1024 * 5
	},
	fileFilter: fileFilterConfig,
});

module.exports = upload;