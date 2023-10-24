// src/webhookRouter/webhookRoutes.js
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    console.log("its me", req)
    console.log("its me", res)
  try {
    const payload = req.body; // A notificação estará no corpo da solicitação

    // Aqui você deve adicionar a lógica para verificar se o boleto associado à notificação foi pago
    const boletoID = payload.resource.id; // Você deve obter o ID do boleto da notificação
    const isPaid = payload.event == 'paid'; // Verifique se o evento é 'paid'

    if (isPaid) {
      // O boleto foi pago
      console.log(`Boleto ${boletoID} foi pago`);
    } else {
      // O boleto não foi pago
      console.log(`Boleto ${boletoID} não foi pago`);
    }

    res.status(200).json({ message: 'Notificação de pagamento recebida com sucesso' });
  } catch (error) {
    console.error('Erro ao processar notificação de pagamento:', error);
    res.status(500).json({ message: 'Erro ao processar notificação de pagamento' });
  }
});

module.exports = router;
