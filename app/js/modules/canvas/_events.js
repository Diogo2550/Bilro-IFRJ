function get_cursor_position(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
	
	return {x, y};
}

function draw_point(coord, config) {
	let ctx = config.context;
	let grid_size = config.grid_size;
	let point_radius = config.grid_size / 6;
	
	if(!coord.x || !coord.y) return;
	
	ctx.beginPath();
	ctx.ellipse(coord.x * grid_size, coord.y * grid_size, point_radius, point_radius, Math.PI / 4, 0, 2 * Math.PI);
	ctx.strokeStyle = config.colors.point;
	ctx.fillStyle = config.colors.point;
	ctx.stroke();
	ctx.fill();
}

exports.draw_point = draw_point;
exports.get_cursor_position = get_cursor_position;