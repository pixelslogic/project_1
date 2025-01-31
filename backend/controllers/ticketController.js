const { Tickets} = require("../models/models")
const ApiError = require('../error/ApiError')

class TicketController {
    async create(req, res) {
        const {name} = req.body
        const ticket = await Tickets.create({name})
        return res.json(ticket)
    }

    async getAll(req, res) {
        const ticket = await Tickets.findAll()
        return res.json(ticket)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new TicketController()