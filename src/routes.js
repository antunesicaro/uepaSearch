const { Router } = require('express');

const ClientController = require('./app/controllers/ClientController')
const ProdutoController = require('./app/controllers/ProdutoController')



const router = Router();

router.get('/clients', ClientController.index)
router.get('/clients/:codCliente', ClientController.show)
router.delete('/clients/:codCliente', ClientController.delete)
router.post('/clients', ClientController.store)
router.put('/clients/:codCliente', ClientController.update)

router.get('/produtos', ProdutoController.index)
router.get('/produtos/:codProduto', ProdutoController.show)
router.delete('/produtos/:codProduto', ProdutoController.delete)
router.post('/produtos', ProdutoController.store)
router.put('/produtos/:codProduto', ProdutoController.update)




module.exports = router;
