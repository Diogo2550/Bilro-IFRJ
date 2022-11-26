const { pointToCanvas, canvasToGrid } = require("../canvas/_canvas-functions");
const { VectorMath } = require("../utils/vector-math");

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
	constructor(id, position, ctx, image_url) {
		this.id = id;
		
		this.position = position;
		this.ctx = ctx;
		this.sprite = image_url;
		/** @type {Array<import("../../types/path").LinePath>} */
		this.paths = [];
		this.has_bilros = false;
		
		this.sprite = new Image();
		this.sprite.src = 'assets/img/alfinete.png';
		
		this.bootstrap();
	}
	
	draw() {
		if(this.has_bilros) {
			this.drawBilros();
		}
		this.drawPin();
	}
	
	addBilros(path_left_name, path_right_name, bilro_color = '#fff') {
		this.path_left_name = path_left_name;
		this.path_right_name = path_right_name;
		this.bilro_color = bilro_color;
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
		ctx.beginPath();
		
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
				
				let curve_position = {
					x: path.position.from.x + config.line_offset,
					y: path.position.to.y
				};
				switch(path.cur_dir) {
					case 'top':
						curve_position.y = curve_position.y - config.line_offset * 1.5;
						break;
						
					case 'bottom':
						curve_position.y = curve_position.y + config.line_offset * 1.5;
						break;
						
					case 'left':
						curve_position.x = curve_position.x - config.line_offset * 1.5;
						break;
					
					case 'right':
						curve_position.x = curve_position.x + config.line_offset * 1.5;
						break;
				}
				
				ctx.quadraticCurveTo(
					curve_position.x, curve_position.y, 
					path.position.to.x, path.position.to.y
				);
			}
			
			if(i == this.paths.length - 1) {
				ctx.font = '16px arial';
				ctx.fillStyle = '#CCC';
				ctx.textAlign = 'center';
				ctx.fillText(this.path_right_name, path.position.to.x, path.position.to.y + 18);					
			}
		}
		
		ctx.font = '16px arial';
		ctx.fillStyle = '#CCC';
		ctx.textAlign = 'center';	
		ctx.fillText(this.path_left_name, this.paths[0].position.from.x, this.paths[0].position.from.y + 18);
		
		// [3] desenho
		ctx.strokeStyle = this.bilro_color;
		ctx.stroke();
		
		// [4] texto
		ctx.font = '16px arial';
		ctx.fillStyle = '#CCC';
		ctx.textAlign = 'center';
		ctx.fillText(this.id, position.x, position.y + 18);
		
	}
	
	bootstrap() {
		let position = pointToCanvas(this.position);
		
		/** @type {import("../../types/path").LinePath} */
		let p1 = {
			type: 'line',
			parent: this,
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
			parent: this,
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
			parent: this,
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
		
		this._addPath(p1);
		this._addPath(p2);
		this._addPath(p3);
	}
	
	_addPath(path, start = false) {
		let from = path.position.from;
		let to = path.position.to;
		
		if(from.y > to.y) {
			path.top = to;
			path.bottom = from;
		} else {
			path.top = from;
			path.bottom = to;
		}
		
		if(start) {
			this.paths.unshift(path)
		} else {
			this.paths.push(path);			
		}
	}
	
	hasBilroId(id) {
		if(this.path_left_name === id || this.path_right_name === id)
			return true;
		return false;
	}
	
	getBilroById(id) {
		if(this.path_left_name === id) {
			return this.paths[0];
		} else if(this.path_right_name === id) {
			return this.paths[this.paths.length - 1];
		}
		return null;
	}
	
	getGridPosition() {
		return this.position;
	}
	
	incrementBilro(path_name, p_final) {
		if(!this.hasBilroId(path_name))
			return;
			
		let path = this.getBilroById(path_name);
		let left_to_right = VectorMath.sub(p_final, canvasToGrid(path.top)).x > 0;
		if(path_name === this.path_left_name) {
			// em caso de esqueda, pega o início
			path.position.from = pointToCanvas(p_final);
			
			this._addPath({
				parent: this,
				type: 'curve',
				cur_dir: 'left',
				position: {
					from: path.position.from,
					to: {
						x: path.position.from.x + (config.line_offset / 2 * (left_to_right ? 1 : -1)),
						y: path.position.from.y + config.line_offset
					}
				}
			}, true);
			this._addPath({
				parent: this,
				type: 'line',
				position: {
					from: {
						x: path.parent.paths[0].position.to.x,
						y: path.parent.paths[0].position.to.y + config.line_size / 2
					},
					to: path.parent.paths[0].position.to
				}
			}, true);
		} else {
			// em caso de direita, pega o fim
			path.position.to = pointToCanvas(p_final);
			
			this._addPath({
				parent: this,
				type: 'curve',
				cur_dir: 'left',
				position: {
					from: {
						x: path.position.to.x + config.line_offset * (left_to_right ? 1 : -1),
						y: path.position.to.y + config.line_offset
					},
					to: {
						x: path.position.to.x,
						y: path.position.to.y
					}
				}
			});
			this._addPath({
				parent: this,
				type: 'line',
				position: {
					from: path.parent.paths[path.parent.paths.length - 1].position.from,
					to: {
						x: path.parent.paths[path.parent.paths.length - 1].position.from.x,
						y: path.parent.paths[path.parent.paths.length - 1].position.from.y + config.line_size / 2
					}
				}
			});
		}
	}
	
}

exports.Pin = Pin;