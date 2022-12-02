const { compile } = require('./compiler')

const pin_positions = [
	{x: 1, y: 1}, 
	{x: 3, y: 1},
	{x: 5, y: 1},
	{x: 7, y: 1},
	{x: 9, y: 1},
	{x: 11, y: 1}
];
let current_pin = 0;

const treeConverter = (tree) => {
	let final_tree = [];
	
	tree.forEach(command => {
		if(command.element === 'alfinete') {
			command.point = pin_positions[current_pin++];
		}
		if(command.bilros) {
			for(let i = 0; i < command.bilros.length; i++) {
				command.bilros[i] = command.bilros[i].toUpperCase();
			}
		}
	});

	return tree;
};

const executeBilro = () => {
	const input = document.getElementById("code-input");
	const [algorithm, error] = compile(input.value);
	current_pin = 0;
	
	if (error){
		//exibe erros
		alert(error)
	}
	else{
		//parte grafica
		let tree = treeConverter(algorithm);
		window.drawner.sendCommands(tree);
	}
}

exports.executeBilro = executeBilro;