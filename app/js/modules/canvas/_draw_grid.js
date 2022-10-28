function draw(config) {
	var x_axis_distance_grid_lines = 0;
	var y_axis_distance_grid_lines = 0;
	var x_axis_starting_point = { number: 1, suffix: '' };
	var y_axis_starting_point = { number: 1, suffix: '' };

	var num_lines_x = Math.floor(config.height/config.grid_size);
	var num_lines_y = Math.floor(config.width/config.grid_size);

	// Draw grid lines along X-axis
	for(var i=0; i<=num_lines_x; i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		
		// If line represents X-axis draw in different color
		if(i == x_axis_distance_grid_lines) 
			config.context.strokeStyle = "#000000";
		else
			config.context.strokeStyle = "#e9e9e921";
		
		if(i == num_lines_x) {
			config.context.moveTo(0, config.grid_size*i);
			config.context.lineTo(config.width, config.grid_size*i);
		}
		else {
			config.context.moveTo(0, config.grid_size*i+0.5);
			config.context.lineTo(config.width, config.grid_size*i+0.5);
		}
		config.context.stroke();
	}

	// Draw grid lines along Y-axis
	for(i=0; i<=num_lines_y; i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		
		// If line represents X-axis draw in different color
		if(i == y_axis_distance_grid_lines) 
			config.context.strokeStyle = "#000000";
		else
			config.context.strokeStyle = "#e9e9e921";
		
		if(i == num_lines_y) {
			config.context.moveTo(config.grid_size*i, 0);
			config.context.lineTo(config.grid_size*i, config.height);
		}
		else {
			config.context.moveTo(config.grid_size*i+0.5, 0);
			config.context.lineTo(config.grid_size*i+0.5, config.height);
		}
		config.context.stroke();
	}

	// Translate to the new origin. Now Y-axis of the canvas is opposite to the Y-axis of the graph. So the y-coordinate of each element will be negative of the actual
	config.context.translate(y_axis_distance_grid_lines*config.grid_size, x_axis_distance_grid_lines*config.grid_size);

	// Ticks marks along the positive X-axis
	for(i=1; i<(num_lines_y - y_axis_distance_grid_lines); i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		config.context.strokeStyle = "#000000";

		// Draw a tick mark 6px long (-3 to 3)
		config.context.moveTo(config.grid_size*i+0.5, -3);
		config.context.lineTo(config.grid_size*i+0.5, 3);
		config.context.stroke();

		// Text value at that point
		config.context.font = '18px Arial';
		config.context.textAlign = 'start';
		config.context.fillText(x_axis_starting_point.number*i + x_axis_starting_point.suffix, config.grid_size*i-2, 15);
	}

	// Ticks marks along the negative X-axis
	for(i=1; i<y_axis_distance_grid_lines; i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		config.context.strokeStyle = "#000000";

		// Draw a tick mark 6px long (-3 to 3)
		config.context.moveTo(-config.grid_size*i+0.5, -3);
		config.context.lineTo(-config.grid_size*i+0.5, 3);
		config.context.stroke();

		// Text value at that point
		config.context.font = '18px Arial';
		config.context.textAlign = 'end';
		config.context.fillText(-x_axis_starting_point.number*i + x_axis_starting_point.suffix, -config.grid_size*i+3, 15);
	}

	// Ticks marks along the positive Y-axis
	// Positive Y-axis of graph is negative Y-axis of the canvas
	for(i=1; i<(num_lines_x - x_axis_distance_grid_lines); i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		config.context.strokeStyle = "#000000";

		// Draw a tick mark 6px long (-3 to 3)
		config.context.moveTo(-3, config.grid_size*i+0.5);
		config.context.lineTo(3, config.grid_size*i+0.5);
		config.context.stroke();

		// Text value at that point
		config.context.font = '18px Arial';
		config.context.textAlign = 'start';
		config.context.fillText(-y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, config.grid_size*i+3);
	}

	// Ticks marks along the negative Y-axis
	// Negative Y-axis of graph is positive Y-axis of the canvas
	for(i=1; i<x_axis_distance_grid_lines; i++) {
		config.context.beginPath();
		config.context.lineWidth = 1;
		config.context.strokeStyle = "#000000";

		// Draw a tick mark 6px long (-3 to 3)
		config.context.moveTo(-3, -config.grid_size*i+0.5);
		config.context.lineTo(3, -config.grid_size*i+0.5);
		config.context.stroke();

		// Text value at that point
		config.context.font = '18px Arial';
		config.context.textAlign = 'start';
		config.context.fillText(y_axis_starting_point.number*i + y_axis_starting_point.suffix, 8, -config.grid_size*i+3);
	}
}

exports.draw = draw;