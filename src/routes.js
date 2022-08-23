const { Router } = require('express');

const ClientController = require('./app/controllers/ClientController')



const router = Router();

router.get('/clients', ClientController.index)
router.get('/clients/:codCliente', ClientController.show)
router.delete('/clients/:codCliente', ClientController.delete)
router.post('/clients', ClientController.store)
router.put('/clients/:codCliente', ClientController.update)




module.exports = router;
