const wordRegex = /^[a-zA-Z0-9&]+/;
const whiteSpaceRegex = /^[\n\f\t\s\r\v]+/
const idPinRegex = /^[0-9]+$/
const idBilroRegex = /^[a-z][01]$/

/**
	@description Analise lexica -> Captura todos os tokens validos.
	@returns tokens e erros capturados.
*/
const lex = (input) => {
	let tokens = [];
	while(input.length){
		whiteSpace = input.match(whiteSpaceRegex);
		if (whiteSpace){
			input = input.replace(whiteSpaceRegex, '');
			continue;
		}

		word = input.match(wordRegex);
		if (word){
			word = word[0].toLowerCase();
			
			input = input.replace(wordRegex, '');

			if (word.match(idPinRegex))
				tokens.push({
					word: word,
					tokenType: "ID_ALFINETE"
				});
			else if (word.match(idBilroRegex))
				tokens.push({
					word: word,
					tokenType: "ID_BILROS"
				});
			else 
				tokens.push({
					word: word,
					tokenType: "KEYWORD"
				});
			continue;
		}
		error = input.match(/^./);
		throw "Caracter "+error+" não esperado!";
	}
	return tokens.reverse();
}

exports.lex = lex;