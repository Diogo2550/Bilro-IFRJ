const { lex } = require('./bilro-compiler-lex');
const { syn } = require('./bilro-compiler-syn');
const { sem } = require('./bilro-compiler-sem');

const compile = (input) => {
	//Analise lexica
	const [tokens, lexErrors] = lex(input);
	//Analise sintatica
	const [tree, synErrors] = syn(tokens);
	//Analise semantica
	//const semErrors = sem(tree);

	const errors = lexErrors+synErrors//+semErrors;
	const algorithm = [];
	return [/*algorithm*/tree, errors];
}

exports.compile = compile;