const calculateLevel = (qtdBase, id) =>{
	const grupo = 2*qtdBase-1;
	const level = Math.floor((2*id)/grupo);
	if (level%grupo > qtdBase)
		return level+1
	return level
}

exports.calculateLevel = calculateLevel;