const { isEmpty } = require("lodash");

const nextToken = tokens => tokens.length ? tokens.pop() : {tokenType: ""};

//COLOCAR -> coloque alfinete
//COLOCAR -> coloque bilros em NÚMERO
const COLOCAR = tokens => {
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

//TROCAR -> troque LETRA e LETRA
const TROCAR = tokens => {
	const letra1 = nextToken(tokens);
	if(letra1.tokenType == 'LETRA'){
		if(nextToken(tokens).tokenType == '&'){
			const letra2 = nextToken(tokens);
			if(letra2.tokenType = 'LETRA')
				return {
					command: 'troque',
					bilros: [
						letra1.word.toUpperCase(),
						letra2.word.toUpperCase()
					].sort()
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
		return COLOCAR(tokens);
	else if (first.tokenType == "troque")
		return TROCAR(tokens);
	else 
		//falta coloque ou troque
		return {
			command: "error",
			message: ""
		}
}

//ALGORITMO -> AÇÃO
//ALGORITMO -> AÇÃO ALGORITMO
const ALGORITMO = tokens => {//CORRIGIR (Formato e erros)
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