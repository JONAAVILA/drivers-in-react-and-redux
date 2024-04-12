import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import profileDefault from './../../assets/svg/profileDefault.svg';
import './Detail.css'

const Detail = ()=>{
    const drivers = useSelector(state => state.driversFiltered)
    const { id } = useParams()
    const driverFound = drivers.find(driver => driver.id.toString() === id)
    if(driverFound){
        return(
            <div className="box_detail">
                <div className="box_info" >
                    {driverFound.image.url ? <img src={driverFound.image.url} alt="" /> : <img src={profileDefault} />}
                    <h1>{driverFound.name.forename}</h1>
                    <h2>{driverFound.name.surname}</h2>
                </div>
                <div className="box_items">
                    
                        <p className="driver_id" >{driverFound.id}</p>
                        <h2>Nationality:</h2>
                        <h4>{driverFound.nationality}</h4>
                        <h2>Description:</h2>
                        {driverFound.description ? <p>{driverFound.description}</p> : <p>Not description</p>}
                        <h2>Birthdate:</h2>
                        <h4>{driverFound.dob.slice(0,10)}</h4>
                        <h2>Teams:</h2>
                        {Array.isArray(driverFound.teams) ? ( driverFound.teams.length > 0 ? ( driverFound.teams.map((team, index) => ( <p key={index}>{team.name}</p> ))) : ( <p>No teams</p> )) : (typeof driverFound.teams === 'string' && driverFound.teams.trim() !== '' ? ( <p>{driverFound.teams}</p> ) : ( <p>No teams</p> ))}
                 
                </div>
            </div>
        )
    }else{
        <div>
            <h1>Driver not found</h1>
        </div>
    }
}

export default Detail;