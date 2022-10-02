const { src, dest } = require('gulp');
const webpackStream = require('webpack-stream');

let root_path = 'dist';

function compileJs() {
	return src('./app/js/*.js')
		.pipe(
			webpackStream({
				mode: 'development'
			})
		)
		.pipe(dest(root_path + '/js'))
}

exports.compileJs = compileJs;