const path = require("path");

module.exports = {
	entry: './src/test-module.js',
	output:{
	  filename: 'main.js',
	  path: path.resolve(__dirname, 'public/javascripts')
	}
};