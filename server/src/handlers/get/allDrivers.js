const { Driver, Team } = require('../../db');
const axios = require('axios');
const URL = 'http://localhost:5000/drivers';

const allDrivers = async ()=>{
    try {
        const drivers = await axios(URL)
        const driversToDb = await Driver.findAll({include: Team})

        if(drivers.length === 0) console.log('Drivers to API not found')
        if(driversToDb.length === 0) console.log('Drivers to DB not found')

        return {
            db: driversToDb,
            api: drivers.data
        }
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = allDrivers;