const starkbank = require('starkbank');
const transferController = require('./transferController');



async function fetchWebhookEvents() {
    try {
        let events = await starkbank.event.query({
            after: '2023-10-24',
            before: '2023-10-25',
        });
        for await (let event of events) {
        
            if (event.subscription === 'boleto' && event.log && event.log.boleto) {
                const boleto = event.log.boleto;
                if (boleto.status === 'paid') {
                    const valorRecebido = await calcularValorRecebido(event);
                    console.log(`Valor Recebido: R$ ${valorRecebido}`);

                    const transferencia = await transferController.realizarTransferencia(valorRecebido, boleto)
                    console.log(`Tranferencia realizada : ${transferencia}`);

                    registrarBoletoPago(boleto); 
                } else {
                    console.log(`Boleto pendente ${boleto.id}, aguardando pagamento.`);
                }
            }
        }
    } catch (error) {
        console.error('Erro ao buscar eventos do webhook:', error);
    }
}

async function calcularValorRecebido(event) {
    if (event.subscription === 'boleto' && event.log && event.log.boleto) {
        const boleto = event.log.boleto;
        const valorOriginal = boleto.amount / 100; 
        const taxa = boleto.fee / 100; 
        const multa = boleto.fine / 100; 

        let valorRecebido = valorOriginal;

        // Subtrai a taxa e a multa, se aplicáveis
        valorRecebido -= taxa;
        valorRecebido -= multa;

        // Verifica se há descontos e aplica-os
        if (boleto.discounts && boleto.discounts.length > 0) {
            for (const desconto of boleto.discounts) {
                const descontoValor = desconto.amount / 100; 
                valorRecebido -= descontoValor;
            }
        }
        const valorInteiro = Math.round(valorRecebido * 100);

        return valorInteiro;
    }

    return 0; // Caso o evento não seja relacionado a boletos
}

const boletosPagos = [];

function registrarBoletoPago(boleto) {
    boletosPagos.push(boleto);
    console.log(`Boleto pago, ID: ${boleto.id}`);
}

module.exports = { fetchWebhookEvents };