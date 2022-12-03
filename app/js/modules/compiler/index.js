const { lex } = require('./lexical');
const { syn } = require('./syntatic');
const { sem } = require('./semantic');

const compile = (input) => {
	//Analise lexica
	const tokens = lex(input);
	console.log(tokens)
	//Analise sintatica
	const tree = syn(tokens);
	//Analise semantica
	sem(tree);

	return tree;
}

exports.compile = compile;