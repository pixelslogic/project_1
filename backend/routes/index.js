const Router = require('express')
const router = new Router()
const bookingRouter = require('./bookingRouter')
const paymentRouter = require('./paymentRouter')
const stationRouter = require('./stationRouter')
const ticketRouter = require('./ticketRouter')
const tripRouter = require('./tripRouter')
const userRouter = require('./userRouter')

router.use('/booking', bookingRouter)
router.use('/payment', paymentRouter)
router.use('/station', stationRouter)
router.use('/ticket', ticketRouter)
router.use('/trip', tripRouter)
router.use('/user', userRouter)

module.exports = router