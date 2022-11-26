const { canvas_config } = require('./screen');

/** @param {Point} point */
const pointToCanvas = (point) => {
	return {
		x: point.x * canvas_config.grid_size,
		y: point.y * canvas_config.grid_size
	};
};

/** @param {Point} point */
const canvasToGrid = (point) => {
	return {
		x: Math.round(point.x / canvas_config.grid_size),
		y: Math.round(point.y / canvas_config.grid_size)
	}
}

exports.pointToCanvas = pointToCanvas;
exports.canvasToGrid = canvasToGrid;
