import { ALERT, ALL_DRIVERS, ALL_TEAMS, ORDER, ORIGIN, PAGE, SEARCH, TEAM } from './ActionsTypes';

const initialState = {
    drivers: [],
    driversFiltered: [],
    teams: [],
    page: 1,
    alert: ''
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ALL_DRIVERS:
            return{
                ...state,
                drivers: action.payload
            }
        case ALL_TEAMS:
            return{
                ...state,
                teams: action.payload
            }
        case SEARCH:
            return{
                ...state,
                driversFiltered: action.payload
            }
        case ORDER:
                   const filterOrder = [...state.driversFiltered]
                if (action.payload === "A") {
                    filterOrder.sort((a, b) => a.name.forename.localeCompare(b.name.forename))
                }else if(action.payload === "Random"){
                    filterOrder.sort(() => Math.random() - 0.5)
                }else{
                    filterOrder.sort((a, b) => b.name.forename.localeCompare(a.name.forename))
                }
                return {
                    ...state,
                    driversFiltered: filterOrder
                }; 
        case ORIGIN:
            if(action.payload === "API"){
                return{
                    ...state,
                    driversFiltered: state.drivers.api
                }
            }else if(action.payload === "DB"){
                return{
                    ...state,
                    driversFiltered: state.drivers.db
                }
            }
            return{
                ...state,
                driversFiltered: [...state.drivers.db,...state.drivers.api]
            }
            
        case TEAM:
            if(action.payload === "All"){
                return{
                    ...state,
                    driversFiltered: [...state.drivers.db,...state.drivers.api]             
                }
            }else{
                const driverFoundToApi = state.drivers.api.filter(driver => {
                    const teams = driver.teams?.split(/,\s*(?![^()]*\))/) || []
                    return teams.some(team => team.trim() === action.payload)
                });
                const driverFoundToDb = state.drivers.db.filter(driver => {
                    const teams = driver.teams || []
                    return teams.some(team => team.name === action.payload);
                });
                return {
                    ...state,
                    driversFiltered: [...driverFoundToDb,...driverFoundToApi]
                };
            }
        case PAGE:
            return{
                ...state,
                page: action.payload
            }
        case ALERT:
            return{
                ...state,
                alert: action.payload
            }

        default:
            return state
    }
}

export default rootReducer;