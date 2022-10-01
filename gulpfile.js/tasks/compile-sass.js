const { src, dest } = require('gulp');
const autoPrefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'));
const path = require('path');

let root_path = process.env.BUILD_PATH;

function compile() {
	return src('./app/styles/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(autoPrefixer({
			flexbox: 'no-2009',
		}))
		.pipe(dest(path.resolve('./tmp/css')));
}

exports.compileSASS = compile;