const { lex } = require('./lexical');
const { syn } = require('./syntatic');
const { sem } = require('./semantic');

const compile = (input) => {
	//Analise lexica
	const tokens = lex(input);
	//Analise sintatica
	const tree = syn(tokens);
	//Analise semantica
	const algorithm = sem(tree);

	return algorithm;
}

exports.compile = compile;