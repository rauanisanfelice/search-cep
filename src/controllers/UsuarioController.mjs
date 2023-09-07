// import Usuario from '../models/Usuario.mjs';

class UsuarioController {
  async index(req, res) {
    /*
    #swagger.tags = ['User']
    #swagger.summary = 'Busca todos os usuários'
    #swagger.description = 'Realiza a busca de todos os usuários cadastrados.'
    #swagger.responses[200] = {
      description: 'User successfully obtained.',
    }
    */

    try {
      // const usuarios = await Usuario.find();
      // res.json(usuarios);

      res.status(200).json({ teste: 'teste' })
    } catch (error) {
      res.status(500).json({ error })
    }
  }
}

export default new UsuarioController()
