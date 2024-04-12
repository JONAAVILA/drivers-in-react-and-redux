const { Team } = require('./../../db');

const allTeams = async ()=>{
    try {
        const teams = await Team.findAll()
        if(!teams) throw new Error('Teams not found')

        return teams
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = allTeams;