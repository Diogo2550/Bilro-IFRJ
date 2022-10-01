const { src, dest } = require('gulp');

let root_path = process.env.BUILD_PATH;

exports.transpileImages = function() {
	return src('./app/**/*.{jpg,png,jpeg,gif,svg,ico}')
		.pipe(dest('./tmp'));
};