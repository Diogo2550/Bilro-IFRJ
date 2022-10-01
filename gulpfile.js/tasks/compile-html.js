const { src, dest } = require('gulp');
const fileinclude = require('gulp-file-include');
const preprocess = require("gulp-preprocess");
const path = require('path');

let root_path = process.env.BUILD_PATH;

exports.compileHTML = function() {
	return src('./app/*.html')
		.pipe(fileinclude({ prefix: '%%', basepath: "app/includes" }))
		.pipe(preprocess({ context: { NODE_ENV: process.env.NODE_ENV, DEBUG: true } }))
		.pipe(dest('./tmp'));
};