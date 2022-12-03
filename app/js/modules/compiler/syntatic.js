const { isEmpty } = require("lodash");

const nextToken = tokens => tokens.length ? tokens.pop() : {tokenType: ""};

//COLOCAR -> coloque alfinete
//COLOCAR -> coloque bilros em NÚMERO
const COLOCAR = tokens => {
	const next = nextToken(tokens);
	if(next.tokenType == "bilros"){
		if (nextToken(tokens).tokenType == "em"){
			const idAlfinete = nextToken(tokens);
			if (idAlfinete.tokenType == "ID_ALFINETE")
				return {
					command: "coloque",
					element: "bilros",
					target: parseInt(idAlfinete.word)
				}
			else throw "Falta a identificação do alfinete!\nAdicione o identificador após \"em\".";
		}
		else throw "Um par de bilros deve ser colocado em um alfinete!\nAdicione \"em\" e o identificador do alfinete após \"bilros\".";
	}
	else if (next.tokenType == "alfinete")
		return {
			command: "coloque",
			element: "alfinete"
		}
	else throw "Falta o que vai ser colocado!\nAdicione \"alfinete\" ou \"bilros\" após \"coloque\".";
}

//TROCAR -> troque LETRA e LETRA
const TROCAR = tokens => {
	const idBIlros1 = nextToken(tokens);
	if(idBIlros1.tokenType == 'ID_BILROS'){
		if(nextToken(tokens).tokenType == '&'){
			const idBIlros2 = nextToken(tokens);
			if(idBIlros2.tokenType = 'ID_BILROS')
				return {
					command: 'troque',
					bilros: [
						idBIlros1.word.toUpperCase(),
						idBIlros2.word.toUpperCase()
					].sort()
				}
			else throw "Um bilro não troca sozinho!\nAdicione o identificador de outro bilro após \"&\".";
		}
		else throw "Um bilro não troca sozinho!\nAdicione \"&\" e o identificador de outro bilro.";
	}
	else throw "Falta os bilros!\nAdicione o identificador de um bilro, \"&\" e o identificador de outro bilros apoś \"troque\".";
}

//AÇÃO -> COLOCA
//AÇÃO -> TROCA
const ACAO = tokens => {
	const first = nextToken(tokens);
	if (first.tokenType == "coloque")
		return COLOCAR(tokens);
	else if (first.tokenType == "troque")
		return TROCAR(tokens);
	else throw "Os comandos possiveis são \"coloque\" e \"troque\".";
}

//ALGORITMO -> AÇÃO
//ALGORITMO -> AÇÃO ALGORITMO
const ALGORITMO = tokens => {//CORRIGIR (Formato e erros)
	let nodes = []
	while(tokens.length)
		nodes.push(ACAO(tokens));
	if (!nodes.length) throw "Digite alguma coisa antes de executar!"
	return nodes;
}

/**
	@description Analise sintatica -> Verifica a sintaxe a partir de tokens capturados na Analise lexica.
	@returns arvore sintatica e erros capturados.
*/
const syn = tokens => ALGORITMO(tokens);

exports.syn = syn;