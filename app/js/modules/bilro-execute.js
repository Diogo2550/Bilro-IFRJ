const { compile } = require('./bilro-compiler')

const executeBilro = () => {
	const input = document.getElementById("code-input");
	const [algorithm, errors] = compile(input.value);
	if (errors){
		//exibe erros;
	}
	else{
		//parte grafica
	}
}
executeBilro();
exports.executeBilro = executeBilro;