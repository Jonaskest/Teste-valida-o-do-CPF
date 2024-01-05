async function validarCPF() {
    const cpf_entrada = document.getElementById('cpf_entrada');
    const resultadoDiv = document.getElementById('resultado');

    // console.log(cpf_entrada);

    const cpf = cpf_entrada.value.replace(/[^\d]/g, '');

    if (!cpf) {
        resultadoDiv.innerHTML = 'Por favor, insira um número de CPF válido.';
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/validarCPF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cpf }),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.valida) {
                resultadoDiv.innerHTML = `CPF: ${data.cpf}<br>Resultado: ${data.valida}`;
            } else {
                resultadoDiv.innerHTML = `Erro: CPF inválido.`;
            }
        } else {
            resultadoDiv.innerHTML = `Erro: ${data.error}`;
        }
    } catch (error) {
        console.error('Erro ao validar CPF:', error);
        resultadoDiv.innerHTML = 'Erro ao processar a solicitação.';
    }
}
