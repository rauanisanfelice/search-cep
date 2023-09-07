import Endereco from '../views/Endereco.mjs';
import { cleanCEP } from '../helpers/funcoes.mjs';

class EnderecoController {
  async get(req, res) {
    /*
    #swagger.tags = ['CEP']
    #swagger.summary = 'Busque informações detalhadas de um CEP.'
    #swagger.description = 'Busque informações detalhadas de um CEP.'
    #swagger.parameters['cep'] = { description: 'O CEP desejado.' }
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/CEP" },
      description: 'Usuário localizado com sucesso.',
    }
    #swagger.responses[400] = {
      description: 'CEP não encontrado.',
    }
    #swagger.responses[404] = {
      description: 'CEP inválido.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */
   try {

     let cep_clean = cleanCEP(req.params.cep.replace(/\D/g, ''));
      await Endereco.getEndereco(cep_clean);

      if (Endereco.notFound) {
        return res.status(404).json({
          cep_clean,
          error: 'CEP não encontrado.',
        });
      }

      if (Endereco.invalid) {
        return res.status(400).json({
          cep_clean,
          error: 'CEP inválido.',
        });
      }

      return res.json(Endereco.endereco);
    } catch (error) {
      return res.status(500).json({ error });
    } finally {
      Endereco.initial();
    }
  }
}

export default new EnderecoController();
