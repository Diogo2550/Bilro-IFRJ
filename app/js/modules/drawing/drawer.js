const { CommandEnum } = require("../../types/command");
const { VectorMath } = require("../utils/vector-math");
const { pointToCanvas } = require("../canvas/_canvas-functions");
const { Pin } = require("./pin");

const pins_preset = [
	{left: 'A', right: 'B', color: 'white'}, 
	{left:'C', right: 'D', color: 'green'}, 
	{left: 'E', right: 'F', color: 'red'}, 
	{left: 'G', right: 'H', color: 'blue'}, 
	{left: 'I', right: 'J', color: 'yellow'}, 
	{left: 'K', right:'L', color: 'orange'},
	{left: 'M', right: 'N', color: 'purple'},
	{left: 'O', right: 'P', color: 'cyan'},
	{left: 'Q', right: 'R', color: ''},
	{left: 'S', right: 'T', color: ''},
	{left: 'U', right: 'V', color: ''},
	{left: 'W', right: 'X', color: ''},
	{left: 'Y', right: 'Z', color: ''}
];

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
		
		this.pin_count = 1;
		this.bilro_index = 0;
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
		/** @type {Point} vetor que leva do ponto inicial à troca */
		let p_final = null;
		/** @type {Point} posição final que a troca será fixada */
		let p_troca = null;
		
		let b1 = this.getBilroById(command.bilros[0]);
		let b2 = this.getBilroById(command.bilros[1]);
		
		// [2] processamento
		// ponto de encontro
		p_final = VectorMath.sub(b2.parent.getGridPosition(), b1.parent.getGridPosition());
		// é necessário dividir por 2 pois o ponto será no meio de ambos
		p_final.x = Math.floor(p_final.x / 2);
		// é necessário somar 1 pois o próximo nível sempre será 1 abaixo
		p_final.y += 1;
		
		// A partir do b1, o ponto de troca será b1 + p_final
		p_troca = VectorMath.add(b1.parent.position, p_final);
		
		b1.parent.incrementBilro(command.bilros[0], p_troca);
		b2.parent.incrementBilro(command.bilros[1], p_troca);
	}
	
	createPin(position) {
		this.pins.push(new Pin(this.pin_count++, position, this.ctx, this.pin_image));
	}
	
	/** @param {import("../../../app/js/types/command").Command} command */
	executeCommand(command) {
		switch(command.command) {
			case CommandEnum.PIN:
				if(command.element === 'alfinete') {
					this.createPin(command.point);
				} else if(command.element === 'bilro') {
					this.getPinById(command.target).addBilros(
						pins_preset[this.bilro_index].left, 
						pins_preset[this.bilro_index].right, 
						pins_preset[this.bilro_index].color
					);
					this.bilro_index++;
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
		return this.pins.find(pin => pin.id === id);
	}
	
	/** @returns {import("../../types/path").LinePath} */
	getBilroById(id) {
		return this.pins.find(pin => pin.hasBilroId(id))?.getBilroById(id);
	}
	
}

module.exports = Drawner;