const {Bookings} = require('../models/models')
const ApiError = require('../error/ApiError')

class BookingController {
    async create(req, res) {
        const {status_actual} = req.body
        
        try {
            const booking = await Bookings.create({status_actual})
            return res.json(booking)
        } catch (error) {
            return res.status(500).json({message: "Ошибка при создании бронирования"})
        }
    }

    async getAll(req, res) {
        const booking = await Bookings.findAll()
        return res.json(booking)
    }

    async getOne(req, res) {
        
    }

    async delete(req, res) {
        
    }
}

module.exports = new BookingController()