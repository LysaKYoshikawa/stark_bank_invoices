const starkbank = require('starkbank');

//Função para listar todas as transferencias realizadas
async function consultarTransferencia(boletosId) {
    
    try {
        const response = await starkbank.transfer.query({
            after: '2023-10-23',
            before: '2023-10-24',
        });

        for await (let transfer of response) {
            if (transfer.status === 'success') {
                const parts = transfer.externalId.split('-');
                boletosId = parts[parts.length - 1]
                console.log(`O Id do boleto ${boletosId} em lista`);

            }
        }
    }catch (error){
        console.error('Não foi possivel listar transferência:', error);
    }
    
};

module.exports = { consultarTransferencia };