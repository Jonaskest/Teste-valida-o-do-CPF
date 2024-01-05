from flask import Flask, request, jsonify
from validarCPF import validarCPF  # Corrigido o nome da função de validação
from flask_cors import CORS  # Importe o módulo CORS

app = Flask(__name__)
CORS(app)

@app.route('/validarCPF', methods=['POST'])
def validar_cpf_route():  # Renomeei a função para evitar conflito de nomes
    try:
        data = request.get_json()
        cpf = data['cpf']

        # Chame a função de validação corretamente
        valida = validarCPF(cpf)

        response_data = {
            'cpf': cpf,
            'valida': valida
        }

        return jsonify(response_data), 200

    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500

if __name__ == '__main__':
    app.run(port=5000)
