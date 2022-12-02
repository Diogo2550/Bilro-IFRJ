const { lex } = require('./lexical');
const { syn } = require('./syntatic');
const { sem } = require('./semantic');

const compile = (input) => {
	//Analise lexica
	const [tokens, lexError] = lex(input);
	console.log(tokens)
	//Analise sintatica
	const [tree, synError] = syn(tokens);
	//Analise semantica
	const semError = sem(tree);

	const error = lexError/*||synError*/||semError;

	return [tree, error];
}

exports.compile = compile;