const { Pin } = require('../modules/drawing/pin');

require('./point');

/** 
 * @typedef {{ 
 * 	type: string,
 * 	cur_dir?: string,
 * 	parent: Pin,
 * 	position: {
 * 		from: Point,
 * 		to: Point
 * 	}
 * }} LinePath 
 */
