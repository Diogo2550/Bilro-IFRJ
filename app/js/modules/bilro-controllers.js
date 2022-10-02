const { resetPressed, cy } = require('./bilro-ui');
const $ = require('jquery');

var _creating_line = false;

$('body').on('click', '.tools .btn', function() {
	const _this = $(this);
	let tool_type = _this.data('tool');
	
	switch(tool_type) {
		case 'line-create':
			createLine(_this.data('color'));
			break;
		default:
			console.error('Não foi especificado o que deve ser feito com uma ferramenta do tipo ' + tool_type);
	}
});

function createLine(color) {
	resetPressed();
	
	_creating_line = true;
}

cy.on('vmousedown', 'node', function() {	
	if(!_creating_line) return;
	var _this = $(this);
	
	
	_creating_line = false;
});