/* eslint-env jest */
import EnderecoController from '../../controllers/EnderecoController.mjs';
import Endereco from '../../views/Endereco.mjs';

const mockReqValidCEP = {
  params: {
    cep: '12345-678',
  },
};

const mockReqInvalidCEP = {
  params: {
    cep: '12345',
  },
};

jest.mock('../../views/Endereco.mjs', () => ({
  getEndereco: jest.fn(),
  notFound: false,
  invalid: false,
  endereco: {
    cep: '12345-678',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
  },
  initial: jest.fn(),
}));

describe('EnderecoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar um endereço válido', async () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    await EnderecoController.get(mockReqValidCEP, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      cep: '12345-678',
      state: '',
      city: '',
      neighborhood: '',
      street: '',
    });
  });

  it('deve retornar um erro 404 para CEP não encontrado', async () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    Endereco.notFound = true;
    Endereco.invalid = false;
    await EnderecoController.get(mockReqValidCEP, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({
      cep_clean: '12345678',
      error: 'CEP não encontrado.',
    });
  });

  it('deve retornar um erro 400 para CEP inválido', async () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    Endereco.notFound = false;
    Endereco.invalid = true;
    await EnderecoController.get(mockReqInvalidCEP, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      cep_clean: expect.any(String),
      error: 'CEP inválido.',
    });
  });

  it('deve retornar um erro 500 para erro no servidor', async () => {
    const mockRes = {
      status: jest.fn(() => mockRes),
      json: jest.fn(),
    };

    jest.spyOn(Endereco, 'getEndereco').mockImplementation(() => {
      throw new Error('Erro simulado na função getEndereco');
    });
    await EnderecoController.get(mockReqValidCEP, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro simulado na função getEndereco' });
  });
});
