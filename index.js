const starkbank = require('starkbank');
const project = require('./starkbankConfig');
const boletoController = require('./src/controllers/boletoController');
const express = require('express');
const index = express();
const port = 3000;

index.use(express.json());

(async () => {
    try {
        // Configure as credenciais do Stark Bank usando o objeto 'project' de starkbankConfig.js
        starkbank.user = project;

        // Chame a função para buscar os eventos do webhook
        await fetchWebhookEvents();

        // Agende a verificação de boletos em espera a cada 2 minutos
        scheduleVerificationOfBoletosEmEspera();

        // Inicie o servidor
        index.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao gerar boletos:', error);
    }
})();

// Função para buscar eventos do webhook
async function fetchWebhookEvents() {
    try {
        // Chame o controlador de boletos diretamente para gerar boletos
        const boletos = await boletoController.createBoletos();

        // Registre os boletos gerados
        console.log('Boletos Gerados:');
        console.log(boletos);

        // Verifica se os boletos foram pagos
        for (let i = 0; i < boletos.length; i++) {
            const boleto = boletos[i];
            const boletoID = boleto.id;

            console.log(boletoID)
            // Chama o endpoint para verificar o status do boleto
            try {
                const event = await starkbank.event.get(boletoID);

                // Verifica se o boleto foi pago
                if (event) {
                    if (event && event.event === 'paid') {
                        console.log(`Boleto pago, ID: ${boletoID}`);
                    } else {
                        // Adicione o boleto à lista de espera
                        boletosEmEspera.push(boletoID);
                        console.log(`Boleto em espera, ID: ${boletoID}`);
                    }
                }
            } catch (error) {
                console.error(`Erro ao buscar evento ${boletoID}:`);
                // Adicione tratamento de erro, se necessário
                boletosEmEspera.push(boletoID);
                console.log(`Boleto em espera (erro), ID: ${boletoID}`);
            }
        }
    } catch (error) {
        console.error('Erro ao buscar eventos do webhook:');
    }
}

// Lista de boletos em espera
const boletosEmEspera = [];
let boletosPagos = 0;
let boletosNaFila = 0;
// Função para verificar boletos em espera após 2 minutos
function scheduleVerificationOfBoletosEmEspera() {
    setInterval(async () => {
        for (const boletoID of boletosEmEspera) {
            // Chama o endpoint para verificar o status do boleto
            try {
                const event = await starkbank.event.get(boletoID);
                console.log("##########################")
                console.log("boletosPagos", boletosPagos)
                console.log("boletosNaFila", boletosNaFila)
                console.log("##########################")
                if (event) {
                    if (event && event.event === 'paid') {
                        boletosPagos++; // Incrementa o contador de boletos pagos
                        console.log(`Boleto pago (após espera), ID: ${boletoID}`);
                        // Remova o boleto da lista de espera, se necessário
                        const index = boletosEmEspera.indexOf(boletoID);
                        if (index !== -1) {
                            boletosEmEspera.splice(index, 1);
                        }
                    } else {
                        boletosNaFila++; // Incrementa o contador de boletos na fila
                        console.log(`Boleto ainda em espera, ID: ${boletoID}`);
                    }
                }
            } catch (error) {
                console.error(`Erro ao buscar evento ${boletoID} após espera:`);
                // Adicione tratamento de erro, se necessário
                console.log(`Boleto em espera (erro), ID: ${boletoID}`);
            }
        }
    }, 10 * 1000); // 10 segundos em milissegundos
}

