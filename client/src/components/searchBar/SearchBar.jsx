import { useDispatch, useSelector } from 'react-redux'
import { handleAlert, handlerPage, orderDrivers, originDrivers, searchDrivers, teamDrivers } from '../../redux/Actions'
import { useState } from 'react'
import arrowNav from './../../assets/svg/arrowNav.svg'
import './SearchBar.css';

const SearchBar = ()=>{
    const [ inputValue, setInputValue ] = useState("")
    const [ origin, setOrigin ] = useState('All')
    const [ team, setTeam ] = useState('All')
    const [ order, setOrder ] = useState('Random')
    const [ clas, setClas ] = useState('off')
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
    
    const handleOrder = (event)=>{
        const { value } = event.target
        setOrder(value)
        dispatch(orderDrivers(value))
        dispatch(handlerPage(1))
    }
    
    const handleOrigin = (value)=>{
        setOrigin(value)
        dispatch(originDrivers(value))
        dispatch(handlerPage(1))
    }
    
    const handleTeams = (event)=>{
        const { value } = event.target
        setTeam(value)
        dispatch(teamDrivers(value))
        dispatch(handlerPage(1))
    }

    const handleRefresh = ()=>{
        setOrigin('All')
        setTeam('All')
        setOrder('Random')
        dispatch(originDrivers('All'))
        dispatch(handlerPage(1))
    }

    const handlerClas = ()=>{
        if(clas === 'off'){
            setClas('on')
        }else{
            setClas('off')
        }
    }   
    
    return(
        <div className='box_searchbar' >
            <div>
                <input placeholder='Enter a name' value={inputValue} onChange={handleInputSearch} type="text" /> 
                <button onClick={handleSearch} >search</button>
            </div>
            <div >
                <ul className={`list_origin ${clas}`}  >
                    <li onClick={()=> handleOrigin('All')} >API and DB  <img onClick={handlerClas} className='arrow_handler' src={arrowNav}/> </li>
                    <li onClick={()=> handleOrigin('API')} >API</li>
                    <li onClick={()=> handleOrigin('DB')} >DB</li>
                </ul>
            </div>
            {/* <select onChange={handleOrigin} name="Origen" value={origin} >
                <option value="All">API and DB</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select> */}
            <select onChange={handleTeams} name="Teams" value={team} >
                <option value="All">All Teams</option>
              {teams.map(team =>{
                    return(
                        <option key={team.id} value={team.name}>{team.name}</option>
                    )
              })} 
            </select>
            <select onChange={handleOrder} name="Order" value={order} >
                <option value="Random">Random Order</option>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
                <option value="Y">Young</option>
                <option value="O">Old</option>
            </select>
            <button onClick={handleRefresh} >Refresh</button>
        </div>
    )
}   

export default SearchBar;