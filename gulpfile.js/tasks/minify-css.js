const { src, dest } = require('gulp');
const uglifycss = require('gulp-uglifycss');
const path = require('path');
const clean = require('gulp-clean');

let root_path = process.env.BUILD_PATH;

function minify() {
	return src(path.resolve('./tmp/css', '*.css'))
		.pipe(uglifycss({
			"uglyComments": true,
		}))
		.pipe(dest(path.resolve('./tmp')));
}

function cleanCSS() {
	return src(path.resolve('./tmp/css'))
		.pipe(clean());
}

exports.minifyCSS = minify;
exports.cleanCSS = cleanCSS;