const { CommandEnum } = require("../../types/command");
const { VectorMath } = require("../utils/vector-math");
const { pointToCanvas, canvasToGrid } = require("../canvas/_canvas-functions");
const { Pin } = require("./pin");
const { canvas_config } = require('./../canvas/screen');

const colors = [
	'pink', 
	'green', 
	'red', 
	'blue', 
	'yellow', 
	'orange',
	'purple',
	'cyan',
	'cadet-blue',
	'brown',
	'crimson',
	'coral',
	'darkslateblue'
];

var bilro_ids = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var pin_ids = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

// deixa os ids minusculos 
//bilro_ids.forEach((el, index) => { bilro_ids[index] = el.toLowerCase() });

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
		
		if(b1.top.y < b2.top.y) {
			let c = b1;
			b1 = b2;
			b2 = c;
			
			c = command.bilros[0];
			command.bilros[0] = command.bilros[1];
			command.bilros[1] = c;
		}
		
		let b1_top = canvasToGrid(b1.top);
		let b2_top = canvasToGrid(b2.top);
		
		// [2] processamento
		// ponto de encontro
		p_final = VectorMath.sub(b2_top, b1_top);
		// é necessário dividir por 2 pois o ponto será no meio de ambos
		if(b1_top.y - b2_top.y == 0) {
			p_final.x = Math.floor(p_final.x / 2);			
		}
		
		/** ATENÇÃO
		 * Gambiarra para resolver o problema das trocas no mesmo ponto que não foi planejado
		 * inicialmente. Esta lógica NÃO É CONFIÁVEL visto se a escala da grid diminuir não irá funcionar!!!
		 */		
		if(Math.abs(b1_top.x - b2_top.x) < .5) {
			// Ta no mesmo alfinete
			p_final.y += .2;
		} else if(Math.abs(b1_top.y - b2_top.y) >= 1) {
			p_final.y += 2;
		} else {
			// Tá em alfinetes diferentes. É necessário somar 1 pois o próximo nível sempre será 1 abaixo
			p_final.y += 1;
		}
		
		// A partir do b1, o ponto de troca será b1 + p_final
		p_troca = VectorMath.add(b1_top, p_final);
		
		if(command.bilros[0] === 'A0') {
			console.log(b1_top, b2_top, p_troca);
		}
		
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
						bilro_ids[this.bilro_index],
						colors[this.bilro_index]
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
		return this.pins.find(pin => pin.id == id);
	}
	
	/** @returns {import("../../types/path").LinePath} */
	getPathById(id) {
		return this.pins.find(pin => pin.hasBilroId(id))?.getPathById(id);
	}
	
}

module.exports = Drawner;
