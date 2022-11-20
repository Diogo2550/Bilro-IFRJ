const { compile } = require('./bilro-compiler')

const executeBilro = () => {
	const input = document.getElementById("code-input");
	const [algorithm, errors] = compile(input.value);
	console.log(errors);
	if (errors){
		//exibe erros;
	}
	else{
		//parte grafica
	}
}

exports.executeBilro = executeBilro;