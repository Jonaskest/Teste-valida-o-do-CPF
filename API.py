from flask import Flask, request, jsonify #importação do framework flask e flask-CORS para gerenciamento de rota
from validarCPF import validarCPF  #importação da logica de validação do CPF
from flask_cors import CORS  

app = Flask(__name__)
#foi necessário a criação do CORs para permitir soliticões de origem diferentes
CORS(app)
#Definição da rota '/validarCPF' para aceitar solicitações POST
@app.route('/validarCPF', methods=['POST'])
def validar_cpf_route():  
    try:
        data = request.get_json()
        cpf = data['cpf']
        valida = validarCPF(cpf)

        response_data = {
            'cpf': cpf,
            'valida': valida
        }

        return jsonify(response_data), 200

    except Exception as e:
        error_message = str(e)
        return jsonify({'error': error_message}), 500
#inicia o servidor flask na porta 5000
if __name__ == '__main__':
    app.run(port=5000)
