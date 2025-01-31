const { Payments } = require("../models/models")
const ApiError = require('../error/ApiError')

class PaymentController {
    async create(req, res) {
        const {name} = req.body
        const payment = await Payments.create({name})
        return res.json(payment)
    }

    async getAll(req, res) {
        const payment = await Payments.findAll()
        return res.json(payment)
    }

    async getOne(req, res) {
        
    }
}

module.exports = new PaymentController()