const { Router } = require('express');

const ProfessorController = require('./app/controllers/ProfessorController')




const router = Router();

router.get('/professor', ProfessorController.index)
router.get('/professor/:id', ProfessorController.show)
router.delete('/professor/:id', ProfessorController.delete)
router.post('/professor', ProfessorController.store)
router.put('/professor/:id', ProfessorController.update)







module.exports = router;
