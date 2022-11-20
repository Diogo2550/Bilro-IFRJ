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
					action: "colocar",
					elemento: "bilros",
					alfinete: numero.word
				}
			else
				//falta numero
				return {
					action: "error",
					message: ""
				}
		}
		else
			//falta em
			return {
				action: "error",
				message: ""
			}
	}
	else if (next.tokenType == "alfinete")
		return {
			action: "colocar",
			elemento: "alfinete"
		}
	else
		//falta oque
		return {
			action: "error",
			message: ""
		};
}

//TROCA -> troque LETRA e LETRA
const TROCA = tokens => {
	const letra1 = nextToken(tokens);
	if(letra1.tokenType == 'LETRA'){
		console.log("first")
		if(nextToken(tokens).tokenType == '&'){
			const letra2 = nextToken(tokens);
			if(letra2.tokenType = 'LETRA')
				return {
					acao: 'troca',
					bilros: [letra1.word, letra2.word]
				}
			else
				//troca precisa de bilros
				return {
					action: "error",
					message: ""
				}
		}
		else
			//falta e
			return {
				action: "error",
				message: ""
			}
	}
	else{
		//troca precisa de bilros
		return {
			action: "error",
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
			action: "error",
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
		.filter(elem => elem.action == "error")
	const nodes = listACAO
		.filter(elem => elem.action != "error")
	return [nodes, errors];
}

/**
	@description Analise sintatica -> Verifica a sintaxe a partir de tokens capturados na Analise lexica.
	@returns arvore sintatica e erros capturados.
*/
const syn = tokens => ALGORITMO(tokens);

exports.syn = syn;