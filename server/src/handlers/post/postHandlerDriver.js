const { Driver, Team } = require('./../../db');
const { v4: uuidv4 } = require('uuid');

const postHandlerDriver = async (name,
                                 description,
                                 image,
                                 nationality,
                                 dob,
                                 teams)=>{
       
    if(!name.surname || !name.forename || !image.url || !nationality || !dob || !description || !teams){
        throw new Error('Parameters are missing')
    }
    const driverFound = await Driver.findOne({
        where:{
            name:name
        }
    })
    if(driverFound) throw new Error(
        `There is already a driver with this forename' ${name.forename}' and surename '${name.surname}'`
    )

    try {
        const uuid = uuidv4();
        const driverPost = await Driver.create({
            id: uuid,
            name,
            description,
            image,  
            nationality,
            dob,
        })
        if(!driverPost) throw new Error('Error to create driver')

        const teamFound = []

        for(teamName of teams){
            teamMatch = await Team.findOne({
                where:{
                    name: teamName
                }
            })
            if(teamMatch) teamFound.push(teamMatch)
        }

        await driverPost.addTeam(teamFound)
        return { message: 'Driver created successfully' }
         
    } catch (error) {
        return {error:error.message}
    }
}

module.exports = postHandlerDriver;