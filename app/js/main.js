const { executeBilro } = require('./modules/bilro-execute');

require('./types/command');
const { CommandEnum } = require("./types/command");

const { canvas } = require('./modules/canvas/screen.js');
const Drawner = require('./modules/drawing/drawer.js');

window.executeBilro = executeBilro;

/** @type {Array<Command>} */
let commandos = [
	{
		command: CommandEnum.PIN,
		point: {
			x: 1,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		point: {
			x: 3,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		point: {
			x: 5,
			y: 1
		}		
	},
	{
		command: CommandEnum.PIN,
		point: {
			x: 2,
			y: 2
		}
	},
	{
		command: CommandEnum.PIN,
		point: {
			x: 4,
			y: 2
		}
	},
	{
		command: CommandEnum.SWAP,
		bilros: ['A', 'B']
	}
];


const desenhista = new Drawner(canvas, commandos);
desenhista.drawing_loop();
desenhista.init();
