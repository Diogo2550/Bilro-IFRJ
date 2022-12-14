const { CommandEnum } = require("../../types/command");

const nextToken = tokens => tokens.length ? tokens.pop() : {tokenType: ""};

const pinWords = ["coloque", "disponha", "assente", "bote", "firme", "ponha", "instale", "acomode", "fixe"]

const swapWords = ["troque", "cruze", "alterne", "inverta", "entrecruze", "permute", "mutue", "comute"]

const startString = word => word[0].toUpperCase()+word.slice(1).toLowerCase();

//COLOCAR -> coloque alfinete
//COLOCAR -> coloque bilros em NÚMERO
const COLOCAR = (tokens, verb) => {
	const next = nextToken(tokens);
	if(next.word == "bilros"){
		if (nextToken(tokens).word == "em"){
			const idAlfinete = nextToken(tokens);
			if (idAlfinete.tokenType == "ID_ALFINETE")
				return {
					command: CommandEnum.PIN,
					element: "bilros",
					target: parseInt(idAlfinete.word)
				}
			else throw `Você não me disse o alfinete!\n\nDica: Um alfinete é identificado por um numero! Adicione o numero do alfinete após \"em\".\n\nEx.: ${verb} bilros em 1`;
		}
		else throw `Onde coloco esse bilro?\n\nDica: Um bilro precisa ser colocado em um alfinete! Adicione \"em\" e o numero do alfinete após \"bilros\".\n\nEx.: ${verb} bilros em 1`;
	}
	else if (next.word == "alfinete")
		return {
			command: CommandEnum.PIN,
			element: "alfinete"
		}
	else throw `${startString(verb)} o que?\n\nDica: Você pode colocar alfinetes e bilros! Adicione \"alfinete\" ou \"bilros\" após \"${verb}\".\n\nEx.: ${verb} alfinete`;
}

//TROCAR -> troque LETRA e LETRA
const TROCAR = (tokens, verb) => {
	const idBIlros1 = nextToken(tokens);
	if(idBIlros1.tokenType == 'ID_BILROS'){
		if(nextToken(tokens).word == '&'){
			const idBIlros2 = nextToken(tokens);
			if(idBIlros2.tokenType == 'ID_BILROS')
				return {
					command: CommandEnum.SWAP,
					bilros: [
						idBIlros1.word.toUpperCase(),
						idBIlros2.word.toUpperCase()
					].sort()
				}
			else throw "Falta um bilro!\n\nAdicione outro bilro.\n\nEx.: ${verb} a1 & b0";
		}
		else throw "Um bilro não troca sozinho!\n\nAdicione \"&\" e outro bilro.\n\nEx.: ${verb} a1 & b0";
	}
	else throw `Falta os bilros!\n\nDica: Adicione um bilro, \"&\" e outro bilro.\n\nEx.: ${verb} a1 & b0`;
}

//AÇÃO -> COLOCA
//AÇÃO -> TROCA
const ACAO = tokens => {
	const first = nextToken(tokens);
	if (pinWords.includes(first.word))
		return COLOCAR(tokens, first.word);
	if (swapWords.includes(first.word))
		return TROCAR(tokens, first.word);
	throw ``;
}

//ALGORITMO -> AÇÃO
//ALGORITMO -> AÇÃO ALGORITMO
const ALGORITMO = tokens => {//CORRIGIR (Formato e erros)
	let nodes = []
	//if (!tokens.length) throw "Digite alguma coisa antes de executar!"
	while(tokens.length)
		nodes.push(ACAO(tokens));
	return nodes;
}

/**
	@description Analise sintatica -> Verifica a sintaxe a partir de tokens capturados na Analise lexica.
	@returns arvore sintatica e erros capturados.
*/
const syn = tokens => ALGORITMO(tokens);

exports.syn = syn;