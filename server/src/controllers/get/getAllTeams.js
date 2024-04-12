const allTeams = require('./../../handlers/get/allTeams');

const getAllTeams = async (req,res)=>{
    try {
        const teams = await allTeams()
        res.status(200).json(teams)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = getAllTeams;