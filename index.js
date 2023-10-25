const starkbank = require('starkbank');
const project = require('./starkbankConfig');
const boletoController = require('./src/controllers/boletoController');
const webhookController = require('./src/controllers/webhookController');
const express = require('express');
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

        // Aguarde 5 minutos antes de buscar eventos do webhook
        setTimeout(async () => {
            await webhookController.fetchWebhookEvents();
        }, 10 * 1000);

        // Inicie o servidor
        index.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
    } catch (error) {
        console.error('Erro ao gerar boletos:', error);
    }
})();