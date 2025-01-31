const Router = require('express')
const router = new Router()
const stationController = require('../controllers/stationController')

router.post('/', stationController.create)
router.get('/', stationController.getAll)
router.get('/', stationController.getOne)
router.get('/', stationController.delete)
router.get('/', stationController.update)

module.exports = router