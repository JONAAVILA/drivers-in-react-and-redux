import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { handleDetail, handlerPage, originDrivers } from "../../redux/Actions";
import profileBackDefault from './../../assets/svg/profileBackDefault.svg';
import profileDefault from './../../assets/svg/profileDefault.svg';
import arrowPrev from './../../assets/svg/arrowPrev.svg';
import arrowNext from './../../assets/svg/arrowNext.svg';
import arrowEnd from './../../assets/svg/arrowEnd.svg';
import arrowStart from './../../assets/svg/arrowStart.svg';
import Alert from "../alert/Alert";
import './Pagination.css';  
import Detail from "../../views/detail/Detail";

const Pagination = ()=>{
    const currentPage = useSelector(state => state.page)
    const drivers = useSelector(state => state.driversFiltered)
    const alert = useSelector(state => state.alert)
    const detail = useSelector(state => state.detail)
    const dispatch = useDispatch()
    const itemsPerPage = 12
    const totalPages = Math.ceil(drivers.length / itemsPerPage)
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
        if(totalPages && drivers.length/itemsPerPage > 1 && currentPage < totalPages){
            dispatch(handlerPage(currentPage + 1))
        }
    }
    
    return( 
        <div className="conteiner_page" >
            {detail ? <Detail/> : null}
            {alert ? <Alert/> : null}
            <div className="box_page" >
               {drivers?.slice(startIndex,endIndex).map(driver => {
                    const forename = driver.name.forename.split(" ").map(f => f[0].toUpperCase()+f.slice(1)+ " ")
                    if(Array.isArray(driver.teams)){
                        const t = driver.teams.map(team => team.name)
                        return(
                            <div onClick={()=> dispatch(handleDetail(driver.id))} className="box_card" style={{backgroundColor: '#fd7f7f40'}} key={driver.id}>
                                {driver.image.url.length? <img className="image_back_profile" src={driver.image.url}/>: <img className="svg_back_profile" src={profileBackDefault} />}
                                {driver.image.url?(<img className="image_profile" src={driver.image.url} alt="" />):(<img className="svg_profile" src={profileDefault} />)}
                                <h1 key={driver.id} >{forename}</h1>
                                <div className="box_teams">
                                    {t.length <= 3 ? <p className="team_profile" >{t.join(", ")}</p> : <p className="team_profile" >{t.slice(0,3).join(", ")} ...more</p>}
                                </div>
                            </div>
                        )
                    }else{      
                        return(
                            <div onClick={()=> dispatch(handleDetail(driver.id))} className="box_card" key={driver.id}>
                                {driver.image.url.length? <img className="image_back_profile" src={driver.image.url}/>: <img className="svg_back_profile" src={profileBackDefault} />}
                                {driver.image.url?(<img className="image_profile" src={driver.image.url} alt="" />):( <img className="svg_profile" src={profileDefault} /> )}
                                <h1 key={driver.id} >{driver.name.forename}</h1>
                                <div className="box_teams">
                                {driver.teams ? <p className="team_profile" >{driver.teams}</p> : <p className="team_profile" >No teams</p>}
                                </div>
                            </div> 
                        )
                    }
               })} 
            </div>
            <div className="box_button_handlers" >
                <div onClick={()=> dispatch(handlerPage(1))} >
                    <img src={arrowStart} />
                </div>
                <div onClick={handlePrev} >
                    <img src={arrowPrev} />
                </div>
                <p>{currentPage}</p>
                <div onClick={handleNext} >
                    <img src={arrowNext} />
                </div>
                <div onClick={()=> dispatch(handlerPage(totalPages))} >
                    <img src={arrowEnd} />
                </div>
            </div>
        </div>
    )
}

export default Pagination;