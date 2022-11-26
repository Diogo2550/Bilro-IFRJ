const { pointToCanvas } = require("../canvas/_canvas-functions");

const config = {
	line_offset: 10,
	line_size: 80,
	line_color: '#ffffff'
};

class Pin {
	
	/** 
	 * @param {Point} position 
	 * @param {CanvasRenderingContext2D} ctx 
	 * @param {string} image_url */
	constructor(id, position, ctx, image_url, path_left, path_right) {
		this.id = id;
		
		this.position = position;
		this.ctx = ctx;
		this.sprite = image_url;
		/** @type {Array<import("../../types/path").LinePath>} */
		this.paths = [];
		this.has_bilros = false;
		
		this.sprite = new Image();
		this.sprite.src = 'assets/img/alfinete.png';
		this.path_left = path_left;
		this.path_right = path_right;
		
		this.bootstrap();
	}
	
	draw() {
		if(this.has_bilros) {
			this.drawBilros();
		}
		this.drawPin();
	}
	
	addBilros() {
		this.has_bilros = true;
	}
	
	/** @param {HTMLImageElement} img */
	drawPin() {
		let position = pointToCanvas(this.position);
		
		position = {
			x: position.x - this.sprite.width / 2,
			y: position.y - this.sprite.height / 2
		}
		
		// Adiciona o sprite (é necessário esperar o load)		
		this.ctx.drawImage(this.sprite, position.x, position.y);
	}
	
	drawBilros() {
		// [1] atribuições
		const ctx = this.ctx;
		let position = pointToCanvas(this.position);
		ctx.moveTo(this.paths[0].position.from.x, this.paths[0].position.from.y);
		ctx.lineTo(this.paths[0].position.to.x, this.paths[0].position.to.y);
		
		// [2] processamento
		for (let i = 1; i < this.paths.length; i++) {
			let path = this.paths[i];
			
			if(path.type === 'line') {
				ctx.moveTo(path.position.from.x, path.position.from.y);
				ctx.lineTo(path.position.to.x, path.position.to.y);
			} else {
				ctx.moveTo(path.position.from.x, path.position.from.y);
				
				let cPosition = {
					x: position.x,
					y: path.position.to.y
				};
				switch(path.cur_dir) {
					case 'top':
						cPosition.y = cPosition.y - config.line_offset * 1.5;
						break;
						
					case 'bottom':
						cPosition.y = cPosition.y + config.line_offset * 1.5;
						break;
						
					case 'left':
						cPosition.y = cPosition.x - config.line_offset * 1.5;
						break;
					
					case 'right':
						cPosition.y = cPosition.x + config.line_offset * 1.5;
						break;
				}
				
				ctx.quadraticCurveTo(
					cPosition.x, cPosition.y, 
					path.position.to.x, path.position.to.y
				);
			}
		}
		
		// [3] desenho
		ctx.strokeStyle = config.line_color;
		ctx.stroke();
	}
	
	bootstrap() {
		let position = pointToCanvas(this.position);
		
		/** @type {import("../../types/path").LinePath} */
		let p1 = {
			type: 'line',
			position: {
				from: {
					x: position.x - config.line_offset,
					y: position.y + config.line_size
				},
				to: {
					x: position.x - config.line_offset,
					y: position.y
				}				
			}
		}
		
		/** @type {import("../../types/path").LinePath} */
		let p2 = {
			type: 'curve',
			cur_dir: 'top',
			position: {
				from: {
					x: position.x - config.line_offset,
					y: position.y
				},
				to: {
					x: position.x + config.line_offset,
					y: position.y
				}
			}
		};
		
		/** @type {import("../../types/path").LinePath} */
		let p3 = {
			type: 'line',
			position: {
				from: {
					x: position.x + config.line_offset,
					y: position.y
				},
				to: {
					x: position.x + config.line_offset,
					y: position.y + config.line_size
				}
			}
		};
		
		this.paths.push(p1);
		this.paths.push(p2);
		this.paths.push(p3);
	}
	
	getBilroById(id) {
		if(this.path_left === id) {
			return this.paths[0];
		} else if(this.path_right === id) {
			return this.paths[this.paths.length - 1];
		}
		return null;
	}
	
}

exports.Pin = Pin;