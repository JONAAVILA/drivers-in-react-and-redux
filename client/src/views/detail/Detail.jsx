import { useDispatch, useSelector } from "react-redux";
import { handleDetail } from "../../redux/Actions";
import profileDefault from './../../assets/svg/profileDefault.svg';
import close from './../../assets/svg/close.svg';
import './Detail.css'

const Detail = ()=>{
    const id = useSelector(state => state.detail)
    const drivers = useSelector(state => state.driversFiltered)
    const dispatch = useDispatch()
    const driverFound = drivers.find(driver => driver.id.toString() === id.toString())

    if(driverFound){
        return(
            <div className="box_detail">
                <img className="close_icon" src={close} onClick={()=> dispatch(handleDetail(""))} />
                <div className="box_info" >
                    {driverFound.image.url ? <div><img src={driverFound.image.url} alt="" /></div> : <div><img src={profileDefault} /></div>}
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