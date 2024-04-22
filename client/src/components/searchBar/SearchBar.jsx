import { useDispatch, useSelector } from 'react-redux'
import { handleAlert, handlerPage, orderDrivers, originDrivers, searchDrivers, teamDrivers } from '../../redux/Actions'
import { useState } from 'react'
import arrowNav from './../../assets/svg/arrowNav.svg'
import search from './../../assets/svg/search.svg'
import refresh from './../../assets/svg/refresh.svg'
import './SearchBar.css';

const SearchBar = ()=>{
    const [ inputValue, setInputValue ] = useState("")
    const [ clas, setClas ] = useState({
        order: 'on',
        origin: 'on',
        teams: 'on'
    })
    const teams = useSelector(state => state.teams)
    const dispatch = useDispatch()
    
    const handleSearch = async ()=>{
        if(inputValue){
            const driver = inputValue[0].toUpperCase() + inputValue.toLowerCase().slice(1)
            if(driver.length > 0){
                const response = await dispatch(searchDrivers(driver))
                setInputValue("")
                if(response.payload.length < 1) dispatch(handleAlert(`The name '${driver}' is invalid`))
                handleRefresh()
            }
        }else{  
            dispatch(handleAlert('Enter a name'))
            setInputValue("")
        }
    }
    
    const handleInputSearch = (event)=>{
        const { value } = event.target
        setInputValue(value)
        dispatch(handlerPage(1))
    }
    
    const handleOrder = (value)=>{
        dispatch(orderDrivers(value))
        dispatch(handlerPage(1))
    }
    
    const handleOrigin = (value)=>{
        dispatch(originDrivers(value))
        dispatch(handlerPage(1))
    }
    
    const handleTeams = (value)=>{
        dispatch(teamDrivers(value))
        dispatch(handlerPage(1))
    }

    const handleRefresh = ()=>{
        dispatch(originDrivers('All'))
        dispatch(handlerPage(1))
        setClas({
            order:'on',
            origin:'on',
            teams:'on'
        })
    }

    const handlerClas = (property)=>{
        if(property === 'teams'){
            setClas(prevClas => ({
                ...prevClas,
                [property]: prevClas[property] === 'on' ? 'off_teams' : 'on'
            }))
        }else if(property === 'origin'){
            setClas(prevClas => ({
                ...prevClas,
                [property]: prevClas[property] === 'on' ? 'off' : 'on'
            }))
        }else{
            setClas(prevClas => ({
                ...prevClas,
                [property]: prevClas[property] === 'on' ? 'off_order' : 'on'
            }))
        }
    }   
    
    return(
        <div className='box_searchbar' >
            <div>
                <input placeholder='Enter a name' value={inputValue} onChange={handleInputSearch} type="text" /> 
                <img className='icon_search' src={search} onClick={handleSearch} />
            </div>
            <div >
                <ul className={`list_origin ${clas.origin}`}  >
                    <li onClick={()=> handleOrigin('All')} >API and DB </li>
                    <li onClick={()=> handleOrigin('API')} >API</li>
                    <li onClick={()=> handleOrigin('DB')} >DB</li>
                </ul>
                <div className='box_arrow' >
                    <img className='arrow_handler' onClick={()=> handlerClas('origin')} src={arrowNav}/>
                </div>
            </div>
            <div>
                <ul className={`list_origin ${clas.teams}`} >
                    <li>All Teams </li>
                    {teams.map(team =>{
                        return(
                            <li onClick={()=> handleTeams(`${team.name}`)} key={team.id} value={team.name}>{team.name}</li>
                        )
                    })}
                </ul>
                <div className='box_arrow' >
                    <img onClick={()=> handlerClas('teams')} className='arrow_handler' src={arrowNav}/>
                </div>
            </div>
            <div>
                <ul className={`list_origin ${clas.order}`} >
                    <li onClick={()=> handleOrder('Random')} >Random Order</li>
                    <li onClick={()=> handleOrder('A')} >Ascendente</li>
                    <li onClick={()=> handleOrder('D')} >Descendente</li>
                    <li onClick={()=> handleOrder('Y')} >Young</li>
                    <li onClick={()=> handleOrder('O')} >Old</li>
                </ul>
                <div className='box_arrow' >
                    <img onClick={()=> handlerClas('order')} className='arrow_handler' src={arrowNav}/>
                </div>
            </div>
            <button className='button_refresh' onClick={handleRefresh} >Refresh <img className='icon_refresh' src={refresh}/> </button>
        </div>
    )
}   

export default SearchBar;