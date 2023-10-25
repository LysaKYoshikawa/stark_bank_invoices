const transferController = require('../src/controllers/transferController');

// Mock da função create do starkbank
jest.mock('starkbank', () => {
  const create = jest.fn(() => [{ id: '123', status: 'created' }]);
  return { transfer: { create } };
});

describe('Transfer Controller', () => {
  it('Deve realizar uma transferência com sucesso', async () => {
    const valorRecebido = 3623;
    const boleto = { id: '5230044469264384' };

    const transfer = await transferController.realizarTransferencia(valorRecebido, boleto);

    // expect(transfer.amount).toBe(3623);
    expect(transfer).toBe('sucesso');
  });

});
