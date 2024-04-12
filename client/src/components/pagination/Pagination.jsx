import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { handleAlert, handlerPage, originDrivers } from "../../redux/Actions";
import profileBackDefault from './../../assets/svg/profileBackDefault.svg';
import profileDefault from './../../assets/svg/profileDefault.svg';
import arrowPrev from './../../assets/svg/arrowPrev.svg';
import arrowNext from './../../assets/svg/arrowNext.svg';
import close from './../../assets/svg/close.svg';
import './Pagination.css';  

const Pagination = ()=>{
    const currentPage = useSelector(state => state.page)
    const drivers = useSelector(state => state.driversFiltered)
    const alert = useSelector(state => state.alert)
    const dispatch = useDispatch()
    const itemsPerPage = 12
    const startIndex = (currentPage -1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage

    useEffect(()=>{
        dispatch(originDrivers('All'))
    },[])
    
    const handlePrev = (event)=>{
        if(event && currentPage > 1){
            dispatch(handlerPage(currentPage - 1))
        }
    }

    const handleNext  = ()=>{
        if(currentPage < 43 && drivers.length/itemsPerPage > 1 && currentPage < Math.ceil(drivers.length/itemsPerPage)){
            dispatch(handlerPage(currentPage + 1))
        }
    }
    
    return( 
        <div className="conteiner_page" >
            {alert ? <div className="box_alert" >
                        <p>{alert}</p>
                        <img src={close} onClick={()=> dispatch(handleAlert(''))}/>
                    </div> : null}
            <div className="box_page" >
               {drivers?.slice(startIndex,endIndex).map(driver => {
                    
                    if(Array.isArray(driver.teams)){
                        const t = driver.teams.map(team => team.name)
                        return(
                            <Link to={`/detail/${driver.id}`} >
                                <div className="box_card" style={{backgroundColor: '#fd7f7f40'}} key={driver.id}>
                                    {driver.image.url.length? <img className="image_back_profile" src={driver.image.url}/>: <img className="svg_back_profile" src={profileBackDefault} />}
                                    {driver.image.url?(<img className="image_profile" src={driver.image.url} alt="" />):(<img className="svg_profile" src={profileDefault} />)}
                                    <h1 key={driver.id} >{driver.name.forename}</h1>
                                    <div className="box_teams">
                                        {t.length <= 3 ? <p className="team_profile" >{t.join(", ")}</p> : <p className="team_profile" >{t.slice(0,3).join(", ")} ...more</p>}
                                    </div>
                                </div>
                            </Link>
                        )
                    }else{
                        return(
                            <Link to={`/detail/${driver.id}`} >
                                <div className="box_card" key={driver.id}>
                                    {driver.image.url.length? <img className="image_back_profile" src={driver.image.url}/>: <img className="svg_back_profile" src={profileBackDefault} />}
                                    {driver.image.url?(<img className="image_profile" src={driver.image.url} alt="" />):( <img className="svg_profile" src={profileDefault} /> )}
                                    <h1 key={driver.id} >{driver.name.forename}</h1>
                                    <div className="box_teams">
                                    {driver.teams ? <p className="team_profile" >{driver.teams}</p> : <p className="team_profile" >No teams</p>}
                                    </div>
                                </div> 
                            </Link>
                        )
                    }
               })} 
            </div>
            <div className="box_button_handlers" >
                <div onClick={handlePrev} >
                    <img src={arrowPrev} />
                </div>
                <p>{currentPage}</p>
                <div onClick={handleNext} >
                    <img src={arrowNext} />
                </div>
            </div>
        </div>
    )
}

export default Pagination;