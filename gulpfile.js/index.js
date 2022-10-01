const { watch, series, src, parallel, dest } = require('gulp');
const { compileHTML } = require('./tasks/compile-html');
const { compileSASS } = require('./tasks/compile-sass');
const { hashFiles } = require('./tasks/hash-filenames');
const { minifyCSS, cleanCSS } = require('./tasks/minify-css');
const { transpileImages } = require('./tasks/transpile-images');

const clean = require('gulp-clean');
const { compileJs } = require('./tasks/compile-js');

function cleanTmp() {
	return src('./tmp')
		.pipe(clean());
}

function tmpToBuild() {
	return src('./tmp/**/*')
		.pipe(dest('dist'));
}

exports.run = series(
	parallel(
		series(
			compileSASS, 
			minifyCSS,
			cleanCSS,
		),
		compileHTML,
		compileJs,
		transpileImages
	),
	hashFiles,
	cleanTmp
);

exports.watch = function() {
	watch(['./app/styles/**/*.scss',
			'./app/js/**/*.js',
			'./app/**/*.html'], { ignoreInitial: false }, series(
		parallel(
			compileSASS,
			compileHTML,
			transpileImages,
			compileJs
		),
		tmpToBuild,
		cleanTmp
	));
}