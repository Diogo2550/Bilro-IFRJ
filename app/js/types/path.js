const { Pin } = require('../modules/drawing/pin');

require('./point');

/** 
 * @typedef {{ 
 * 	type: string,
 * 	cur_dir?: string,
 * 	parent: Pin,
 * 	position: {
 * 		from: Point,
 * 		to: Point,
 * 	}
 *	top: Point,
 *	bottom: Point
 * }} LinePath 
 */

/**
 * @typedef {{
 * 	path_left_name: string,
 * 	path_right_name: string,
 * 	paths: Array<LinePath>,
 * 	parent: Pin,
 * 	color: string
 * }} Bilro
 */