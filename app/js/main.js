const { executeBilro } = require('./modules/execute');

require('./types/command');
const { CommandEnum } = require("./types/command");

const { canvas } = require('./modules/canvas/screen.js');
const Drawner = require('./modules/drawing/drawer.js');

window.executeBilro = executeBilro;

const codeInput = document.getElementById("code-input");
codeInput.addEventListener('keydown', event => {
	const keyName = event.key;
	if (keyName === "Enter") {
		if(!executeBilro()) {
			event.preventDefault();
		}
	}
});
/*
/** @type {Array<Command>} *
let commandos = [
	{
		command: CommandEnum.PIN,
		element: 'alfinete',
		point: {
			x: 1,
			y: 1
		}
	},
	{
		command: CommandEnum.PIN,
		element: 'alfinete',
		point: {
			x: 3,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		element: 'alfinete',
		point: {
			x: 5,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		element: 'alfinete',
		point: {
			x: 7,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		element: 'alfinete',		
		point: {
			x: 2,
			y: 2
		}
	},
	{
		command: CommandEnum.PIN,
		element: 'alfinete',		
		point: {
			x: 4,
			y: 2
		}
	},
	{
		command: CommandEnum.PIN,
		element: 'bilro',
		target: 1
	},
	{
		command: CommandEnum.PIN,
		element: 'bilro',
		target: 2
	},
	{
		command: CommandEnum.PIN,
		element: 'bilro',
		target: 3
	},
	{
		command: CommandEnum.SWAP,
		bilros: ['B', 'C']
	},
	{
		command: CommandEnum.SWAP,
		bilros: ['D', 'E']
	},
	{
		command: CommandEnum.SWAP,
		bilros: ['A', 'B']
	} 
];
*/

const desenhista = new Drawner(canvas);
window.drawner = desenhista;
desenhista.init();

setTimeout(() => {
	document.querySelector('#code-input').value = document.querySelector('#code-input').value?.trim();
	document.querySelector('#code-input').dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
}, 300);