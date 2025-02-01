const Router = require('express')
const router = new Router()
const ticketController = require('../controllers/ticketController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', ticketController.create)
router.get('/', ticketController.getAll)
router.get('/:id', ticketController.getOne)
router.delete('/:id', checkRole('ADMIN'), ticketController.delete)


module.exports = router