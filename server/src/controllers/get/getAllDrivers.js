const allDrivers = require('../../handlers/get/allDrivers');

const getAllDrivers = async (req,res)=>{
    try {
        const drivers = await allDrivers()
        res.status(200).json(drivers)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = getAllDrivers;