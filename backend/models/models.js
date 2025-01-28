const { types } = require('pg')
const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false },
    role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const Bookings = sequelize.define('bookings', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status_actual: {type: DataTypes.STRING, allowNull: false },
});

const Trips = sequelize.define('trips', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    departure_time: {type: DataTypes.DATE, allowNull: false},
    arrival_time: {type: DataTypes.DATE, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    type_of_trip: {type: DataTypes.STRING, allowNull: false},
});

const Transport_providers = sequelize.define('transport_providers', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_company: {type: DataTypes.STRING, allowNull: false},
    contact_info: {type: DataTypes.STRING},
});

const Payments= sequelize.define('payments', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    payment_date: {type: DataTypes.DATE, allowNull: false},
    price: {type: DataTypes.FLOAT, allowNull: false},
    status_of_payment: {type: DataTypes.STRING, allowNull: false},
});

const Stations= sequelize.define('stations', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name_of_station: {type: DataTypes.STRING, allowNull: false},
    city: {type: DataTypes.STRING, allowNull: false},
    type_of_station: {type: DataTypes.STRING, allowNull: false},
});

const Tickets= sequelize.define('tickets', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    ticket_number: {type: DataTypes.INTEGER, unique: true, allowNull: false},
    seat: {type: DataTypes.INTEGER, allowNull: false},
});

User.hasMany(Bookings)
Bookings.belongsTo(User)

Bookings.belongsTo(Trips)
Trips.hasMany(Bookings)

Trips.belongsTo(Transport_providers)
Transport_providers.hasMany(Trips)

Trips.belongsTo(Stations, {as: 'departureStation', foreignKey: 'departure_station_id'})
Trips.belongsTo(Stations, { as: 'arrivalStation', foreignKey: 'arrival_station_id' })

Bookings.hasOne(Payments)
Payments.belongsTo(Bookings)

Bookings.hasMany(Tickets)
Tickets.belongsTo(Bookings)

module.exports = {
    User,
    Bookings,
    Trips,
    Transport_providers,
    Payments,
    Stations,
    Tickets,
};