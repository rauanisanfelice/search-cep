/* eslint-env jest */
import { isEmpty, isNotEmpty, cleanCEP } from '../../helpers/funcoes.mjs';

describe('Funções de utilidade', () => {
  it('deve retornar verdadeiro para isEmpty com valor vazio, indefinido ou nulo', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(null)).toBe(true);
  });

  it('deve retornar falso para isEmpty com valor não vazio, não indefinido e não nulo', () => {
    expect(isEmpty('texto')).toBe(false);
    expect(isEmpty(0)).toBe(false);
    expect(isEmpty(false)).toBe(false);
  });

  it('deve retornar verdadeiro para isNotEmpty com valor não vazio, não indefinido e não nulo', () => {
    expect(isNotEmpty('texto')).toBe(true);
    expect(isNotEmpty(0)).toBe(true);
    expect(isNotEmpty(false)).toBe(true);
  });

  it('deve retornar falso para isNotEmpty com valor vazio, indefinido ou nulo', () => {
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty(undefined)).toBe(false);
    expect(isNotEmpty(null)).toBe(false);
  });

  it('deve limpar o CEP corretamente', () => {
    expect(cleanCEP('1234567800')).toBe('12345678');
    expect(cleanCEP('12345')).toBe('12345000');
    expect(cleanCEP('')).toBe('00000000');
    expect(cleanCEP('12')).toBe('12000000');
  });
});
