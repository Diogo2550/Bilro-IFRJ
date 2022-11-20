

const { CommandEnum } = require("../../types/command");

class Drawner {
	
	constructor(canva, commands) {
		this.canva = canva;
		this.ctx = canva.getContext('2d');
		/** @type {Array<import("../../types/command").Command>} */
		this.commands = commands;
	}
	
	run() {
		this.commands.forEach(command => {
			switch(command.command) {
				case CommandEnum.PIN:
					this.putPin(command);
					break;
					
				case CommandEnum.SWAP:
					this.swapBilro(command);
					break;
					
				default:
					alert('Comando inválido!');
			}
		});
	}
	
	/** @param {import("../../types/command").Command} command */
	putPin(command) {
		const img = document.getElementById('alfinete');
		this.drawImage(img, command.point.x)
	}
	
	swapBilro(command) {
		console.log(command);
	}
	
	/** generics */
	drawImage(img, x, y) {
		this.ctx.drawImage(img, x, y);
	}
	
}

module.exports = Drawner;