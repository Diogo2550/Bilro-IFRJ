const { isEmpty } = require("lodash");

const nextToken = tokens => tokens.length ? tokens.pop() : {tokenType: ""};

//COLOCA -> coloque alfinete
//COLOCA -> coloque bilros em NÚMERO
const COLOCA = tokens => {
	const next = nextToken(tokens);
	if(next.tokenType == "bilros"){
		if (nextToken(tokens).tokenType == "em"){
			const numero = nextToken(tokens);
			if (numero.tokenType == "NUMERO")
				return {
					command: "coloque",
					element: "bilro",
					target: numero.word
				}
			else
				//falta numero
				return {
					command: "error",
					message: ""
				}
		}
		else
			//falta em
			return {
				command: "error",
				message: ""
			}
	}
	else if (next.tokenType == "alfinete")
		return {
			command: "coloque",
			element: "alfinete"
		}
	else
		//falta oque
		return {
			command: "error",
			message: ""
		};
}

//TROCA -> troque LETRA e LETRA
const TROCA = tokens => {
	const letra1 = nextToken(tokens);
	if(letra1.tokenType == 'LETRA'){
		if(nextToken(tokens).tokenType == '&'){
			const letra2 = nextToken(tokens);
			if(letra2.tokenType = 'LETRA')
				return {
					command: 'troque',
					bilros: [letra1.word, letra2.word]
				}
			else
				//troca precisa de bilros
				return {
					command: "error",
					message: ""
				}
		}
		else
			//falta e
			return {
				command: "error",
				message: ""
			}
	}
	else{
		//troca precisa de bilros
		return {
			command: "error",
			message: ""
		}
	}
}

//AÇÃO -> COLOCA
//AÇÃO -> TROCA
const ACAO = tokens => {
	const first = nextToken(tokens);
	if (first.tokenType == "coloque")
		return COLOCA(tokens);
	else if (first.tokenType == "troque")
		return TROCA(tokens);
	else 
		//falta coloque ou troque
		return {
			command: "error",
			message: ""
		}
}

//ALGORITMO -> AÇÃO
//ALGORITMO -> AÇÃO ALGORITMO
const ALGORITMO = tokens => {
	let listACAO = []
	while(tokens.length)
		listACAO.push(ACAO(tokens));
	const errors = listACAO
		.filter(elem => elem.command == "error")
	const nodes = listACAO
		.filter(elem => elem.command != "error")
	return [nodes, errors];
}

/**
	@description Analise sintatica -> Verifica a sintaxe a partir de tokens capturados na Analise lexica.
	@returns arvore sintatica e erros capturados.
*/
const syn = tokens => ALGORITMO(tokens);

exports.syn = syn;