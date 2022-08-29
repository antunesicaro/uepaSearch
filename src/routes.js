const { Router } = require('express');

const ClientController = require('./app/controllers/ClientController')
const ProdutoController = require('./app/controllers/ProdutoController')
const VendaController = require('./app/controllers/VendaController')
const DetalheVendaController = require('./app/controllers/DetalheVendaController')



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

router.get('/vendas', VendaController.index)
router.get('/vendas/:codVenda', VendaController.show)
router.delete('/vendas/:codVenda', VendaController.delete)
router.post('/vendas', VendaController.store)

router.get('/detalhes', DetalheVendaController.index)
router.post('/detalhes', DetalheVendaController.store)
router.get('/detalhes/:codVenda', DetalheVendaController.show)






module.exports = router;
