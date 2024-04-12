const driverByName = require('../../handlers/get/driverByName');

const getDriverByName = async (req,res)=>{
    try {
        const { name } = req.query
        const driver = await driverByName(name)
        res.status(200).json(driver)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = getDriverByName;