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
		/** @type {Array<import("../../types/path").Bilro>} */
		this.bilros = [];
		this.has_bilros = false;
		
		this.sprite = new Image();
		this.sprite.src = 'assets/img/alfinete.png';
	}
	
	draw() {
		this.bilros.forEach((bilro, index) => {
			this.drawBilro(bilro, index);
		});
		
		this.drawPin();
	}
	
	addBilro(bilro_id, bilro_color = '#fff') {
		/** @type {import("../../types/path").Bilro} bilro */
		let bilro = {
			path_left_name: bilro_id + 0,
			path_right_name: bilro_id + 1,
			paths: [],
			color: bilro_color
		};
		
		this.bilros.push(bilro);
	
		let paths = this.instantiateInitialBilros();
		paths.forEach(path => {
			this._addPathWithBoundings(path, bilro.path_left_name);
		});
	}
	
	/** @param {HTMLImageElement} img */
	drawPin() {
		let position = pointToCanvas(this.position);
		
		// label do alfinete
		this.ctx.font = '16px arial';
		this.ctx.fillStyle = '#333';
		this.ctx.textAlign = 'center';
		this.ctx.fillText(this.id, position.x, position.y + 24);	
		
		position = {
			x: position.x - this.sprite.width / 2,
			y: position.y - this.sprite.height / 2
		}
		
		// Adiciona o sprite (é necessário esperar o load)		
		this.ctx.drawImage(this.sprite, position.x, position.y);
	}
	
	drawBilro(bilro, bilro_index) {
		// [1] atribuições
		const ctx = this.ctx;
		let offset = bilro_index * 15;
		ctx.beginPath();
		
		// [extra] linha inicial
		ctx.moveTo(bilro.paths[0].position.from.x - offset, bilro.paths[0].position.from.y);
		ctx.lineTo(bilro.paths[0].position.to.x, bilro.paths[0].position.to.y);
		
		ctx.font = '16px arial';
		ctx.fillStyle = bilro.color;
		ctx.textAlign = 'center';	
		ctx.fillText(bilro.path_left_name, bilro.paths[0].position.from.x - offset * 1.5, bilro.paths[0].position.from.y + 18);
		
		// [2] processamento das linhas
		for (let i = 1; i < bilro.paths.length; i++) {
			let path = bilro.paths[i];
			
			if(path.type === 'line') {
				ctx.moveTo(path.position.from.x, path.position.from.y);
				
				if(i == bilro.paths.length - 1) {
					ctx.lineTo(path.position.to.x + offset, path.position.to.y);					
				} else {
					ctx.lineTo(path.position.to.x, path.position.to.y);
				}
			} else {
				ctx.moveTo(path.position.from.x, path.position.from.y);
				
				let curve_position = {
					x: path.position.from.x + config.line_offset,
					y: path.position.to.y
				};
				// Curvas (não muito funcional)
				switch(path.cur_dir) {
					case 'top':
						curve_position.y = curve_position.y - config.line_offset * 1.3;
						break;
						
					case 'bottom':
						curve_position.y = curve_position.y + config.line_offset * 1.3;
						break;
						
					case 'left':
						curve_position.x = curve_position.x - config.line_offset * 1.3;
						break;
					
					case 'right':
						curve_position.x = curve_position.x + config.line_offset * 1.3;
						break;
				}
				
				ctx.quadraticCurveTo(
					curve_position.x, curve_position.y, 
					path.position.to.x, path.position.to.y
				);
			}
			
			if(i == bilro.paths.length - 1) {
				ctx.font = '16px arial';
				ctx.fillStyle = bilro.color;
				ctx.textAlign = 'center';
				ctx.fillText(bilro.path_right_name, path.position.to.x + offset * 1.5, path.position.to.y + 18);					
			}
		}
		
		// [3] desenho
		ctx.strokeStyle = bilro.color;
		ctx.stroke();
	}
	
	instantiateInitialBilros() {
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
		
		return [p1, p2, p3];
	}
	
	_addPathWithBoundings(path, bilro_name, start = false) {
		let from = path.position.from;
		let to = path.position.to;
		let bilro = this.getBilroByPathId(bilro_name);
		
		if(from.y > to.y) {
			path.top = to;
			path.bottom = from;
		} else {
			path.top = from;
			path.bottom = to;
		}
		
		if(start) {
			bilro.paths.unshift(path)
		} else {
			bilro.paths.push(path);			
		}
	}
	
	hasBilroId(id) {		
		return this.bilros.findIndex(bilro => bilro.path_left_name === id || bilro.path_right_name === id) > -1;
	}
	
	/** @returns {import("../../types/path").Bilro} */
	getBilroByPathId(id) {
		return this.bilros.find(bilro => bilro.path_left_name === id || bilro.path_right_name === id);
	}
	
	/** @returns {import("../../types/path").LinePath} */
	getPathById(id) {
		let index = this.bilros.findIndex(bilro => bilro.path_left_name === id || bilro.path_right_name === id );
		
		if(index > -1) {
			if(this.bilros[index].path_left_name === id) {
				return this.bilros[index].paths[0];
			} else if(this.bilros[index].path_right_name === id) {
				return this.bilros[index].paths[this.bilros[index].paths.length - 1];
			}
		}
		return null;
	}
	
	getGridPosition() {
		return this.position;
	}
	
	incrementBilro(path_name, p_final) {
		if(!this.hasBilroId(path_name))
			return;
			
		let path = this.getPathById(path_name);
		let left_to_right = VectorMath.sub(p_final, canvasToGrid(path.top, true)).x > 0;
		let bilro = this.getBilroByPathId(path_name);
		
		if(path_name === bilro.path_left_name) {
			// em caso de esqueda, pega o início
			path.position.from = pointToCanvas(p_final);
			
			this._addPathWithBoundings({
				parent: this,
				type: 'curve',
				cur_dir: 'left',
				position: {
					from: {
						x: path.position.from.x + (config.line_offset * (left_to_right ? 1 : -1)),
						y: path.position.from.y + config.line_offset
					},
					to: path.position.from
				}
			}, path_name, true);
			this._addPathWithBoundings({
				parent: this,
				type: 'line',
				position: {
					from: {
						x: bilro.paths[0].position.to.x + config.line_offset * (left_to_right ? 1 : -1),
						y: bilro.paths[0].position.to.y + config.line_size / 2
					},
					to: bilro.paths[0].position.from					
				}
			}, path_name, true);
		} else {
			// em caso de direita, pega o fim
			path.position.to = pointToCanvas(p_final);
			
			this._addPathWithBoundings({
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
			}, path_name);
			this._addPathWithBoundings({
				parent: this,
				type: 'line',
				position: {
					from: bilro.paths[bilro.paths.length - 1].position.from,
					to: {
						x: bilro.paths[bilro.paths.length - 1].position.from.x,
						y: bilro.paths[bilro.paths.length - 1].position.from.y + config.line_size / 2
					}
				}
			}, path_name);
		}
	}
	
}

exports.Pin = Pin;