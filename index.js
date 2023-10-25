const starkbank = require('starkbank');
const project = require('./starkbankConfig');
const boletoController = require('./src/controllers/boletoController');
const express = require('express');
// const consultarTransferencia = require('./src/controllers/consultarTransferenciaController');
const index = express();
const port = 3000;

index.use(express.json());

(async () => {
    try {
        // credenciais do Stark Bank usando o objeto 'project' de starkbankConfig.js
        starkbank.user = project;

        // Chame o controlador de boletos diretamente para gerar boletos
        const boletos = await boletoController.createBoletos();

        // Registre os boletos gerados
        console.log('Boletos Gerados:');
        console.log(boletos);

        
        await consultarTransferencia();

        // Aguarde 5 minutos antes de buscar eventos do webhook
        // setTimeout(async () => {
        //     await fetchWebhookEvents();
        // }, 10 * 1000);

        // Inicie o servidor
        index.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao gerar boletos:', error);
    }
})();

// Lista de boletos pagos
const boletosPagos = [];

function registrarBoletoPago(boleto) {
    boletosPagos.push(boleto);
    console.log(`Boleto pago, ID: ${boleto.id}`);
}

//Função para listar todas as transferencias realizadas
async function consultarTransferencia() {
    try {
        const response = await starkbank.transfer.query({
            after: '2023-10-23',
            before: '2023-10-24',
        });

        for await (let transfer of response) {
            if (transfer.status === 'success') {
                const parts = transfer.externalId.split('-');
                const externalId = parts[parts.length - 1]

                console.log(`O Id do boleto ${externalId}`)

                
            }
        }
    }catch (error){
        console.error('Não foi possivel listar transferência:', error);
    }
    
};

async function fetchWebhookEvents() {
    try {
        let events = await starkbank.event.query({
            after: '2023-10-23',
            before: '2023-10-24',
        });
        // consultarTransferencia();
        // console.log(`Lista de transferencia: ${consultarTransferencia()}`);

        for await (let event of events) {
            console.log(event);
        
            if (event.subscription === 'boleto' && event.log && event.log.boleto) {
                const boleto = event.log.boleto;
                if (boleto.status === 'paid') {
                    // Boletos pagos
                    const valorRecebido = await calcularValorRecebido(event);
                    console.log(`Valor Recebido: R$ ${valorRecebido}`);
                    // const transferencia = await realizarTransferencia(valorRecebido, boleto)
                    // console.log(`Tranferencia realizada : ${transferencia}`);
                    

                    // Lógica para registrar os boletos pagos, se necessário
                    registrarBoletoPago(boleto);
                } else {
                    console.log('Boleto pendente, aguardando pagamento.');
                }
            }
        }
    } catch (error) {
        console.error('Erro ao buscar eventos do webhook:', error);
    }
}


async function calcularValorRecebido(event) {
    console.log("calculando taxas", event)
    if (event.subscription === 'boleto' && event.log && event.log.boleto) {
        const boleto = event.log.boleto;
        const valorOriginal = boleto.amount / 100; // Converta centavos para reais
        const taxa = boleto.fee / 100; // Converta centavos para reais
        const multa = boleto.fine / 100; // Converta centavos para reais

        let valorRecebido = valorOriginal;

        // Subtrai a taxa e a multa, se aplicáveis
        valorRecebido -= taxa;
        valorRecebido -= multa;

        // Verifica se há descontos e aplica-os
        if (boleto.discounts && boleto.discounts.length > 0) {
            for (const desconto of boleto.discounts) {
                const descontoValor = desconto.amount / 100; // Converta centavos para reais
                valorRecebido -= descontoValor;
            }
        }
        const valorInteiro = Math.round(valorRecebido * 100);

        return valorInteiro;
    }

    return 0; // Caso o evento não seja relacionado a boletos
}



// Função para realizar a transferência
async function realizarTransferencia(valorRecebido, boleto) {

    try{
        const transfer = await starkbank.transfer.create([{
            amount: valorRecebido,
            bankCode: '20018183',
            branchCode: '0001',
            accountNumber: '6341320293482496',
            name: 'Stark Bank S.A.',
            taxId: '20.018.183/0001-80',
            accountType: 'payment',
            externalId: `transfer-boleto-${boleto.id}`, // Use um identificador único
            tags: ['transfer'],
        }]);
    
        if (transfer.length > 0) {
            console.log(`Transferência realizada para o boleto ID ${boleto.id}`);
            console.log(transfer[0]);
        }
    } catch (error) {
        console.error('Erro ao realizar a transferencia:', error);
    }
    
}

