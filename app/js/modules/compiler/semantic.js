//calculateLevel = require("../utils/calculate-level");
//import não funcionou
const calculateLevel = (qtdBase, id) =>{
	const grupo = 2*qtdBase-1;
	console.log(grupo)
	const level = Math.floor(id/grupo);
	if (level%grupo >= qtdBase)
		return level+1
	return level
}

const sem = (tree) => {
	let troqueStarted = false;
	let algorithm = [];
	let qtdAlfinetes = 0;
	let trocas = [];
	let bilros = [];
	tree = tree.reverse();
	while(tree.length){
		const next = tree.pop();
		algorithm.push(next);
		if (next.command == "coloque"){
			if (next.element == "alfinete"){
				if (troqueStarted)
					throw "Após começar a trocar bilros, não é possivel colocar mais alfinetes iniciais!";
				if(qtdAlfinetes.length == 6)
					throw "No momento o sistema é limitado a 6 alfinetes!";
				qtdAlfinetes++;
			}
			if (next.element == "bilros"){
				if (troqueStarted)
					throw "Após começar a trocar bilros, não é possivel colocar mais bilros!";
				if (next.target <= 0)
					throw "O identificador de um alfinete é um numero natural!";
				if (next.target > qtdAlfinetes)
					throw "O alfinete "+next.target+" não foi colocado!";
				if (bilros.filter(elem => elem == next.target).length >= 2)
					throw "Só é possivel colocar 2 pares de bilros em um alfinete";
				bilros.push(next.target);
				console.log(bilros)
			}
		}
		if (next.command == "troque"){
			troqueStarted = true;
			const [bilroL, bilroR] = next.bilros;
			/*verificar se bilro existe*/
			const charBilroL = bilroL.charCodeAt(0)-65
			const charBilroR = bilroR.charCodeAt(0)-65
			const numberBilroL = bilroL.at(1);
			const numberBilroR = bilroL.at(1);
			if (!bilros.at(charBilroL) || numberBilroL > 1)
				throw "Bilro "+bilroL+" não existe";
			if (!bilros.at(charBilroR) || numberBilroR > 1)
				throw "Bilro "+bilroR+" não existe";
			//verificar se é possivel trocar
			if (charBilroL == charBilroR)
				throw "Os bilros devem ser de pares diferentes";
			
			const alfineteL = bilros.at(charBilroL);
			const alfineteR = bilros.at(charBilroR);

			const origemL = calculateLevel(qtdAlfinetes, alfineteL);
			const origemR = calculateLevel(qtdAlfinetes, alfineteR);
			
			if(origemL != origemR){
				//verificar extremos
			}

			trocas.push(next.bilros)
			if (trocas.length == 4){
				//verificar ordem das trocas
			}
		}
	}
	return algorithm;
}

exports.sem = sem;