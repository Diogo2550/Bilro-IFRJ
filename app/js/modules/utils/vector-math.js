export class VectorMath {
	
	static sub(v1, v2) {
		return {
			x: v1.x - v2.x,
			y: v1.y - v2.y
		};
	}
	
	static add(v1, v2) {
		return {
			x: v1.x + v2.x,
			y: v1.y + v2.y
		};
	}
	
}