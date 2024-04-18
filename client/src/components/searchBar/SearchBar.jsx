import { useDispatch, useSelector } from 'react-redux'
import { handleAlert, handlerPage, orderDrivers, originDrivers, searchDrivers, teamDrivers } from '../../redux/Actions'
import { useEffect, useState } from 'react'
import './SearchBar.css';

const SearchBar = ()=>{
    const [ inputValue, setInputValue ] = useState("")
    const teams = useSelector(state => state.teams)
    const state = useSelector(state => state.driversFiltered)
    const dispatch = useDispatch()
    
    const handleSearch = ()=>{
        if(inputValue){
            const driver = inputValue[0].toUpperCase() + inputValue.toLowerCase().slice(1)
            if(driver.length > 0){
                dispatch(searchDrivers(driver))
                setInputValue("")
            }
        }else{  
            dispatch(handleAlert('Enter a name'))
            setInputValue("")
        }
    }
    console.log(state)
    useEffect(()=>{
        if(state.length === 0) dispatch(handleAlert('The name is invalid'))
    },[state])
    
    const handleInputSearch = (event)=>{
        setInputValue(event.target.value)
        dispatch(handlerPage(1))
    }
    
    const handleOrder = (event)=>{
        dispatch(orderDrivers(event.target.value))
        dispatch(handlerPage(1))
    }
    
    const handleOrigin = (event)=>{
        dispatch(originDrivers(event.target.value))
        dispatch(handlerPage(1))
    }
    
    const handleTeams = (event)=>{
        dispatch(teamDrivers(event.target.value))
        dispatch(handlerPage(1))
    }

    const handleRefresh = ()=>{
        dispatch(originDrivers('All'))
        dispatch(handlerPage(1))
    }
    
    return(
        <div className='box_searchbar' >
            <div>
                <input placeholder='Enter a name' value={inputValue} onChange={handleInputSearch} type="text" /> 
                <button onClick={handleSearch} >search</button>
            </div>
            <select onChange={handleOrigin} name="Origen">
                <option value="All">API and DB</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
            </select>
            <select onChange={handleTeams} name="Teams">
                <option value="All">All Teams</option>
              {teams.map(team =>{
                    return(
                        <option key={team.id} value={team.name}>{team.name}</option>
                    )
              })} 
            </select>
            <select onChange={handleOrder} name="Order">
                <option value="Random">Random Order</option>
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <button onClick={handleRefresh} >Refresh</button>
        </div>
    )
}   

export default SearchBar;