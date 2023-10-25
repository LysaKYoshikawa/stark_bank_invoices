const fetchWebhookEvents = require('../controllers/fetchWebhookEvents'); // Importe o módulo que você deseja testar

// Mock do módulo starkbank para evitar chamadas reais à API
jest.mock('starkbank', () => ({
  event: {
    query: jest.fn().mockResolvedValue([
      {
        subscription: 'boleto',
        log: {
          boleto: {
            id: '1',
            status: 'paid',
            amount: 10000, // Valor em centavos
            fee: 500, // Valor em centavos
            fine: 200, // Valor em centavos
          },
        },
      },
    ]),
  },
}));

// Mock do transferController para evitar chamadas reais à API
const transferController = require('../controllers/transferController');
transferController.realizarTransferencia = jest.fn();

describe('fetchWebhookEvents', () => {
  it('Deve processar um evento de boleto pago', async () => {
    // Mock do realizarTransferencia para evitar chamadas reais à API
    transferController.realizarTransferencia.mockResolvedValue('Transferência realizada com sucesso');

    // Chame a função que você deseja testar
    await fetchWebhookEvents.fetchWebhookEvents();

    // Execute as asserções para verificar se a função se comportou como o esperado
    expect(transferController.realizarTransferencia).toHaveBeenCalled();
  });
});
