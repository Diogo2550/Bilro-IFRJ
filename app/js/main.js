require('./types/command');
const { CommandEnum } = require("./types/command");

const { canvas } = require('./modules/canvas/screen.js');
const Drawner = require('./modules/drawing/drawer.js');

/** @type {Array<Command>} */
let commandos = [
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
			y: 4
		}
	},
	{
		command: CommandEnum.SWAP,
		bilros: [2, 3]
	}
];


const desenhista = new Drawner(canvas, commandos);
desenhista.init();