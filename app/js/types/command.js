require("./point");

/** 
 * @typedef {{ 
 * 	command: string, 
 * 	point?: Point,
 * 	bilros?: Array<number,number> 
 * }} Command 
 */

/**
 * @enum
 */
export const CommandEnum = {
	PIN: 'coloque',
	SWAP: 'troque',
};
