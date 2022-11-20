const { canvas_config } = require('./screen');

/** @param {Point} point */
const pointToCanvas = (point) => {
	return {
		x: point.x * canvas_config.grid_size,
		y: point.y * canvas_config.grid_size
	};
};

exports.pointToCanvas = pointToCanvas;