const { Stations} = require("../models/models")
const ApiError = require('../error/ApiError')

class StationController {
    async create(req, res) {
        const {name} = req.body
        const station = await Stations.create({name})
        return res.json(station)
    }

    async getAll(req, res) {
        const station = await Stations.findAll()
        return res.json(station)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }

    async update(req, res) {
        
    }
}

module.exports = new StationController()