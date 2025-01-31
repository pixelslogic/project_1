const { Trips} = require("../models/models")
const ApiError = require('../error/ApiError')

class TripController {
    async create(req, res) {
        const {name} = req.body
        const trip = await Trips.create({name})
        return res.json(trip)
    }

    async getAll(req, res) {
        const trip = await Tickets.findAll()
        return res.json(trip)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }

    async update(req, res) {
        
    }
}

module.exports = new TripController()