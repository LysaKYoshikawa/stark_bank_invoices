//Passo 2
// ler do webhook se o boleto foi pago, se não fazer tratativa de erro
const starkbank = require('starkbank');


async function validateBoletos() {

    // const boleto = boletos;
    // console.log('Esses são os boletos que foram emitidos', boleto)

    try {

        let webhooks = await starkbank.webhook.query();

        for await (let webhook of webhooks) {

            console.log(webhook);
        }
        
    } catch (error) {
        console.error('Erro:', error);
    }
    


}
  
module.exports = { validateBoletos };