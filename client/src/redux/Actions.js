import axios from 'axios';
import { ALERT, ALL_DRIVERS, ALL_TEAMS, ORDER, ORIGIN, PAGE, SEARCH, TEAM } from './ActionsTypes';

export const allDrivers = ()=>{
    const URL = 'http://localhost:3001/drivers'

    return async (dispatch)=>{
        const response = await axios(URL)
        return dispatch({
            type: ALL_DRIVERS,
            payload: response.data
        })
    }
}

export const allTeams = ()=>{
    const URL = 'http://localhost:3001/teams'

    return async (dispatch)=>{
        const response = await axios(URL)
        return dispatch({
            type: ALL_TEAMS,
            payload: response.data
        })
    }
}

export const searchDrivers = (driver)=>{
    const URL = 'http://localhost:3001/drivers/'

    return async (dispatch)=>{
        const driverFound = await axios(`${URL}name?name=${driver}`)
        if(!driverFound.data.db){
            return dispatch({
                type: SEARCH,
                payload: driverFound.data.api
            })
        }else{
            return dispatch({
                type: SEARCH,
                payload: [...driverFound.data.db,...driverFound.data.api]
            })
        }
    }
}

export const orderDrivers = (order)=>{
    return async (dispatch)=>{
        return dispatch({
            type: ORDER,
            payload: order
        })
    }
}

export const originDrivers = (origin)=>{
    return async (dispatch)=>{
        return dispatch({
            type: ORIGIN,
            payload: origin
        })
    }
}

export const teamDrivers = (team)=>{
    return async (dispatch)=>{
        return dispatch({
            type: TEAM,
            payload: team
        })
    }
}

export const handlerPage = (page)=>{
    return async (dispatch)=>{
        return dispatch({
            type: PAGE,
            payload: page
        })
    }
}

export const handleAlert = (alert)=>{
    return async (dispatch)=>{
        return dispatch({
            type: ALERT,
            payload: alert
        })
    }
}