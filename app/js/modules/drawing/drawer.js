const { Exception } = require("sass");
const { CommandEnum } = require("../../types/command");
const { Pin } = require("./pin");

const pin_names = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

class Drawner {
	
	constructor(canva, commands) {
		/** @type {HTMLCanvasElement} */
		this.canva = canva;
		/** @type {CanvasRenderingContext2D} */
		this.ctx = canva.getContext('2d');
		/** @type {Array<import("../../types/command").Command>} */
		this.commands = commands;
		/** @type {Array<Pin>} */
		this.pins = [];
		
		this.pin_count = 0;
		this.drawing_loop = this.update.bind(this);
	}
	
	init() {
		this.commands.forEach(command => {
			this.executeCommand(command);
		});
		
		window.requestAnimationFrame(this.drawing_loop);
	}
	
	update() {
		this.ctx.clearRect(0, 0, this.canva.width, this.canva.height);
		
		this.pins.forEach(pin => {
			pin.draw();
		});
		
		window.requestAnimationFrame(this.drawing_loop);
	}
	
	swapBilro(command) {
		// [1] declaração de variáveis
		let { bilros } = command;
		
		let b1 = this.getBilroById(command.pin[0]);
		let b2 = this.getBilroById(command.pin[1]);
		
		// [2] processamento
		console.log(b1);
		console.log(b2);
		
	}
	
	createPin(position) {
		this.pins.push(new Pin(pin_names[this.pin_count++], position, this.ctx, this.pin_image));
	}
	
	/** @param {import("../../../app/js/types/command").Command} command */
	executeCommand(command) {
		switch(command.command) {
			case CommandEnum.PIN:
				this.createPin(command.point);
				break;
				
			case CommandEnum.SWAP:
				this.swapBilro(command);
				break;
				
			case CommandEnum.PUT:
				if(command.elemento === 'alfinete') {
					console.log(this.getPinById(command.pin[0]))
				} else if(command.elemento === 'bilro') {
					console.log(this.getBilroById(command.pin[0]))
				} else {
					throw new Exception('Elemento inválido');
				}
				
			default:
				alert('Comando inválido!');
		}
	}
	
	getPinById(id) {
		return this.pins.find(pin => pin.id === id);
	}
	
	getBilroById(id) {
		return this.pins.find(pin => pin.getBilroById(id));
	}
	
}

module.exports = Drawner;