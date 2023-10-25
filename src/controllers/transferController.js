const starkbank = require('starkbank');

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