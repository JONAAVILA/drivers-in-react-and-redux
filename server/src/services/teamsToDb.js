const { Team } = require('./../db');
const axios = require('axios');
const URL = 'http://localhost:5000/drivers';

const teamsToDb = async ()=>{
    try {
        const drivers = await axios(URL)
        if(!drivers) throw new Error('Drivers not found')

        const allTeams = []

        drivers.data.map(drivers =>{
            drivers.teams?.split(/,\s*(?![^()]*\))/).map(team =>{
                allTeams.push(team.trim())
            })
        })

        const TeamsFiltered = new Set(allTeams)
        const array = Array.from(TeamsFiltered)

        await Promise.all(array.map( async team =>{
            await Team.findOrCreate({
                where:{
                    name:team
                }
            })
        }))

        return console.log('Populated database with Teams complete')
    } catch (error) {
        return console.log(error)
    }
}

module.exports = teamsToDb;