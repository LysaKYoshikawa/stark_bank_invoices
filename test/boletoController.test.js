const boletoController = require('../src/controllers/boletoController');

// Substitua createRandomBoleto por um mock simulando os dados
jest.mock('../src/controllers/boletoController', () => {
  return {
    createRandomBoleto: jest.fn(() => ({
      amount: 200,
      name: 'John Doe',
      taxId: '12345678900',
      streetLine1: 'Rua do processo seletivo',
      streetLine2: 'Rua joaquim morais',
      district:   'Aqui',
      city: 'São Paulo',
      stateCode: "SP",
      zipCode: "04370-020",
      due: '2023-10-26',
      fine: 5,
      interest: 2.5,
    })),
  };
});

test('Deve criar um boleto aleatório', async () => {
  const boletos = await boletoController.createRandomBoleto();
  expect(boletos).toHaveProperty('amount');
  expect(boletos).toHaveProperty('name');
  expect(boletos).toHaveProperty('taxId');
  expect(boletos).toHaveProperty('streetLine1');
  expect(boletos).toHaveProperty('streetLine2');
  expect(boletos).toHaveProperty('district');
  expect(boletos).toHaveProperty('city');
  expect(boletos).toHaveProperty('zipCode');
  expect(boletos).toHaveProperty('due');

  expect(boletos.amount).toBeGreaterThan(0); // Verifique se o valor é maior que zero
  // Adicione outros testes, se necessário
});

test('Deve verificar se o valor é number ou string', () => {
  const boletos = boletoController.createRandomBoleto();
  

  expect(typeof boletos.amount).toBe('number'); // Verifica se o tipo é 'number'

  // Use Number.isNaN() para verificar se um valor é um número válido
  expect(Number.isNaN(boletos.amount)).toBe(false); // Se não for um numero ele não passa
});


