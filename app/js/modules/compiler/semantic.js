const sem = (tree) => {
	let algorithm = [];
	tree = tree.reverse();
	let alfinetes = [];
	while(tree.length){
		const next = tree.pop();
		algorithm.push(next);
		if (next.command == "coloque"){
			if (next.element == "alfinete"){
				if(alfinetes.length == 6) throw "No momento o sistema é limitado a 6 alfinetes!";
				alfinetes.push(0);
			}
			if (next.element == "bilros"){
				if (next.target <= 0) throw "O identificador de um alfinete é um numero natural!";
				if (next.target > alfinetes.length) throw "O alfinete "+next.target+" não foi colocado!";
				alfinetes[next.target-1] = 1;
			}
		}
		if (next.command == "troque"){

		}
	}
	return algorithm;
}

exports.sem = sem;