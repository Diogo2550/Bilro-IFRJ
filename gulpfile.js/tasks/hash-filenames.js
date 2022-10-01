const { src, series, dest } = require("gulp");
const rev = require("gulp-rev");
const clean = require('gulp-clean');
const revdel = require('gulp-rev-del')
const revCollector = require("gulp-rev-collector");

let root_path = process.env.BUILD_PATH;

function move_files() {
	return src("./tmp/**/*.{html,json}")
		.pipe(dest('./' + root_path));
}

function hash_rename() {
	return src(["./tmp/**/*.css",
				"./tmp/**/*.js",
				"./tmp/**/*.{jpg,png,jpeg,gif,svg}"])
		.pipe(rev())
		.pipe(revdel())
		.pipe(dest(root_path))
		.pipe(rev.manifest({ path: "manifest.json", merge: true }))
		.pipe(dest(root_path))
}

function update_references() {
   	return src([root_path + "/manifest.json", root_path + "/**/*.{html,json,css,js}"])
		.pipe(revCollector())
		.pipe(dest(root_path))
}

exports.hashFiles = series(
	move_files,
	hash_rename,
	update_references
);