const axios = require("axios");
const { Driver, Team } = require('./../../db');
const { Sequelize } = require("sequelize");
const { Op } = Sequelize
const URL = 'http://localhost:5000/drivers?name.forename_like=';

const driverByName = async (name) => {
    try {
        const responseToDb = await Driver.findAll({
            where:{
                name:{
                    forename:{
                        [Op.like]: `%${name}%`
                    }
                }
            },
            include:{
                model: Team
            }
        })
        const response = await axios.get(`${URL}${name}&_limit=15`);
        return {
            db: responseToDb.map(driver => driver.toJSON()),
            api: response.data
        };
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = driverByName;