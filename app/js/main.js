const { executeBilro } = require('./modules/bilro-execute');

require('./types/command');
const { CommandEnum } = require("./types/command");

const { canvas } = require('./modules/canvas/screen.js');
const Drawner = require('./modules/drawer/drawer.js');

/** @type {Array<Command>} */
let commandos = [
	{
		command: CommandEnum.PIN,
		point: {
			x: 10,
			y: 10
		}		
	},
	{
		command: CommandEnum.PIN,
		point: {
			x: 11,
			y: 10
		}
	},
	{
		command: CommandEnum.SWAP,
		bilros: [2, 3]
	}
];


const desenhista = new Drawner(canvas, commandos);
desenhista.run();

window.executeBilro = executeBilro;