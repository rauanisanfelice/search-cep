/* eslint-env jest */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Usuario from '../../models/Usuario'; // Suponha que este seja o caminho correto para o modelo

describe('Testes para o modelo de Usuario', () => {
  beforeAll(async () => {
    await mongoose.connect("mongodb://admin:pass@localhost:27017/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 75000,
      family: 4,
    });
  });

  afterAll(async () => {
    await Usuario.deleteMany({});
    await mongoose.connection.close();
  });

  it('Deve definir o esquema de Usuario corretamente', () => {
    const UsuarioSchema = Usuario.schema;
    const keys = Object.keys(UsuarioSchema.obj);

    expect(keys).toContain('nome');
    expect(keys).toContain('email');
    expect(keys).toContain('senha');
    expect(UsuarioSchema.obj.nome.type).toBe(String);
    expect(UsuarioSchema.obj.email.type).toBe(String);
    expect(UsuarioSchema.obj.senha.type).toBe(String);
    expect(UsuarioSchema.obj.nome.required).toBe(true);
    expect(UsuarioSchema.obj.email.required).toBe(true);
    expect(UsuarioSchema.obj.email.unique).toBe(true);
    expect(UsuarioSchema.obj.email.lowercase).toBe(true);
    expect(UsuarioSchema.obj.senha.required).toBe(true);
    expect(UsuarioSchema.obj.senha.select).toBe(false);
  });

  it('Deve fazer o hash da senha ao salvar', async () => {
    const senha = 'senha123';
    const usuario = new Usuario({
      nome: 'Nome Teste',
      email: 'teste@example.com',
      senha: senha,
    });

    await usuario.save();
    expect(usuario.senha).not.toBe(senha);

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    expect(senhaCorreta).toBe(true);
  });
});
