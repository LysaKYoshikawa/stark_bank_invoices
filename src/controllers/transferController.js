const starkbank = require('starkbank');
// const dataTransfer = require('./starkbankConfig.js')

async function realizarTransferencia(valorRecebido, boleto) {

    try {
        const externalId = `transfer-boleto-${boleto.id}`;
        const transfer = await starkbank.transfer.create([{
            amount: valorRecebido,
            bankCode: '20018183',
            branchCode: '0001',
            accountNumber: '6341320293482496',
            name: 'Stark Bank S.A.',
            taxId: '20.018.183/0001-80',
            accountType: 'payment',
            externalId: externalId,
            tags: ['transfer'],
        }]);

        if (transfer.length > 0) {
            console.log(`Transferência realizada para o boleto ID ${boleto.id}`);
            console.log(transfer);
            const statusTransferencia = 'sucesso'
            return statusTransferencia;

        }
    } catch (error) {
        console.error('Erro ao realizar a transferencia:', error);
        return null
    }

}

// async function consultarTransferencia() {
//     try {
//         const response = await starkbank.transfer.query({
//             after: '2023-10-23',
//             before: '2023-10-24',
//         });

//         let boletosComSucesso = [];

//         for await (let transfer of response) {
//             if (transfer.status === 'success' || 'failed') {
//                 const parts = transfer.externalId.split('-');
//                 let externalId = parts[parts.length - 1];
//                 boletosComSucesso.push(externalId);
//             }
//         }

//         return boletosComSucesso;
//     } catch (error) {
//         console.error('Não foi possível listar transferência:', error);
//         return [];
//     }
// }

module.exports = { realizarTransferencia };