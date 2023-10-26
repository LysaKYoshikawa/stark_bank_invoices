const transferController = require('../src/controllers/transferController');
// const dataTransfer = require('./starkbankConfig.js')
const starkbank = require('starkbank');

// Mock do módulo starkbank para simular o create
jest.mock('starkbank', () => {
  return {
    transfer: {
      create: jest.fn(),
    },
  };
});

describe('realizarTransferencia', () => {
  it('Deve realizar uma transferência com sucesso', async () => {
    // Configurar o mock para simular uma transferência bem-sucedida
    const mockTransfer = [{ id: '123', status: 'created' }];
    starkbank.transfer.create.mockResolvedValue(mockTransfer);

    // Chame a função realizarTransferencia com os argumentos apropriados
    const valorRecebido = 3623;
    const boleto = { id: '5230044469264384' };
    const result = await transferController.realizarTransferencia(valorRecebido, boleto);

    // Realize as asserções para verificar o resultado
    expect(result).toBe('sucesso');
  });
});

