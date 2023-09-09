/* eslint-env jest */
import mongoose from 'mongoose';
import Usuario from '../../models/Usuario.mjs';
import UsuarioController from '../../controllers/UsuarioController.mjs';

describe('UsuarioController', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://admin:pass@localhost:27017/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 75000,
      family: 4,
    });
  });

  afterEach(async () => {
    jest.clearAllMocks();
    await Usuario.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('deve retornar todos os usuários', async () => {
    await Usuario.create({ nome: 'Usuário 1', email: 'usuario1@example.com', senha: 'senha12345' });
    await Usuario.create({ nome: 'Usuário 2', email: 'usuario2@example.com', senha: 'senha12345' });
    await Usuario.create({ nome: 'Usuário 3', email: 'usuario3@example.com', senha: 'senha12345' });

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await UsuarioController.get_all(req, res);

    expect(res.json).toHaveBeenCalled();

    const usuariosRetornados = res.json.mock.calls[0][0];
    expect(usuariosRetornados).toHaveLength(3);
    expect(usuariosRetornados[0]).toHaveProperty('nome', 'Usuário 1');
    expect(usuariosRetornados[1]).toHaveProperty('nome', 'Usuário 2');
    expect(usuariosRetornados[2]).toHaveProperty('nome', 'Usuário 3');
  });

  it('deve retornar uma lista vazia quando não houver usuários', async () => {
    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    await UsuarioController.get_all(req, res);

    expect(res.json).toHaveBeenCalled();

    const usuariosRetornados = res.json.mock.calls[0][0];
    expect(usuariosRetornados).toHaveLength(0);
  });

  it('deve retornar erro ao buscar usuarios', async () => {
    await Usuario.create({ nome: 'Usuário 1', email: 'usuario1@example.com', senha: 'senha1234' });

    const req = {};
    const res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jest.spyOn(Usuario, 'find').mockImplementation(() => {
      throw new Error('Erro simulado na função Usuario.find');
    });

    await UsuarioController.get_all(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Erro simulado na função Usuario.find' });
  });

  it('deve retornar um usuário pelo ID', async () => {
    const usuario = await Usuario.create({ nome: 'Usuário 1', email: 'usuario1@example.com', senha: 'senha1' });

    const req = {
      params: { id: usuario._id.toString() },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await UsuarioController.get_one(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nome: 'Usuário 1' }));
  });

  it('deve inserir um novo usuário', async () => {
    const novoUsuario = {
      nome: 'Novo Usuário',
      email: 'novo_usuario@example.com',
      senha: 'senha_nova',
    };

    const req = {
      body: novoUsuario,
    };
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await UsuarioController.insert(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      usuario: expect.objectContaining({ nome: 'Novo Usuário' }),
    }));

    const usuarioInserido = await Usuario.findOne({ email: novoUsuario.email });
    expect(usuarioInserido).toBeTruthy();
  });

  it('deve atualizar um usuário pelo ID', async () => {
    const usuario = await Usuario.create({ nome: 'Usuário Antigo', email: 'antigo@example.com', senha: 'senha_antiga' });

    const req = {
      params: { id: usuario._id.toString() },
      body: { nome: 'Usuário Atualizado' },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await UsuarioController.update(req, res);

    expect(res.status).toHaveBeenCalledWith(204);

    const usuarioAtualizado = await Usuario.findById(usuario._id);
    expect(usuarioAtualizado.nome).toBe('Usuário Atualizado');
  });

  it('deve excluir um usuário pelo ID', async () => {
    const usuario = await Usuario.create({ nome: 'Usuário para Excluir', email: 'excluir@example.com', senha: 'senha_excluir' });

    const req = {
      params: { id: usuario._id.toString() },
    };
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    };
    res.status.mockReturnValue(res);

    await UsuarioController.delete(req, res);

    expect(res.status).toHaveBeenCalledWith(204);

    const usuarioExcluido = await Usuario.findById(usuario._id);
    expect(usuarioExcluido).toBeNull();
  });
});
