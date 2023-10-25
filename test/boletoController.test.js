const chai = require('chai');
const expect = chai.expect;
const boletoController = require('../src/controllers/boletoController');

describe('Boleto Controller', () => {
  it('Deve criar um boleto aleatório', async () => {
    const boleto = await boletoController.createRandomBoleto();
    expect(boleto).to.be.an('object');
    expect(boleto).to.have.property('amount');
    expect(boleto).to.have.property('name');
    expect(boleto).to.have.property('taxId');
    expect(boleto).to.have.property('streetLine1');
    expect(boleto).to.have.property('due');
  });

  it('Deve criar boletos aleatórios', async () => {
    const boletos = await boletoController.createBoletos();
    expect(boletos).to.be.an('array');
    expect(boletos).to.have.length.above(0);
  });
});
