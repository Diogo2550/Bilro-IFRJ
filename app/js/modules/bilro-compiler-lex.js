const { isNumber, isString } = require("lodash");

const keyWords = ['alfinete', 'bilros', 'coloque', 'em', 'e', 'troque'];
const wordRegex = /^[a-z0-9]+/;
const whiteSpace = /^[\n\f\t\s\r\v]+/

/**
	@description Analise lexica -> Captura todos os tokens validos.
	@returns tokens e erros capturados.
*/
const lex = (input) => {
	let tokens = [];
	let errors = [];
	while(input){
		input = input.replace(whiteSpace, "");
		word = input.match(wordRegex);
		if (word){
			word = word[0].toLowerCase();
			input = input.replace(wordRegex, "");
			if (keyWords.includes(word)){
				tokens.push({
					word: word,
					type: word
				})
			}
			else if (isNumber(word)){
				tokens.push({
					word: word,
					type: "NUMERO"
				});
			}
			else {
				tokens.push({
					word: word,
					type: "LETRA"
				});
			}
			continue;
		}
		error = input.match(/^./);
		input = input.replace(/^./, "");
		errors.push("Caracter "+error+" não esperado!");
	}
	console.log(tokens)
	console.log(errors);
	return [tokens, errors];
}

exports.lex = lex;