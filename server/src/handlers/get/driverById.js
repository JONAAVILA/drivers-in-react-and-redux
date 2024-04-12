const axios = require('axios');
const { Driver, Team} = require('./../../db');
const URL = 'http://localhost:5000/drivers/';

const driverById = async (idDriver)=>{
    try {
        if(idDriver.length <= 3){
            const driver = await axios(`${URL}${idDriver}`)
            if(!driver) throw new Error(`Driver id=${idDriver} not found`)
            return{
                ...driver.data
            }
        }else{
            const driverToDb = await Driver.findByPk(idDriver,{
                include:Team
            })
            if(!driverToDb) throw new Error(`Driver id=${idDriver} not found`)
            return{
                ...driverToDb.toJSON()
            }
        }
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = driverById;