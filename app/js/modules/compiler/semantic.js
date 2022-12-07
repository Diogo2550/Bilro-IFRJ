const calculateGroupSize = base => 2*base-1;

const calculateGroupPosition = (pinId, groupSize) => pinId%groupSize;

//calculateLevel = require("../utils/calculate-level");
//import não funcionou

const calculateLevel = (base, pinId) =>{
	const groupSize = calculateGroupSize(base);
	const pinLevel = Math.floor(pinId/groupSize);
	return calculateGroupPosition(pinId, groupSize) >= base ? pinLevel+1 : pinLevel;
}

const sem = tree => {
	let troqueStarted = false;
	let algorithm = [];
	let countPin = 0;
	let swaps = [];
	let bilros = [];
	tree = tree.reverse();
	while(tree.length){
		const next = tree.pop();
		algorithm.push(next);
		if (next.command == "coloque"){
			if (next.element == "alfinete"){
				if (troqueStarted)
					throw "Após começar a trocar bilros, não é possivel colocar mais alfinetes iniciais!";
				if(countPin.length == 6)
					throw "No momento o sistema é limitado a 6 alfinetes!";
				countPin++;
			}
			if (next.element == "bilros"){
				if (troqueStarted)
					throw "Após começar a trocar bilros, não é possivel colocar mais bilros!";
				if (next.target <= 0)
					throw "O identificador de um alfinete é um numero natural!";
				if (next.target > countPin)
					throw "O alfinete "+next.target+" não foi colocado!";
				if (bilros.filter(elem => elem == next.target).length >= 2)
					throw "Só é possivel colocar 2 pares de bilros em um alfinete";
				bilros.push(next.target);
			}
		}
		if (next.command == "troque"){
			troqueStarted = true;
			const [bilroL, bilroR] = next.bilros;
			/*verificar se bilro existe*/
			const leftChar = bilroL.charCodeAt(0)-65
			const rightChar = bilroR.charCodeAt(0)-65
			const numberBilroL = bilroL.at(1);
			const numberBilroR = bilroL.at(1);
			if (!bilros.at(leftChar) || numberBilroL > 1)
				throw "Bilro "+bilroL+" não existe";
			if (!bilros.at(rightChar) || numberBilroR > 1)
				throw "Bilro "+bilroR+" não existe";
			//verificar se é possivel trocar
			if (leftChar == rightChar)
				throw "Os bilros devem ser de pares diferentes";
			
			const leftPin = bilros.at(leftChar);
			const rightPin = bilros.at(rightChar);

			const leftOrigin = calculateLevel(countPin, leftPin);
			const rightOrigin = calculateLevel(countPin, rightPin);
			
			if(leftOrigin != rightOrigin){
				const groupSize = calculateGroupSize(countPin);
				const leftPosition = calculateGroupPosition(leftOrigin, groupSize);
				const rightPosition = calculateGroupPosition(rightOrigin, groupSize);
				if ((leftPosition != 1 || rightPosition != countPin+1) && (leftPosition != countPin || rightPosition != 0))
					throw ""
			}
			else if (Math.abs(leftPin-rightPin)!=1)
				throw "Os alfinetes devem estar um ao lado do outro";

			swaps.push(next.bilros)
			if (swaps.length == 4){
				//verificar ordem das trocas
			}
		}
	}
	return algorithm;
}

exports.sem = sem;
