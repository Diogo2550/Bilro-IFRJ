const { CommandEnum } = require("../../types/command");
const { VectorMath } = require("../utils/vector-math");
const { pointToCanvas, canvasToGrid } = require("../canvas/_canvas-functions");
const { Pin } = require("./pin");

const colors = [
	'white', 
	'green', 
	'red', 
	'blue', 
	'yellow', 
	'orange',
	'purple',
	'cyan'
];

//const pin_ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const pin_ids = ['a0', 'a1', 'b0', 'b1', 'c0', 'c1', 'd0', 'd1', 'e0', 'e1', 'f0', 'f1'];

class Drawner {
	
	constructor(canva) {
		/** @type {HTMLCanvasElement} */
		this.canva = canva;
		/** @type {CanvasRenderingContext2D} */
		this.ctx = canva.getContext('2d');
		/** @type {Array<import("../../types/command").Command>} */
		this.commands = [];
		/** @type {Array<Pin>} */
		this.pins = [];
		
		this.drawing_loop = this.update.bind(this);
	}
	
	init() {		
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
		/** @type {Point} vetor que leva do ponto inicial à troca */
		let p_final = null;
		/** @type {Point} posição final que a troca será fixada */
		let p_troca = null;
		
		let b1 = this.getPathById(command.bilros[0]);
		let b2 = this.getPathById(command.bilros[1]);
		
		// [2] processamento
		// ponto de encontro
		p_final = VectorMath.sub(canvasToGrid(b2.top), canvasToGrid(b1.top));
		// é necessário dividir por 2 pois o ponto será no meio de ambos
		p_final.x = Math.floor(p_final.x / 2);
		// é necessário somar 1 pois o próximo nível sempre será 1 abaixo
		p_final.y += 1;
		
		// A partir do b1, o ponto de troca será b1 + p_final
		p_troca = VectorMath.add(canvasToGrid(b1.top), p_final);
		
		b1.parent.incrementBilro(command.bilros[0], p_troca);
		b2.parent.incrementBilro(command.bilros[1], p_troca);
	}
	
	sendCommands(commands) {
		this.commands = commands;
		this.pin_count = 0;
		this.bilro_index = 0;
		this.pins = [];
		
		this.commands.forEach(command => {
			this.executeCommand(command);
		});
	}
	
	createPin(position) {
		this.pins.push(new Pin(pin_ids[this.pin_count++], position, this.ctx, this.pin_image));
	}
	
	/** @param {import("../../../app/js/types/command").Command} command */
	executeCommand(command) {
		switch(command.command) {
			case CommandEnum.PIN:
				if(command.element === 'alfinete') {
					this.createPin(command.point);
				} else if(command.element === 'bilros') {
					this.getPinById(command.target).addBilro( 
						colors[this.bilro_index++]
					);
				} else {
					console.error('Elemento inválido');
				}
				break;
				
			case CommandEnum.SWAP:
				this.swapBilro(command);
				break;
				
			default:
				alert('Comando inválido!');
		}
	}
	
	getPinById(id) {
		return this.pins.find(pin => pin.id == id);
	}
	
	/** @returns {import("../../types/path").Bilro} */
	getPathById(id) {
		return this.pins.find(pin => pin.hasBilroId(id))?.getPathById(id);
	}
	
}

module.exports = Drawner;
