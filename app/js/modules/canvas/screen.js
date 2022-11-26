const { draw } = require('./_draw_grid');
const { get_cursor_position, draw_point } = require('./_events');

const canvas = document.getElementById('canva-screen');
const ctx = canvas.getContext("2d");

let grid_size = 80;
let width = canvas.getBoundingClientRect().width;
let height = canvas.getBoundingClientRect().height;

/** 
 * @typedef {{
 * 	context: CanvasRenderingContext2D,
 * 	grid_size: number,
 * 	width: number,
 * 	height: number,
 * 	cols: number,
 * 	rows: number,
 * 	colors: any,
 * 	grid_scale: number,
 * 	on: {
 * 		click: Function
 * 	}
 * }} CanvasConfig
 */

/** @type {CanvasConfig} */
const config = {
	context: ctx,
	grid_size: grid_size,
	width: width,
	height: height,
	cols: width / grid_size,
	rows: height / grid_size,
	colors: {
		point: '#fff'
	},
	grid_scale: null,
	on: {
		click: []
	}
};
config.grid_scale = config.cols / config.grid_size;
config.clickToGridPos = function(coord) {
	coord.x = coord.x / config.grid_size;
	coord.y = coord.y / config.grid_size;
	
	let x_distance = Math.abs(coord.x - Math.round(coord.x));
	let y_distance = Math.abs(coord.y - Math.round(coord.y));
	if(x_distance > .3 || y_distance > .3) {
		coord.x = null;
		coord.y = null;
	} else {
		coord.x = Math.round(coord.x);
		coord.y = Math.round(coord.y);
	}
	
	config.on.click.forEach(event => {
		event(coord, config);
	});
	
	return coord;
};
	
// seta o tamanho do canvas
canvas.setAttribute('width', config.width);
canvas.setAttribute('height', config.height);

draw(config);

config.on.click.push(draw_point);

// Atribuição de eventos
canvas.addEventListener('mousedown', function(e) {
    config.clickToGridPos(get_cursor_position(canvas, e))
});

exports.canvas = canvas;
exports.canvas_config = config;