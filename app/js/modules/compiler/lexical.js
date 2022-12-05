const keyWords = ['alfinete', 'bilros', 'coloque', 'em', '&', 'troque'];
const wordRegex = /^[a-zA-Z0-9&]+/;
const whiteSpace = /^[\n\f\t\s\r\v]+/

/**
	@description Analise lexica -> Captura todos os tokens validos.
	@returns tokens e erros capturados.
*/
const lex = (input) => {
	let tokens = [];
	let errors = [];
	while(input.length){
		input = input.replace(whiteSpace, '');

		word = input.match(wordRegex);
		if (word){
			word = word[0].toLowerCase();
			
			input = input.replace(wordRegex, '');

			if (keyWords.includes(word))
				tokens.push({
					word: word,
					tokenType: word
				});
			else if (word.match(/^[0-9]+$/))
				tokens.push({
					word: word,
					tokenType: "ID_ALFINETE"
				});
			else if (word.match(/^[a-z][01]$/))
				tokens.push({
					word: word,
					tokenType: "ID_BILROS"
				});
			else 
				tokens.push({
					word: word,
					tokenType: word
				});
			continue;
		}
		error = input.match(/^./);
		throw "Caracter "+error+" não esperado!";
	}
	return tokens.reverse();
}

exports.lex = lex;