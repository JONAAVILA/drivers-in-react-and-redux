const driverById = require('../../handlers/get/driverById');

const getDriverById = async (req,res)=>{
    try {
        const { idDriver } = req.query
        const driver = await driverById(idDriver)
        res.status(200).json(driver)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = getDriverById;