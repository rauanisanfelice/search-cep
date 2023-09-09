import * as Yup from 'yup';
import Usuario from '../models/Usuario.mjs';
import { isEmpty } from '../helpers/funcoes.mjs';

class UsuarioController {
  async get_all(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Busque todos os usuários'
    #swagger.description = 'Obtenha informações detalhadas de todos os usuários.'
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/ListUser" },
      description: 'Usuário(s) localizados com sucesso.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */

    try {
      const usuarios = await Usuario.find();
      res.status(200).json(usuarios);
    } catch (error) {
      res.status(500).json({ 'error': error.message })
    }
  }

  async get_one(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Busca usuário pelo ID.'
    #swagger.description = 'Obtenha informações detalhadas sobre um usuário pelo ID.'
    #swagger.parameters['id'] = { description: 'O ID único do usuário.' }
    #swagger.responses[200] = {
      schema: { $ref: "#/definitions/User" },
      description: 'Usuário localizado com sucesso.',
    }
    #swagger.responses[404] = {
      description: 'Usuário não localizado.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */
    try {
      const usuario = await Usuario.findById(req.params.id);

      if (isEmpty(usuario)) {
        return res.status(404).json({ 'error': 'Usuário não localizado.' });
      }

      return res.status(200).json(usuario);
    } catch (error) {
      return res.status(500).json({ 'error': error.message });
    }
  }

  async insert(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Crie um novo usuário.'
    #swagger.description = 'Crie um novo usuário com as informações fornecidas.'
    #swagger.parameters['payload'] = {
      in: 'body',
      description: 'Informações do usuário.',
      required: true,
      schema: { $ref: "#/definitions/AddUser" },
    }
    #swagger.responses[201] = {
      description: 'Usuário criado com sucesso.',
    }
    #swagger.responses[400] = {
      description: 'Campos informados estão incorretos.',
    }
    #swagger.responses[409] = {
      description: 'O objeto já está cadastrado.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */
    try {
      const schema = Yup.object().shape({
        nome: Yup.string().required(),
        email: Yup.string()
          .email()
          .required(),
        senha: Yup.string()
          .required()
          .min(6)
          .max(21),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ 'error': 'Campos informados estão incorretos.' });
      }

      const usuarioExistente = await Usuario.findOne({ email: req.body.email });

      if (usuarioExistente) {
        return res
          .status(409)
          .json({ 'error': 'O objeto já está cadastrado.' });
      }

      const { _id, nome, email } = await Usuario.create(req.body);

      return res.status(201).json({
        usuario: {
          _id,
          nome,
          email,
        },
      });
    } catch (error) {
      return res.status(500).json({ 'error': error.message });
    }
  }

  async update(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Atualize um usuário pelo ID.'
    #swagger.description = 'Atualize as informações de um usuário existente.'
    #swagger.parameters['id'] = { description: 'O ID único do usuário.' }
    #swagger.parameters['updateUser'] = {
      in: 'body',
      description: 'Informações do usuário.',
      required: true,
      schema: { $ref: "#/definitions/UpdateUser" },
    }
    #swagger.responses[204] = {
      description: 'Usuário atualizado com sucesso.',
    }
    #swagger.responses[400] = {
      description: 'Campos informados estão incorretos.',
    }
    #swagger.responses[404] = {
      description: 'Usuário não localizado.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */
    try {
      const schema = Yup.object().shape({
        nome: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res
          .status(400)
          .json({ error: 'Validações dos campos incorreta' });
      }

      const nome = req.body['nome'];
      const usuario = await Usuario.findById(req.params.id);

      if (isEmpty(usuario)) {
        return res.status(404).json({ 'error': 'Usuário não cadastrado' });
      }

      const options = { upsert: true };
      await Usuario.updateOne(
        { '_id': req.params.id },
        {
          $set: {
            nome: nome,
          }
        },
        options
      );

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ 'error': error.message });
    }
  }

  async delete(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Exclua um usuário pelo ID.'
    #swagger.description = 'Exclua um usuário pelo ID.'
    #swagger.parameters['id'] = { description: 'O ID único do usuário.' }
    #swagger.responses[204] = {
      description: 'Usuário deletado com sucesso.',
    }
    #swagger.responses[404] = {
      description: 'Usuário não localizado.',
    }
    #swagger.responses[500] = {
      description: 'Erro no servidor.',
    }
    */
    try {
      const usuario = await Usuario.findByIdAndDelete(req.params.id);

      if (isEmpty(usuario)) {
        return res.status(404).json({ 'error': 'Usuário não cadastrado' });
      }

      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ 'error': error.message });
    }
  }
}

export default new UsuarioController()
