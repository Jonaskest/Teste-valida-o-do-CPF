// função assincrona para validar cpf
async function validarCPF() {
    // pega o elemento de entrada do cpf e a div pelo ID
    const cpf_entrada = document.getElementById('cpf_entrada');
    const resultadoDiv = document.getElementById('resultado');
    // pega o valor do campo de entrada e remove os caracteres não numéricos
    const cpf = cpf_entrada.value.replace(/[^\d]/g, '');
    //verica se o CPF é válido 
    if (!cpf) {
        resultadoDiv.innerHTML = 'Por favor, insira um número de CPF válido.';
        return;
    }
    // faz a solitação da API utilizando o método POST
    try {
        const response = await fetch('http://localhost:5000/validarCPF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf }),
        });

        const data = await response.json();
        //verifica se a resposta da API está ok
        if (response.ok) {
            //// Se o CPF for válido, exibe os detalhes do CPF e o resultado da validação
            if (data.valida) {
                resultadoDiv.innerHTML = `CPF: ${data.cpf}<br>Resultado: ${data.valida}`;
            } else {
                //// Se o CPF for inválido, exibe uma mensagem de erro
                resultadoDiv.innerHTML = `Erro: CPF inválido.`;
            }
        } else {
            //    // Se a resposta não estiver OK, exibe a mensagem de erro retornada pela API
            resultadoDiv.innerHTML = `Erro: ${data.error}`;
        }
    } catch (error) {
        //// Se houver um erro durante a execução da função, exibe no console e na div de resultado
        console.error('Erro ao validar CPF:', error);
        resultadoDiv.innerHTML = 'Erro ao processar a solicitação.';
    }
}
