const starkbank = require('starkbank');
const casual = require('casual');
const moment = require('moment');
const cpfGenerator = require('gerador-validador-cpf');
const cepPromise = require('cep-promise');

// Função para gerar um número de CPF válido
function generateRandomCPF() {
  return cpfGenerator.generate();
}

// Função para criar um boleto com informações aleatórias
async function createRandomBoleto() {
  const currentDate = moment();
  const randomDays = casual.integer(1, 365);
  const randomDue = currentDate.clone().add(randomDays, 'days');
  const randomAmount = casual.integer(200, 1000);
  const randomCPF = generateRandomCPF();

  return {
    amount: randomAmount,
    name: casual.full_name,
    taxId: randomCPF,
    streetLine1: casual.address,
    streetLine2: casual.words(3),
    district: casual.city,
    city: casual.city,
    // stateCode: casual.state_abbr.toUpperCase(),
    stateCode: "SP",
    // zipCode: selectedCEP,
    zipCode: "04370-020",
    due: randomDue.format('YYYY-MM-DD'),
    fine: 5,
    interest: 2.5,
  };
}

async function createBoletos() {
  try {
    const numberOfBoletos = casual.integer(1, 2);
    const boletos = [];

    for (let i = 0; i < numberOfBoletos; i++) {
      const randomBoleto = await createRandomBoleto();

      if (randomBoleto) {
        const response = await starkbank.boleto.create([randomBoleto]);
        boletos.push(response[0]);

        console.log('Boleto Gerado:');
        console.log('ID: ' + response[0].id);
        console.log('Vencimento: ' + response[0].due);
        console.log('Valor: R$ ' + (response[0].amount / 100).toFixed(2));
        console.log('Nome do Pagador: ' + response[0].name);
        console.log('CEP: ' + response[0].zipCode);
        console.log('---');
      }
    }

    return boletos;
  } catch (error) {
    console.error('Erro ao criar boletos:', error);
    return [];
  }
}

module.exports = { createBoletos };


// //Schecule
// let executionCount = 0;

// async function createAndScheduleBoletos() {
//   await createBoletos();
//   executionCount++;

//   if (executionCount * 3 * 60 * 60 * 1000 <= 24 * 60 * 60 * 1000) {
//     // Agende a próxima execução em 3 horas
//     setTimeout(createAndScheduleBoletos, 3 * 60 * 60 * 1000); // 3 horas em milissegundos
//   } else {
//     console.log('Limite de 24 horas alcançado. Encerrando a programação.');
//   }
// }

// // Inicie a primeira execução
// createAndScheduleBoletos();