const Router = require('express')
const router = new Router()
const tripController = require('../controllers/tripController')

router.post('/', tripController.create)
router.get('/', tripController.getAll)
router.get('/', tripController.getOne)
router.get('/', tripController.delete)
router.get('/', tripController.update)

module.exports = router