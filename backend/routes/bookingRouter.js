const Router = require('express')
const router = new Router()
const bookingController = require('../controllers/bookingController')

router.post('/', bookingController.create)
router.get('/', bookingController.getAll)
router.get('/', bookingController.getOne)
router.get('/', bookingController.delete)

module.exports = router