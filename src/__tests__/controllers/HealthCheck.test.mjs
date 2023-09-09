/* eslint-env jest */
import HealthCheckController from '../../controllers/HealthCheck'; // Importe o controlador que você deseja testar

afterEach(() => {
  jest.restoreAllMocks();
});

describe('HealthCheckController', () => {
  it('deve retornar um status 200 e dados de saúde válidos', async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };

    await HealthCheckController.get(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.send).toHaveBeenCalledWith(expect.objectContaining({
      uptime: expect.any(Number),
      message: 'OK',
      timestamp: expect.any(String),
    }));
  });

  it('deve retornar um status 503 em caso de erro', async () => {
    const mockReq = {};
    const mockRes = {
      status: jest.fn(() => mockRes),
      send: jest.fn(),
    };

    jest.spyOn(global, 'Date').mockImplementation(() => {
      throw new Error('Erro simulado na função Date');
    });

    await HealthCheckController.get(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(503);
    expect(mockRes.send).toHaveBeenCalled();
  });
});
