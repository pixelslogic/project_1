const Router = require('express')
const router = new Router()
const paymentController = require('../controllers/paymentController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', paymentController.create)
router.get('/', paymentController.getAll)
router.get('/', paymentController.getOne)

module.exports = router