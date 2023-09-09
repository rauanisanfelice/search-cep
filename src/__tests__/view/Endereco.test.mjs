/* eslint-env jest */
import Endereco from '../../views/Endereco.mjs';

describe('Endereco', () => {
  it('deve obter um endereço válido', async () => {
    await Endereco.getEndereco('15085330');
    expect(Endereco.notFound).toBe(false);
    expect(Endereco.invalid).toBe(false);
    expect(Endereco.endereco.cep).toBe('15085330');
  });

  it('deve indicar CEP não encontrado', async () => {
    await Endereco.getEndereco('00000000');
    expect(Endereco.notFound).toBe(false);
    expect(Endereco.invalid).toBe(true);
  });

  it('deve indicar CEP inválido', async () => {
    await Endereco.getEndereco('12345');
    expect(Endereco.notFound).toBe(false);
    expect(Endereco.invalid).toBe(true);
  });
});
