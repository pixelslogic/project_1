const Router = require('express')
const router = new Router()
const bookingController = require('../controllers/bookingController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', bookingController.create)
router.get('/', bookingController.getAll)
router.get('/', bookingController.getOne)
router.delete('/:id', checkRole('ADMIN'), bookingController.delete)
module.exports = router